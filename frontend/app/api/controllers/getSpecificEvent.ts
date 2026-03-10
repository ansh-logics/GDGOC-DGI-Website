import type { Main } from "@/types/event";
import { getEventBySlugApi, type BackendEvent } from "@/lib/api";

export default async function getSpecificEvent(
  slug: string,
  token?: string
): Promise<Main | null> {
  const backendEvent = await getEventBySlugApi(slug, token);

  if (!backendEvent) {
    return null;
  }

  const startDate = new Date(backendEvent.startTime);
  const endDate = new Date(backendEvent.endTime);

  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 1;
  const day = startDate.getDate();

  const now = new Date();
  let status: string = "past";
  if (now < startDate) {
    status = "upcoming";
  } else if (now >= startDate && now <= endDate) {
    status = "ongoing";
  }

  const mainEvent: Main = {
    id: backendEvent._id,
    title: backendEvent.title,
    slug: backendEvent.slug,
    summary: backendEvent.summary || backendEvent.description,
    description: backendEvent.description,
    start: backendEvent.startTime,
    end: backendEvent.endTime,
    location: backendEvent.location,
    venue: backendEvent.venue,
    bannerUrl: backendEvent.bannerUrl || backendEvent.thumbnailUrl || "",
    thumbnailUrl: backendEvent.thumbnailUrl || "",
    commudleUrl: backendEvent.registrationUrl || "#",
    tags: backendEvent.tags.join(", "),
    status,
    date: day,
    month,
    year,
    host: backendEvent.host
      ? {
          name: backendEvent.host.name,
          avatar: backendEvent.host.avatar,
          role: backendEvent.host.title,
          email: "",
          linkedin: backendEvent.host.linkedin,
          x: backendEvent.host.x,
        }
      : {
          name: "GDG on Campus Dronacharya",
          avatar: "/images/gdg-logo.png",
          role: "Organizer",
          email: "",
          linkedin: "",
          x: "",
        },
    speakers: Array.isArray(backendEvent.speakers)
      ? backendEvent.speakers.map((s) => ({
          name: s.name,
          avatar: s.avatar,
          title: s.title,
          bio: s.bio,
          linkedin: s.linkedin,
          x: s.x,
        }))
      : [],
    agenda: Array.isArray(backendEvent.agenda)
      ? backendEvent.agenda.map((a) => ({
          time: a.time,
          title: a.title,
          description: a.description,
        }))
      : [],
  };

  return mainEvent;
}
