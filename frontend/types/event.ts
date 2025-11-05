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
  start: string; // ISO 8601 format
  end: string; // ISO 8601 format
  location: string; // "Online" or physical location
  venue?: string;
  bannerUrl: string;
  thumbnailUrl: string;
  commudleUrl: string;
  tags: string[];
  host: EventHost;
  speakers?: EventSpeaker[];
  agenda?: EventAgendaItem[];
  resources?: EventResource[];
  status: 'upcoming' | 'past' | 'ongoing';
  capacity?: number;
  registered?: number;
  blogPostUrl?: string;
  lessonsLearned?: string;
  year: number;
}

export interface EventsData {
  upcoming: Event[];
  past: Event[];
}

/**
 * JSON Schema Example
 */
export const eventSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "title", "slug", "summary", "start", "end", "location", "bannerUrl", "thumbnailUrl", "commudleUrl", "host", "status"],
  "properties": {
    "id": { "type": "string" },
    "title": { "type": "string" },
    "slug": { "type": "string" },
    "summary": { "type": "string", "maxLength": 200 },
    "description": { "type": "string" },
    "start": { "type": "string", "format": "date-time" },
    "end": { "type": "string", "format": "date-time" },
    "location": { "type": "string" },
    "venue": { "type": "string" },
    "bannerUrl": { "type": "string", "format": "uri" },
    "thumbnailUrl": { "type": "string", "format": "uri" },
    "commudleUrl": { "type": "string", "format": "uri" },
    "tags": { "type": "array", "items": { "type": "string" } },
    "host": { "type": "object" },
    "speakers": { "type": "array" },
    "agenda": { "type": "array" },
    "resources": { "type": "array" },
    "status": { "type": "string", "enum": ["upcoming", "past", "ongoing"] },
    "capacity": { "type": "number" },
    "registered": { "type": "number" },
    "blogPostUrl": { "type": "string", "format": "uri" },
    "lessonsLearned": { "type": "string" },
    "year": { "type": "number" }
  }
};

