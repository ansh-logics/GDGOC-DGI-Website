import { addBannerService, addThumbnailService, createEvent, createRegistrationFormService, deleteEventService, getEventBySlugService, getEventsService, getRegistrationFromService, registerInEventService, updateEventService  } from "../services/event.service.js";

export async function createEventController(req, res){
    try{
        let data = req.body;
        const result = await createEvent(
            data.title,
            data.slug,
            data.description,
            data.summary,
            data.startTime,
            data.endTime,
            data.eventType,
            data.location,
            data.venue,
            data.registrationUrl,
            data.tags,
            data.host,
            data.speakers,
            data.agenda
        );
        res.status(201).json(result);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}
export async function getEventsController(req, res) {
    const {page, limit, search, tag, eventType} = req.query;
    
    try{
        const result = await getEventsService({
            page: page ? Number(page) || 1 : 1,
            limit: limit ? Number(limit) || 10 : 10,
            search,
            tag,
            eventType
        });
    
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({error:"Internal Server Error"});
    }

}
export async function getEventBySlugController(req, res) {
    const { slug } = req.params;
    try{
        const result = await getEventBySlugService(slug);
        if (!result) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(result);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}
export async function updateEventController(req, res){
    const { eventId } = req.params;
    const data = req.body;
    try{
        const event = await updateEventService(eventId, data);
        res.status(200).json(event);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}
export async function addThumbnailController(req, res){
    try{
        const { eventId } = req.params;
        const imageUrl = req.file.path;
        const event = await addThumbnailService(eventId, imageUrl);
        res.status(200).json(event);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}


export async function addBannerController(req, res){
    try{
        const { eventId } = req.params;
        const imageUrl = req.file.path;
        const event = await addBannerService(eventId, imageUrl);
        res.status(200).json(event);
    }catch(err){
        res.status(400).json({error:err.message});
    } 
}


export async function deleteEventController(req, res) {
    try{
        let {eventId} = req.params;
        deleteEventService(eventId);
        res.status(200).json({sucess:"Deleted Successfully"});
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

export async function createRegistrationFormController(req, res) {
    try{
        const data = req.body;
        let createdRegistrationFrom = createRegistrationFormService(data);
        if(createdRegistrationFrom){
            res.status(200).json({success:"Registration from is created"});
        }
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

export async function getRegistrationFormController(req, res) {
    try{
        const {slug}= req.params;
        console.log(slug)
        let form = await getRegistrationFromService(slug);
        res.status(200).json({form});
    }catch(err){
        res.status(500).json({error:err.message});
    } 
}

export async function registerInEventController(req, res){
    try{
        let data = req.body;
        let registeredInEvent = registerInEventService(data);
        if (registeredInEvent) res.status(200).json({success:"Successfully Registered"});
    }catch(err){
        res.status(500).json({error:err.message})
    }

}
export async function deleteRegistrationFormController(req, res) {
    let {slug} = req.params;

    
}