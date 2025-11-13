interface Main {
    id: string,
    title: string,
    slug: string,
    summary: string,
    description: string,
    start: string,
    end: string,
    location: string,
    venue: string,
    bannerUrl: string,
    thumbnailUrl: string,
    commudleUrl: string,
    tags: string,
    status: string,
    host: {
        name: string,
        avatar: string,
        role: string,
        email: string,
        linkedin: string
        x: string
    }
    speakers: [
        {
            name: string,
            avatar: string,
            title: string,
            bio: string,
            linkedin: string,
            x: string

        }
    ]
    agenda: [
        {
            time: string,
            title: string,
            description: string,
        }
    ]
}

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
    SpeakerId: string,
    EventId: string,
    Name: string,
    Avatar: string,
    Title: string,
    Bio: string,
    LinkedIn: string,
    X: string
}
interface Hosts {
    HostId: string,
    EventId: string,
    Name: string,
    Avatar: string,
    Title: string,
    Bio: string,
    LinkedIn: string,
    X: string
}
interface Agenda {
    EventId: string,
    time: string,
    title: string,
    description: string,
}


async function getCSV() {
    let API_KEY = "AIzaSyASsRizaQYB6yq-mfM-Zrmi_UR_A1g7Gg0";
    let SHEET_ID = "1Mt-yK3YxH528ShEx6YI4i78U66L5izZ14LqAZPCBsec"
    let tabs = ['Events', 'Speakers', 'Hosts', 'Agenda']
    let eventTemplate: Event = {
        id: "",
        title: "",
        slug: "",
        summary: "",
        description: "",
        startTime: "",
        endTime: "",
        Date: "",
        location: "",
        venu: "",
        bannerUrl: "",
        thumbnailUrl: "",
        commudleUrl: "",
        tag: "",
        status: "",
    }
    let speakersTemplate: Speakers = {
        SpeakerId: "",
        EventId: "",
        Name: "",
        Avatar: "",
        Title: "",
        Bio: "",
        LinkedIn: "",
        X: ""
    }
    let hostsTemplate: Hosts = {
        HostId: "",
        EventId: "",
        Name: "",
        Avatar: "",
        Title: "",
        Bio: "",
        LinkedIn: "",
        X: ""
    }
    let agendaTemplate: Agenda = {
        EventId: "",
        time: "",
        title: "",
        description: ""
    }

    // storage for parsed rows
    const events: Event[] = [];
    const speakersList: Speakers[] = [];
    const hostsList: Hosts[] = [];
    const agendaList: Agenda[] = [];

    // loop for each tab
    for (const tab of tabs) {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${tab}!A2:Z1000?key=${API_KEY}`
        );
        const data = await response.json();
        const table = data.values || [];

        let keys: string[] = [];
        if (tab === 'Events') keys = Object.keys(eventTemplate);
        else if (tab === 'Speakers') keys = Object.keys(speakersTemplate);
        else if (tab === 'Hosts') keys = Object.keys(hostsTemplate);
        else if (tab === 'Agenda') keys = Object.keys(agendaTemplate);

        table.forEach((rows: Array<string>) => {
            const obj: any = {};
            rows.forEach((value: string, i: number) => {
                if (i < keys.length) {
                    const key = keys[i];
                    obj[key] = value;
                }
            });

            if (tab === 'Events') events.push(obj as Event);
            else if (tab === 'Speakers') speakersList.push(obj as Speakers);
            else if (tab === 'Hosts') hostsList.push(obj as Hosts);
            else if (tab === 'Agenda') agendaList.push(obj as Agenda);
        });
    }

    //now parsing all the data event wise.
    const mainEvents: Main[] = [];
    
    events.forEach((eve: Event) => {
        const eventId = eve.id;
        const speakersForEvent = speakersList.filter(s => s.EventId === eventId);
        const hostsForEvent = hostsList.filter(h => h.EventId === eventId);
        const agendaForEvent = agendaList.filter(a => a.EventId === eventId);
        
        // Map event to Main interface structure
        const mainEvent: Main = {
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
            host: hostsForEvent.length > 0 ? {
                name: hostsForEvent[0].Name,
                avatar: hostsForEvent[0].Avatar,
                role: hostsForEvent[0].Title,
                email: "", // Not available in Hosts interface
                linkedin: hostsForEvent[0].LinkedIn,
                x: hostsForEvent[0].X
            } : {
                name: "",
                avatar: "",
                role: "",
                email: "",
                linkedin: "",
                x: ""
            },
            speakers: speakersForEvent.map(speaker => ({
                name: speaker.Name,
                avatar: speaker.Avatar,
                title: speaker.Title,
                bio: speaker.Bio,
                linkedin: speaker.LinkedIn,
                x: speaker.X
            })) as any,
            agenda: agendaForEvent.map(agenda => ({
                time: agenda.time,
                title: agenda.title,
                description: agenda.description
            })) as any
        };
        
        mainEvents.push(mainEvent);
    });
    
    console.log("Mapped events:", mainEvents);
    return mainEvents;
}


export default getCSV;