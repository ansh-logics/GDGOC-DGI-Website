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
export async function getEventsService({page = 1, limit = 10, search, tag, eventType}){
    const query = {};

    if(search){
        query.$text = {$search: search};
    }

    if(tag){
        query.tags = tag;
    }

    if(eventType){
        query.eventType = eventType;
    }

    const skip = (page -1) * limit;

    const events = await Event.find(query).sort({startTime:1}).skip(skip).limit(limit);

    const total = await Event.countDocuments(query);

    return {
        events, 
        total,
        page, 
        pages: Math.ceil(total/limit)
    }
}
export async function addThumbnailService() {
    
}

export async function updateThumbnailService(){

}

export async function addBannerService(){

}

export async function updateBannerService() {
    
}