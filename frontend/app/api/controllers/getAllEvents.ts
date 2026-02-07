import { Main, AllEvents } from "@/types/event";
import { format } from "date-fns";


export default async function getAllEvents() {
    try {
        const cache = await caches.open('my-cache');
        const match = await cache.match('/event-data');

        if (!match) {
            throw new Error("No event data found in cache");
        }

        const data = await match.json();
        const raw: Main[] = data.data;
        console.log(raw)

        const allEvents: AllEvents[] = raw.map(eve => {
            let dateStr = `${eve.date}-${eve.month}-${eve.year}`;
            try {
                const eventDate = new Date(eve.start);
                if (!isNaN(eventDate.getTime())) {
                    dateStr = format(eventDate, "dd-MM-yyyy");
                }
            } catch (e) {
                console.warn(`Invalid start date for event ${eve.id}`, e);
            }

            return {
                id: eve.id,
                name: eve.title,
                slug: eve.slug,
                desc: eve.description,
                location: eve.location,
                start: eve.start,
                end: eve.end,
                date: dateStr,
                thumbnailurl: eve.thumbnailUrl,
                commudleUrl: eve.commudleUrl || "#",
            };
        });

        return allEvents;

    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
}