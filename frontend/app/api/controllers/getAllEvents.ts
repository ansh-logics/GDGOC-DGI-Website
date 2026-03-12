import { AllEvents } from "@/types/event";
import { format } from "date-fns";
import { getEventsApi, type BackendEvent } from "@/lib/api";

export default async function getAllEvents(token?: string): Promise<AllEvents[]> {
  try {
    const { events } = await getEventsApi(token);

    const allEvents: AllEvents[] = events.map((eve: BackendEvent) => {
      let dateStr = "";
      try {
        const eventDate = new Date(eve.startTime);
        if (!isNaN(eventDate.getTime())) {
          dateStr = format(eventDate, "dd-MM-yyyy");
        }
      } catch (e) {
        console.warn(`Invalid start date for event ${eve._id}`, e);
      }

      return {
        id: eve._id,
        name: eve.title,
        slug: eve.slug,
        desc: eve.summary || eve.description,
        location: eve.location,
        start: eve.startTime,
        end: eve.endTime,
        date: dateStr,
        thumbnailurl: eve.thumbnailUrl || "",
        commudleUrl: eve.registrationUrl || "#",
      };
    });

    return allEvents;
  } catch (error) {
    console.error("Error fetching events from backend:", error);
    throw error;
  }
}
