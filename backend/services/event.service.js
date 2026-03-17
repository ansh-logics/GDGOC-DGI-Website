import {Event, Registration, Form} from "../models/event.model.js";

async function checkEventOverlap(startTime, endTime, location, venue){
    const conflict = await Event.findOne({
        location,
        venue,
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
    });
    return conflict;
    
}
export async function createEvent(
  title,
  slug,
  description,
  summary,
  startTime,
  endTime,
  eventType,
  location,
  venue,
  registrationUrl,
  tags,
  host,
  speakers,
  agenda
){
     const existingSlug = await Event.findOne({slug});

     if (existingSlug){
        throw new Error("Slug already exists");
     }

     const conflict = await checkEventOverlap(startTime, endTime, location, venue);
     if (conflict){
        throw new Error("venue is booked");
     }

     const newEvent = await Event.create({
        title,
        slug,
        description,
        summary,
        startTime,
        endTime,
        eventType,
        location,
        venue,
        registrationUrl,
        tags,
        host,
        speakers,
        agenda
     });
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

export async function updateEventService(id, data){
    try{
        const event = await Event.findByIdAndUpdate(
            id,
            data,
            {new:true, runValidators: true}
        );
        return event;
    }catch(err){
        throw new Error(err.message);
    }
}

export async function getEventBySlugService(slug){
    try{
        const event = await Event.findOne({slug});
        return event;
    }catch(err){
        throw new Error(err.message)
    }
}
export async function addThumbnailService(eventId, imageUrl) {
    try{
        let event = await Event.findByIdAndUpdate(
            eventId,
            {thumbnailUrl: imageUrl},
            {new: true, runValidators: true}
        );
        return event;
    }catch(err){
        throw new Error(err.message)
    }
    
}



export async function addBannerService(eventId, imageUrl){
    try{
        let event = await Event.findByIdAndUpdate(
            eventId,
            {bannerUrl: imageUrl},
            {new: true, runValidators: true}
        );
        return event;
    }catch(err){
        throw new Error(err.message)
    }
}

export async function deleteEventService(eventId) {
    try{
        await Event.findByIdAndDelete(eventId);
    }catch(err){
        throw new Error(err.message);
    }
    
}
//admin related actions
export async function createRegistrationForm(data) {
    const {eventId, questions} = data;
    try{
        await Form.create({eventId, questions});
    }catch(err){
        throw new Error(err.message);
    }
    
}

//user related actions
export async function getRegistrationFrom(eventSlug){
    try{
        let event = await Event.findOne({slug:eventSlug});
        let eventId = event.id;
        let registrationForm = await Form.findOne({eventId});
        return registrationForm;
    }catch(err){
        throw new Error(err.message);
    }
}

export async function registerInEvent(data) {
   const {formId, userId, answers} = data;
    try{
        let result = await Registration.create({formId, userId, answers});
        return true;
    }catch(err){
        throw new Error(err.message);
    }
}