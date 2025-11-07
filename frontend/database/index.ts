
interface Event{
    id:string;
    title:string;
    slug:string;
    summary:string;
    description:string;
    startTime:string;
    endTime:string;
    Date:string;
    location:string;
    venu:string;
    bannerUrl:string;
    thumbnailUrl:string;
    commudleUrl:string;
    tag:string;
    status:string;
}
async function getCSV(){
    console.log("hello world")
    let API_KEY = "AIzaSyASsRizaQYB6yq-mfM-Zrmi_UR_A1g7Gg0";
    let SHEET_ID = "1Mt-yK3YxH528ShEx6YI4i78U66L5izZ14LqAZPCBsec"
    let TAB = "Events"
    let event: Event = {
        id:"",
        title: "",
        slug:"",
        summary:"",
        description:"",
        startTime:"",
        endTime:"",
        Date:"",
        location:"",
        venu:"",
        bannerUrl:"",
        thumbnailUrl:"",
        commudleUrl:"",
        tag:"",
        status:"",
    }
    const eventKeys = Object.keys(event) as (keyof typeof event)[];
    for (const key of eventKeys){
        const value = event[key];
    }
    console.log(event)
    const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${TAB}!A2:Z1000?key=${API_KEY}`
    );
    const data = await response.json();
    console.log(data.values)
    let table = data.values;
    table.forEach((rows: Array<string>)=> {
        rows.forEach((value: string, i:any)=>{
            let key = eventKeys[i];
            event[key] = value;
        })
    });
    console.log(event)
}


export default getCSV;