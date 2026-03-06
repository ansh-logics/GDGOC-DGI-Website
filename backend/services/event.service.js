import Event from "../models/event.model";

async function checkEventOverlap(startTime, endTime, location, venue){
    const conflict = await Event.findOne({
        location,
        venue,
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
    });
    return conflict;
    
}
export async function createEvent(title, slug, description, summary, startTime, endTime, location, venue, bannerUrl, thumbnailUrl, registrationUrl, tags){
     const existingSlug = await Event.findOne({slug});

     if (existingSlug){
        throw new Error("Slug already exists");
     }

     const conflict = checkEventOverlap(startTime, endTime, location, venue);
     if (conflict){
        throw new Error("venue is booked");
     }

     const newEvent = await Event.create({title, slug, description, summary, startTime, endTime, location, venue, bannerUrl, thumbnailUrl, registrationUrl, tags});
     return newEvent;
}