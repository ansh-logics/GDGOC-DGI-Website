/**
 * Event Type Definitions and Schema
 * For GDG on Campus Events
 */

export interface EventHost {
  name: string;
  avatar: string;
  role: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

export interface EventSpeaker {
  name: string;
  avatar: string;
  title: string;
  bio: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface EventResource {
  type: 'slides' | 'recording' | 'blog' | 'repo' | 'docs' | 'other';
  title: string;
  url: string;
  license?: string;
  description?: string;
}

export interface EventAgendaItem {
  time: string;
  title: string;
  description: string;
  speaker?: string;
}

export interface Event {
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

export interface Speakers {
  SpeakerId: string;
  EventId: string;
  Name: string;
  Avatar: string;
  Title: string;
  Bio: string;
  LinkedIn: string;
  X: string;
}

export interface Hosts {
  HostId: string;
  EventId: string;
  Name: string;
  Avatar: string;
  Title: string;
  Bio: string;
  LinkedIn: string;
  X: string;
}

export interface Agenda {
  EventId: string;
  time: string;
  title: string;
  description: string;
}

export interface Main {
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
  date: number;
  month: number;
  year: number;
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

export interface CacheData {
  lastModified: string;
  data: Main[];
}

export type ListMap<T> = Map<string, T[]>;
export interface AllEvents{
    id: string,
    name: string,
    slug:string,
    desc: string,
    location: string,
    start: string,
    end:string
    date: string,
    thumbnailurl: string,
}

