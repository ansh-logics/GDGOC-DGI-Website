import { createEvent } from "../services/event.service";

export async function createEventController(req, res){
    let data = req.body;
    try{
        const result = createEvent(data.title, data.slug, data.description, data.summary, data.startTime, data.endTime, data.location, data.venue, data.bannerUrl, data.thumbnailUrl, data.registrationUrl, data.tags);
        res.status(201).json(result);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}
export async function getEventsController(req, res) {
    const {page, limit, search, tag, eventType} = req.query;
    
    try{
        const result = await getAllEventsService({
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
    
}
export async function searchEventController(req, res){

}
export async function updateEventController(req, res){

}
export async function addThumbnailController(req, res){

}
export async function updateThumbnailController(req, res){

}

export async function addBannerController(req, res){

}

export async function updateBannerController(req, res){

}

export async function deleteEventController(req, res) {
    
}
