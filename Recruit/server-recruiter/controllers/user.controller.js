let v;
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt=require("bcryptjs");
const _ = require('lodash');

const User = mongoose.model('User');

module.exports.register = async(req, res, next) => {
    var user = new User();
    fullName = req.body.fullName;
    email = req.body.email;
    password = req.body.password;
    pass=req.body.password;
    hire = true;
    if (!fullName || !email || !password) {
        return res.status(500).send("This field can't be empty")
    }
    try {
        const find_response = await User.findOne({ email: email });

        if (find_response) {
            res.status(422).send('Recruiter already exists');
        }
        const newuser = new User({ fullName, email, password,hire:hire});
        
        const data = await newuser.save();
        res.status(201).send(data);

    } catch (err) {
      res.status(500).send(err.name)
    }
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt(),"email":user['email'] });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.data =async(req,res)=>{
    var newuser ={
        CompanyName:req.body.CompanyName,
        role:req.body.role,
        email:req.body.email,
        address:req.body.address,
        type:req.body.type,
        other:req.body.other,
        desc:req.body.desc,
    };
    console.log(req.body.email);
    console.log(response);
    v=req.body.email
    await User.findOneAndUpdate( { email: req.body.email },
          {
            $push :{
                post : newuser
            }
          }
        )
    var response =await User.findOne({email: req.body.email});
    res.status(201).json({response});
}
module.exports.view =async(req,res)=>{
    console.log(req.query.email);
    await User.findOne({email:req.query.email},(err,docs)=>{
        return res.status(200).json(_.pick(docs,['post']));
    });
}

module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user :{
                    name:user.fullName,
                    password:user.password,
                    email:user.email,
                    salt:user. saltSecret,
                    post:user.post
                }});
        }
    );
}

module.exports.update =(req,res)=>{
    var newuser ={
        CompanyName:req.body.name,
        email:req.body.email,
        password:req.body.password,
        saltSecret:req.body.saltSecret,
        post:req.body.post,
        otp:0
         };
         User.findOneAndUpdate({ email: req.body.email },{$set :newuser},{new: true},(err,docs)=>{
         res.status(201).send(docs);
         });
}
module.exports.delete =async(req,res)=>{
    var newuser ={
        CompanyName:req.body.CompanyName,
        role:req.body.role,
        email:req.body.email,
        address:req.body.address,
        type:req.body.type,
        other:req.body.other,
        desc:req.body.desc,
        otp:0
    };
    console.log(req.body.email);
    v=req.body.email
    await User.findOneAndUpdate( { email: req.body.email },
          {
            $pull :{
                post :{
                    role:req.body.role
                } 
            }
          }
        )
    var response =await User.findOne({email: req.body.email});
    res.status(201).json({response});
}

module.exports.fpe = async(req,res)=>{
    await User.findOne({email:req.body.mail},(err,docs)=>{
        return res.status(200).json(docs);
    });
}
module.exports.updata =(req,res)=>{
    var password=req.body.password,saltSecret;
     bcrypt.genSalt(10, (err, salt) => {
         bcrypt.hash(password, salt, (err, hash) => {
             this.password = hash;
             console.log("1 "+this.password);
             saltSecret = salt;
             var newuser ={
                 fullName:req.body.fullName,
                 email:req.body.email,
                 password:this.password,
                 post:req.body.post,
                 saltSecret:saltSecret,
                 otp:req.body.otp
                  };
                  User.findOneAndUpdate({ email: req.body.email },{$set :newuser},{new: true},(err,docs)=>{
                 res.status(201).send(docs);
                  });
         });
     });
 }
 module.exports.v =async(req,res)=>{
    await User.find({},(err,docs)=>{
        console.log("Hi")
        return res.status(200).json(docs);
    });
}

module.exports.rdata =(req,res)=>{
    var newuser ={
        fullName:req.body.fullName,
        email:req.body.email,
        password:req.body.password,
        post:req.body.post,
        otp:req.body.otp
         };
         User.findOneAndUpdate({ email: req.body.email },{$set :newuser},{new: true},(err,docs)=>{
         res.status(201).send(docs);
         });
}
module.exports.sent =async(req,res)=>{
    var newuser ={
        name:req.body.name,
        role:req.body.role,
        mail:req.body.mail,
        type:req.body.type,
        sal:req.body.sal,
        res:req.body.res,
    };
    console.log(req.body.mail);
    console.log(response);
    v=req.body.email
    await User.findOneAndUpdate( { email: req.body.email },
          {
            $push :{
                sent : newuser
            }
          }
        )
    var response =await User.findOne({email: req.body.email});
    res.status(201).json({sent: response['sent']});
}
