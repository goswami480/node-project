const express=require("express")
const User=require('../model/user')
const { hashedpassword,comparepassword,regexemail}=require('../authservice')

const add=async(req,res)=>{
    try{
        
        const{name,email,password,address,phone}=req.body
        // console.log(">>>>",req.body)
        console.log("Extracted Fields:", { name, email, password, address,phone });
        
        if(!name || !email || !password || !address || !password){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        const validemail=await regexemail(email)
        if (!validemail) {
            console.log("Invalid email format:", email);
            return res.status(400).json({ message: "Invalid email format" });
          }
        const hashedPassword = await hashedpassword(password); 
        console.log("Hashed Password:", hashedPassword);
        const user=new User({
            name,
            email,
            password:hashedPassword,
            address,
            phone
        })
        console.log(">>>>",user)
        const saveduser=await user.save()
        console.log(">>>>>>>",saveduser)
        res.status(201).send({data:saveduser,message:"user saved successfully"})

    }catch(err){
        console.error("Error during user creation:", err);
        res.status(500).send(err)
    }

}
module.exports = add