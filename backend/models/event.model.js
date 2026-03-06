import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
{
   title:{
    type:String,
    required:true,
    trim:true
   },

   slug:{
    type:String,
    required:true,
    lowercase:true,
    trim:true,
    unique:true,
    index:true
   },

   description:{
    type:String,
    required:true
   },

   summary:{
    type:String,
    required:true
   },

   startTime:{
    type:Date,
    required:true,
    index:true
   },

   endTime:{
    type:Date,
    required:true
   },

   eventType:{
    type:String,
    enum:["virtual", "inperson"],
    required:true
   },

   location:{
    type:String,
    required:true,
    trim:true
   },

   venue:{
    type:String,
    required:true,
    trim:true
   },

   bannerUrl:{
    type:String,
    required:true
   },

   thumbnailUrl:{
    type:String,
    required:true
   },

   registrationUrl:{
    type:String,
    required:true
   },

   tags:{
    type:[String],
    default:[]
   }

},
{
   timestamps:true
}
);

eventSchema.index({ location:1, venue: 1, startTime: 1, endTime: 1 });
eventSchema.index({title:"text", description:"text", tags:"text"},
   {
      weights:{
         title:5,
         tags:3,
         description:1
      }
   }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;