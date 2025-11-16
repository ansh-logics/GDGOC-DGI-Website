export default async function getSpecificEvent(slug:string){
    const cache = await caches.open('my-cache');
    const match = await cache.match('/event-data');



    if(!match){
        throw new Error("no event data found in cache");
    }else{
        const raw = await match.json();
        const allData = raw.data;
        const data = allData.find((e: any) => e.slug === slug);
        console.log(data);
        return data;
    }
}