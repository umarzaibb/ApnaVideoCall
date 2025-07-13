import mongoose from "mongoose";

const meetingSchema= new mongoose.Schema({

      meeting_ID: {
        type: String,
        required: true
      },
      
      meeting_time: {
        type : Date,
        default: Date.now,
        required: true
      },

      meeting_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
});

export default mongoose.model("Meeting", meetingSchema);