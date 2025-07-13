import Meeting from "../models/Meeting.js";
import {status} from 'http-status';
import User from "../models/User.js";

async function CreateMeeting(req,res) {
    let {meetingID,username,token}= req.body;
    if(await Meeting.findOne({meeting_ID: meetingID})){
       return res.status(status.BAD_REQUEST).json({
            "Created": false,
            "remark": "This MeetingID is already used!"
        });
    }

    let user=await User.findOne({username});
    if(token!=user.token){
     return res.status(status.BAD_REQUEST).json({
            "Created": false,
            "remark": "Authorization failed.Try to re-login!"
        });
    }

    Meeting.create({meeting_ID: meetingID,
      meeting_admin: user
    }).then(
         res.status(status.CREATED).json({
            "Created": true,
            "remark": "Meeting room Created!"
        })
    ).catch((err)=>{
        res.status(status.CREATED).json({
            "Created": false,
            "remark": `${err.message}`
        })
    });
}

async function JoinMeeting(req,res) {
    let {meetingID}= req.body;
    if(await Meeting.findOne({meeting_ID: meetingID})){
        return res.status(status.ACCEPTED).json({
            "isAllowed": true
        });
    }else{
        return res.status(status.NOT_FOUND).json({
            "isAllowed": false
        });;
    }
}

export {CreateMeeting,JoinMeeting};