import { Main, AllEvents} from "@/types/event";


export default async function getAllEvents(){
    try {
        const cache = await caches.open('my-cache');
        const match = await cache.match('/event-data');
        
        if (!match){
            throw new Error("No event data found in cache");
        }
        
        const data = await match.json();
        const raw: Main[] = data.data;
        
        const allEvents: AllEvents[] = raw.map(eve => ({
            id: eve.id,
            name: eve.title,
            slug: eve.slug,
            desc: eve.description,
            location: eve.location,
            time: eve.start,
            date: `${eve.date}-${eve.month}-${eve.year}`,
            thumbnailurl: eve.thumbnailUrl,
        }));

        return allEvents;
        
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
}