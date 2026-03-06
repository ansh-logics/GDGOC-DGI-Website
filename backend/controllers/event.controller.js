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