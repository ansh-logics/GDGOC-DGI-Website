
interface Event {
    id: string;
    title: string;
    slug: string;
    summary: string;
    description: string;
    startTime: string;
    endTime: string;
    Date: string;
    location: string;
    venu: string;
    bannerUrl: string;
    thumbnailUrl: string;
    commudleUrl: string;
    tag: string;
    status: string;
}

interface Speakers {
    SpeakerId: string;
    EventId: string;
    Name: string;
    Avatar: string;
    Title: string;
    Bio: string;
    LinkedIn: string;
    X: string;
}

interface Hosts {
    HostId: string;
    EventId: string;
    Name: string;
    Avatar: string;
    Title: string;
    Bio: string;
    LinkedIn: string;
    X: string;
}

interface Agenda {
    EventId: string;
    time: string;
    title: string;
    description: string;
}

interface Main {
    id: string;
    title: string;
    slug: string;
    summary: string;
    description: string;
    start: string;
    end: string;
    location: string;
    venue: string;
    bannerUrl: string;
    thumbnailUrl: string;
    commudleUrl: string;
    tags: string;
    status: string;

    host: {
        name: string;
        avatar: string;
        role: string;
        email: string;
        linkedin: string;
        x: string;
    };

    speakers: {
        name: string;
        avatar: string;
        title: string;
        bio: string;
        linkedin: string;
        x: string;
    }[];

    agenda: {
        time: string;
        title: string;
        description: string;
    }[];
}

type ListMap<T> = Map<string, T[]>;

export async function getCSV(): Promise<Main[]> {
    let API_KEY = "AIzaSyASsRizaQYB6yq-mfM-Zrmi_UR_A1g7Gg0";
    let SHEET_ID = "1Mt-yK3YxH528ShEx6YI4i78U66L5izZ14LqAZPCBsec"
    let DRIVE_CLIENT_ID = "900253435833-b4umhac4mckq79ac8n5if6kldhe3bm84.apps.googleusercontent.com"
    let DRIVE_API_KEY = "AIzaSyAEpak69nuv4rWYNGaxBm1YSooqj3Qal5w"

    const tabs = ["Events", "Speakers", "Hosts", "Agenda"];

    const events: Event[] = [];
    const speakersList: Speakers[] = [];
    const hostsList: Hosts[] = [];
    const agendaList: Agenda[] = [];

    const eventTemplate: Event = {
        id: "", title: "", slug: "", summary: "", description: "",
        startTime: "", endTime: "", Date: "", location: "", venu: "",
        bannerUrl: "", thumbnailUrl: "", commudleUrl: "", tag: "", status: ""
    };

    const speakersTemplate = {
        SpeakerId: "", EventId: "", Name: "",
        Avatar: "", Title: "", Bio: "", LinkedIn: "", X: ""
    };

    const hostsTemplate = {
        HostId: "", EventId: "", Name: "",
        Avatar: "", Title: "", Bio: "", LinkedIn: "", X: ""
    };

    const agendaTemplate = { EventId: "", time: "", title: "", description: "" };



    //fetching from sheet output-->[[]]
    async function fetchTab(tab: string): Promise<string[][]> {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${tab}!A2:Z1000?key=${API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) return [];
        const data = await res.json();
        return data.values ?? [];
    }

    //parallel execution musch faster 
    const [eventsTable, speakersTable, hostsTable, agendaTable] = await Promise.all(
        tabs.map(t => fetchTab(t))
    );


    //convert into array of oobject 
    function parse<T>(rows: string[][], template: any): T[] {
        const keys = Object.keys(template);
        return rows.map(row => {
            const obj: any = {};
            keys.forEach((key, i) => obj[key] = row[i] ?? "");
            return obj as T;
        });
    }

    events.push(...parse<Event>(eventsTable, eventTemplate));
    speakersList.push(...parse<Speakers>(speakersTable, speakersTemplate));
    hostsList.push(...parse<Hosts>(hostsTable, hostsTemplate));
    agendaList.push(...parse<Agenda>(agendaTable, agendaTemplate));



    //mapping 
    const speakersByEvent: ListMap<Speakers> = new Map();
    const hostsByEvent: ListMap<Hosts> = new Map();
    const agendaByEvent: ListMap<Agenda> = new Map();



    function group<T extends { EventId: string }>(list: T[], map: ListMap<T>) {
        list.forEach(item => {
            if (!map.has(item.EventId)) map.set(item.EventId, []);
            map.get(item.EventId)!.push(item);
        });
    }

    group(speakersList, speakersByEvent);
    group(hostsList, hostsByEvent);
    group(agendaList, agendaByEvent);


    
    const mainEvents: Main[] = events.map(eve => ({
        id: eve.id,
        title: eve.title,
        slug: eve.slug,
        summary: eve.summary,
        description: eve.description,
        start: eve.startTime,
        end: eve.endTime,
        location: eve.location,
        venue: eve.venu,
        bannerUrl: eve.bannerUrl,
        thumbnailUrl: eve.thumbnailUrl,
        commudleUrl: eve.commudleUrl,
        tags: eve.tag,
        status: eve.status,

        host:
            (hostsByEvent.get(eve.id) ?? []).length > 0
                ? {
                      name: hostsByEvent.get(eve.id)![0].Name,
                      avatar: hostsByEvent.get(eve.id)![0].Avatar,
                      role: hostsByEvent.get(eve.id)![0].Title,
                      email: "",
                      linkedin: hostsByEvent.get(eve.id)![0].LinkedIn,
                      x: hostsByEvent.get(eve.id)![0].X
                  }
                : {
                      name: "",
                      avatar: "",
                      role: "",
                      email: "",
                      linkedin: "",
                      x: ""
                  },

        speakers: (speakersByEvent.get(eve.id) ?? []).map(s => ({
            name: s.Name,
            avatar: s.Avatar,
            title: s.Title,
            bio: s.Bio,
            linkedin: s.LinkedIn,
            x: s.X
        })),

        agenda: (agendaByEvent.get(eve.id) ?? []).map(a => ({
            time: a.time,
            title: a.title,
            description: a.description
        }))
    }));
    console.log(mainEvents)

    return mainEvents;
}
 


export default getCSV;