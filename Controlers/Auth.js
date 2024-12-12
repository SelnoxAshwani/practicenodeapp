const User = require('../Models/User')
const { ObjectId } = require('mongoose').Types;
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs')
const path = require('path')
async function loginuser(req ,res){
    let body = req.body
     try {
        if (!body.email || !body.password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }else{
                const currentuser = await User.findOne({ email: body.email})
                if(!currentuser) res.status(404).send('user not found')
                await bcrypt.compare( body.password, currentuser.password, function(err, result){
                    if(err){
                        res.status(400).send('password not matched');}
                    if (result === true) {
                        var token = jwt.sign({ email: body.email }, 'ashwani');
                        res.set('Content-Type', currentuser.img.contentType);
                        res.send(currentuser.img.data);
                        // console.log(currentuser.img.contentType)
                        // res.status(201).json({message:token})
                    } else {
                    res.status(400).send('password not matched')
                    }
                });
        }
     }catch (error) {
         console.error('Error creating user:', error);
         res.status(400).json({ message: 'Error creating user', error: error.message });
     }
}


async function addnewuser(req ,res){
    let body = req.body
     try {
        let hashpass =''
        await bcrypt.hash( body.password , 14).then((res)=>{
            hashpass= res 
        })
         const pathodnode = __dirname.split('\\').splice(0 ,__dirname.split('\\').length -1).join('\\')
         const result = await User.create({
             id: new ObjectId().toString(),
             user_name: body.username,
             email: body.email,
             mobile: body.mobile,
             password: hashpass,
             img: {
                data: fs.readFileSync(path.join(pathodnode + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
             }
         });
         console.log('New User Created:', result);
         
        res.status(201).json({ message: 'User created successfully' });
     }catch (error) {
         console.error('Error creating user:', error);
         res.status(400).json({ message: 'Error creating user', error: error.message });
     }
}
module.exports={
    loginuser,addnewuser,
}