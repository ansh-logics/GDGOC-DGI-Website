import mongoose, { mongo } from "mongoose";

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
    enum:["virtual", "inperson", "offline"],
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
   },

   thumbnailUrl:{
    type:String,
   },

   registrationUrl:{
    type:String,
    required:true
   },

   tags:{
   type:[String],
   default:[]
   },

   host:{
      name:{ type:String },
      avatar:{ type:String },
      title:{ type:String },
      bio:{ type:String },
      linkedin:{ type:String },
      x:{ type:String }
   },

   speakers:[
      {
         name:{ type:String },
         avatar:{ type:String },
         title:{ type:String },
         bio:{ type:String },
         linkedin:{ type:String },
         x:{ type:String }
      }
   ],

   agenda:[
      {
         time:{ type:String },
         title:{ type:String },
         description:{ type:String }
      }
   ],
   formId:{
      type: mongoose.Types.ObjectId,
      ref: 'Form'
   },
   registrationsId:{
      type: mongoose.Types.ObjectId,
      ref:'Registration'
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
const formSchema = new mongoose.Schema({
   eventId:{
      type:mongoose.Types.ObjectId,
      ref:'Event'
   }, 
   questions:[
      {
         question:{
            type:String,
         },
         type:{
            type:String,
            enum:["mcq", "text", "para", "file"],
            default:"text"
         },
         options:{
            type:[String]
         },
         multipleChoice:{
            type:Boolean,
            default:false
         }
      }
   ]
});

const registrationSchema = {
   formId:{
      type: mongoose.Types.ObjectId,
      ref:'Form'
   }, 
   userId:{
      type: mongoose.Types.ObjectId,
      ref:'User'
   },
   answers:[
      {type:String}
   ]

}

export const Event = mongoose.model("Event", eventSchema);
export const Form = mongoose.model("Form", formSchema);
export const Registration = mongoose.model("Regsitration", registrationSchema);
