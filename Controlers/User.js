const User = require('../Models/User')
const { ObjectId } = require('mongoose').Types;

async function getalluser(req ,res){
 
        try {
            const users = await User.find({});
            return res.status(200).json(users)
        } catch (err) {
            console.error('Error fetching data:', err);
            return res.send("something went wrong")
        }
}
async function deleteuser(req ,res){
 
    try {
        let idd = req.params.id
        const users = await User.findByIdAndDelete(idd);
        res.status(200).send('your data is delete')
    } catch (err) {
        console.error('Error fetching data:', err);
        return res.send("something went wrong")
    } finally {
        return res.send("users")
        
    }

}
async function edituser(req ,res){
   console.log(req.body)
    try {
        const body = await req.body 
        console.log(body)
        let idd = req.params.id
        console.log(idd)
        const users = await User.findByIdAndUpdate(idd ,body );
        res.status(200).send('your data is edit')
    } catch (err) {
        console.error('Error fetching data:', err);
        return res.status(400).send("something went wrong")
    }
}
async function getalluserbtid(req ,res){
 
    try {
        let idd = req.params.id
        const users = await User.findById(idd);
        return res.status(200).json(users)
    } catch (err) {
        console.error('Error fetching data:', err);
        return res.send("something went wrong")
    } finally {
        return res.send("users")
        
    }

}
async function addnewuser(req ,res){
   let body = req.body
    try {
        const result = await User.create({
            id: new ObjectId().toString(),
            user_name: body.name,
            email: body.email,
            mobile: body.mobile,
            password: body.password,
        });
        console.log('New User Created:', result);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        // Handle errors (e.g., validation errors, duplicate email, etc.)
        console.error('Error creating user:', error);
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
}

module.exports= {getalluser, deleteuser , edituser ,getalluserbtid ,addnewuser }