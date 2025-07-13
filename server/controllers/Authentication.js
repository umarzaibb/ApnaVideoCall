import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.js";
import {status} from 'http-status';

async function Register(req,res) {
    let {name, username, password}=req.body;
    if(!name || !username || !password){
        return res.status(status.BAD_REQUEST).json({
            "message": "Insufficient info!"
        });
    }

    if(await User.findOne({username})){
        return res.status(status.BAD_REQUEST).json({
            "message": "User already exists!"
        });
    }
    
    let hashedPassword=await bcrypt.hash(password, 10);
    let user=new User({
        name:name,
        username:username,
        password: hashedPassword
    });

    await user.save();
         res.status(status.CREATED).json({
            "message": "You signed In!"
    });

}

async function Login(req,res){
    let {username, password}=req.body;

    if(!username || !password){
        return res.status(status.BAD_REQUEST).json({
            "message": "Insufficient info!"
        });
    }

    let user=await User.findOne({username});
    if(!user){
        return res.status(status.BAD_REQUEST).json({
            "message": "User donot exist!"
        });
    }

    if(!(await bcrypt.compare(password,user.password))){
        return res.status(status.BAD_REQUEST).json({
            "message": "Incorrect Password!"
        });
    }

    let token=await crypto.randomBytes(16).toString("hex");
    user.token=token;
    await user.save();
    res.status(status.ACCEPTED).json({
            "token": token
    });

}

export {Register,Login};