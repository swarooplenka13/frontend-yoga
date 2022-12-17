const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const BitlyClient = require('bitly').BitlyClient;
const bitly = new BitlyClient('68ce6fc9a38a417cdd18bebad59fe0a2fe6c07b7');
const bcrypt =require('bcryptjs');
const { has } = require('lodash');

const User = mongoose.model('User');

async function example(url) {
    const response = await bitly.shorten(url);
    return response.link;
  }

module.exports.register =async (req, res, next) => {
        fullName=req.body.fullName
        last=req.body.last
        email=req.body.email
        password=req.body.password
        address=req.body.address
        Postalcode=req.body.Postalcode
        City=req.body.City
        Country=req.body.Country
        phone=req.body.phone
        resume=req.body.resume
    if (!fullName || !email || !password) {
        return res.status(500).send("This field can't be empty")
    }
    try {
        const find_response = await User.findOne({ email: email });

        if (find_response) {
            res.status(422).send('User already exists');
        }
        const newuser = new User({fullName,last,email,password,address,Postalcode,City,Country,phone,resume});
        
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
        else if (user) return res.status(200).json({ "token": user.generateJwt(),"res":user['resume'],"email":user['email']});
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}
module.exports.getdata = async(req,res)=>{
    var response= await example(req.body.url)
    response= response.split('/')[3];
    res.status(201).json({"url":response});
}

module.exports.view =async(req,res)=>{
    console.log(req.query.email);
    await User.findOne({email:req.query.email},(err,docs)=>{
        return res.status(200).json(docs);
    });
}
module.exports.userProfile = (req, res, next) =>{
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user :user });
        }
    );
}
 
module.exports.data =(req,res)=>{
   var password=req.body.password,saltSecret;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            this.password = hash;
            console.log("1 "+this.password);
            saltSecret = salt;
            var newuser ={
                fullName:req.body.fullName,
                last:req.body.last,
                email:req.body.email,
                address:req.body.address,
                password:this.password,
                Postalcode:req.body.Postalcode,
                City:req.body.City,
                Country:req.body.Country,
                phone:req.body.phone,
                resume:req.body.resume,
                saltSecret:saltSecret,
                otp:req.body.otp
                 };
                 User.findOneAndUpdate({ email: req.body.email },{$set :newuser},{new: true},(err,docs)=>{
                res.status(201).send(docs);
                 });
        });
    });
}

module.exports.resdata =(req,res)=>{
             var newuser ={
                 fullName:req.body.fullName,
                 last:req.body.last,
                 email:req.body.email,
                 address:req.body.address,
                 password:req.body.password,
                 Postalcode:req.body.Postalcode,
                 City:req.body.City,
                 Country:req.body.Country,
                 phone:req.body.phone,
                 resume:req.body.resume,
                 saltSecret:req.body.saltSecret,
                 otp:0
                  };
                  User.findOneAndUpdate({ email: req.body.email },{$set :newuser},{new: true},(err,docs)=>{
                  res.status(201).send(docs);
                  });
 }
module.exports.data1 =(req,res)=>{
    User.findById({_id:req.params.id},(err,d)=>{
        res.status(201).json({"submit":d['resume']});
    })
}
module.exports.postdata = async(req,r)=>{
    console.log(req.query.res);
    await User.findOne({resume:req.query.res},(err,docs)=>{
        return r.status(200).json(docs);
    });
}
module.exports.fpe = async(req,res)=>{
    await User.findOne({email:req.body.mail},(err,docs)=>{
        return res.status(200).json(docs);
    });
}
module.exports.fpa = async(req,res)=>{
    await User.findOne({resume:req.body.resume},(err,docs)=>{
        return res.status(200).json(docs);
    });
}
module.exports.applied =async(req,res)=>{
    var newuser ={
        CompanyName:req.body.c,
        email:req.body.e,  
        role: req.body.r,
        type: req.body.t,
        desc: req.body.d,
        other:req.body.o,
        address:req.body.a,
        Name:req.body.n,
        Resume:req.body.res,
        Email:req.body.E,
        match:req.body.m,
        alone: req.body.alone,
        attached: req.body.attached,
        attracted: req.body.attracted,
        compound: req.body.compound,
        entitled: req.body.entitled,
        free: req.body.free,
        happy: req.body.happy,
        hated: req.body.hated,
        loved: req.body.loved,
        negative: req.body.negative,
        neutral: req.body.neutral,
        positive: req.body.positive,
        achievement: req.body.achievement,
        active: req.body.active,
        agreeableness: req.body.agreeableness,
        conscientiousness: req.body.conscientiousness,
        cooperative: req.body.cooperative,
        disciplined: req.body.disciplined,
        emotionally_aware: req.body.emotionally_aware,
        extraversion: req.body.extraversion,
        imaginative: req.body.imaginative,
        intellectual: req.body.intellectual,
        neuroticism: req.body.neuroticism,
        openness: req.body.openness,
        trusting: req.body.trusting
    };
    console.log(req.body.email);
    console.log(response);
    v=req.body.email
    await User.findOneAndUpdate( { email: req.body.E },
          {
            $push :{
                applied : newuser
            }
          }
        )
    var response =await User.findOne({email: req.body.E});
    res.status(201).json({response});
}
module.exports.rdata =(req,res)=>{
    var newuser ={
        fullName:req.body.fullName,
        last:req.body.last,
        email:req.body.email,
        address:req.body.address,
        password:req.body.password,
        Postalcode:req.body.Postalcode,
        City:req.body.City,
        Country:req.body.Country,
        phone:req.body.phone,
        resume:req.body.resume,
        saltSecret:req.body.saltSecret,
        otp:req.body.otp
         };
         User.findOneAndUpdate({ email: req.body.email },{$set :newuser},{new: true},(err,docs)=>{
         res.status(201).send(docs);
         });
}