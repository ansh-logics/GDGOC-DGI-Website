export default async function getAllEvents(){
    const cache = await caches.open('my-cache');
    const match = await cache.match('/event-data');
    if (!match){
        throw new Error("No event data found in cache");
    }else{
        let data = await match.json();
        console.log(data['id']);
        return data;
    }
    
};