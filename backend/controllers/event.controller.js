import { addBannerService, addThumbnailService, createEvent, deleteEventService, getEventBySlugService, getEventsService, updateEventService  } from "../services/event.service.js";

export async function createEventController(req, res){
    let data = req.body;
    try{
        const result = createEvent(data.title, data.slug, data.description, data.summary, data.startTime, data.endTime, data.eventType, data.location, data.venue, data.registrationUrl, data.tags);
        res.status(201).json(result);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}
export async function getEventsController(req, res) {
    const {page, limit, search, tag, eventType} = req.query;
    
    try{
        const result = await getEventsService({
            page: Number(page),
            limit: Number(limit),
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
    const slug = req.params;
    try{
        let result = getEventBySlugService(slug);
        res.status(200).json(result);
    }catch(err){
        res.status(400).json({error:err.message});
    }
    
}
export async function updateEventController(req, res){
    const {id} = req.params;
    const data = req.body;
    try{
        let event = updateEventService(id, data);
        res.status(201).json(event);
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
