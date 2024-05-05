const express=require('express')
const app=express()
const mongoose=require('mongoose')
const User=require('./userSchema')
const Contact=require('./contactSchema')
const uri = 'your url here';
app.use(express.json())
mongoose.connect(uri).then(e=>{
    console.log('connected')
}).catch(e=>{console.log(e)})

app.post('/signup',async(req,res)=>{
   // Extracting the data 
   const {username,email,password}=req.body;
   //creating the new User
   const user= new User ({
        username,
        email,
        password
        })
   //saving into the database
    user.save().then( ()=>{
            res.status(200).json({"message":"User Created"})
        }
    ).catch((e)=>res.status(500).json({"message":"Internal Server error","error":e}))
    
});

    app.post('/login', async (req, res) => {
        const { username, password } = req.body;
      
        // Find the user in the database
        const user = await User.findOne({ username });
      
        // If the user is not found or the password is incorrect, return an error
        if (!user || !(password==user.password)) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
      
        // Successful login
        res.json({ message: 'Login successful' });
      });



////Contact Us api////

app.post('/contact',(req,res)=>{
    const {name,email,message} =req.body
     const contact=new Contact({
        name,
        email,
        message
     })

     contact.save().then(()=>{
        res.status(204).json({"message":"Successfully saved"});
     }).catch((e)=>{
        res.status(500).json({"message":"Internal server error",e})
     })

})

      
app.listen(process.env.PORT || 5000 ,()=>{
    console.log('running ')
})
