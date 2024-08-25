import mongoose, { model } from "mongoose";

const pilotSchema=new mongoose.Schema(
    {
        id:
        {
            type:String,
            required:true,
            unique:true
        },
        name:
        {
            type:String,
            required:true,
        }
        ,
        profileImage:
        {
            type:String
        },
        workExperience:
        {
            type:Number,
            required:true
        },
        location:
        {
            type:String,
            required:true
        },
        GeolocationCoordinates:
        {
            latitude: 
            {
                type:Number
            },
            longitude:
            {
                type:Number
            } 
        }
    }
)

const pilot=mongoose.model("Pilot",pilotSchema);
export default pilot;

