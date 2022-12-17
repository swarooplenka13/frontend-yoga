const mongoose = require('mongoose');

const _ = require('lodash');
const axios = require("axios");


const User = mongoose.model('User');
const client= require("@sendgrid/mail")
client.setApiKey(process.env.API)
module.exports.register = async(req, res) => {
    var newuser ={
        CompanyName:req.body.CompanyName,
        role:req.body.role,
        email:req.body.email,
        address:req.body.address,
        type:req.body.type,
        other:req.body.other,
        desc:req.body.desc,
    };
   var user = new User({post:newuser});
    await user.save();
    res.status(201).json(newuser);
}
module.exports.userProfile = (req, res) =>{
    User.find(
        (err, user) => {
            if (!user)
                return res.status(404).json('No Data found.');
            else
                return res.status(200).json(user);
        }
    );
}
module.exports.getd = async(req,r)=>{
    console.log(req.query.id);
    await User.findOne({_id:req.query.id},(err,docs)=>{
        return r.status(200).json(docs);
    });
}
module.exports.data =async(req,res)=>{
    console.log(req.body)
    await User.findOneAndUpdate({},
        {
          $push :{
              applied : req.body
          }
        }
      )
    var response =await User.find({});
    res.status(201).json({response});
}
module.exports.delete =async(req,res)=>{
    console.log(req.body)
    resp= await User.findOneAndUpdate({},
        {
          $pull :{
              post : {
                role:req.body.role
              }
          }
        }
      )
    res.status(201).json({resp});
}
module.exports.view =async(req,res)=>{
    await User.findOne({},(err,docs)=>{
        return res.status(200).json(_.pick(docs,['applied']));
    });
}
module.exports.mail=(req,res)=>{
    client.send(
        {
            to:{
                email:req.body.mail,
                name:req.body.name
            },
            from:{
              email:'swarooplenka535@gmail.com',
              name:'Recruit Acquistion Ltd'
            },
            templateId:"d-f8134ef03eab4a0fb0078e6214033b4c",
            dynamicTemplateData:{
                name:req.body.name,
                subject:"Recruit",
                company:req.body.company,
                role:req.body.role
            }
        }
    ).then(()=>{
        console.log("email was sent");
        console.log(res);
    }).catch((err)=>{
        console.log(err.response['body']['errors']);
    })
    return res.status(201).json({"status":"email sent"});

}
module.exports.mail1=(req,res)=>{
    client.send(
        {
            to:{
                email:req.body.mail,
                name:req.body.name
            },
            from:{
              email:'swarooplenka535@gmail.com',
              name:'Recruit Acquistion Ltd'
            },
            templateId:"d-3a0952b43d484fd593e4e3d7a49d5569",
            dynamicTemplateData:{
                name:req.body.name,
                subject:"Recruit",
                message:req.body.message,
                company:req.body.cmp,
                role:req.body.role
            }
        }
    ).then(()=>{
        console.log("email was sent");
    }).catch((err)=>{
        console.log(err.response['body']['errors']);
    })
    return res.status(201).json({"status":"email sent"});

}

module.exports.mail2=(req,res)=>{
    client.send(
        {
            to:{
                email:req.body.mail,
                name:req.body.name
            },
            from:{
              email:'swarooplenka535@gmail.com',
              name:'Recruit Acquistion Ltd'
            },
            templateId:"d-f2b1890abb7c4c37ad5a06b1d5f00254",
            dynamicTemplateData:{
                name:req.body.empname,
                subject:req.body.subject,
                email:req.body.email,
                resume:`https://bit.ly/${req.body.resume}`
            }
        }
    ).then(()=>{
        console.log("email was sent");
    }).catch((err)=>{
        console.log(err.response['body']['errors']);
    })
    return res.status(201).json({"status":"email sent"});

}


module.exports.otp=(req,res)=>{
    client.send(
        {
            to:{
                email:req.body.mail,
                name:"User@Recruit"
            },
            from:{
              email:'swarooplenka535@gmail.com',
              name:'Recruit Acquistion Ltd'
            },
            templateId:"d-133adb7d5f174e368dbc8797fae3c24b",
            dynamicTemplateData:{
                otp:req.body.otp,
                mail:req.body.mail
            }
        }
    ).then(()=>{
        console.log("email was sent");
    }).catch((err)=>{
        console.log(err.response['body']['errors']);
    })
    return res.status(201).json({"status":"email sent"});

}
module.exports.insights =(req,res)=>{
    const options = {
        method: 'POST',
        url: 'https://big-five-personality-insights.p.rapidapi.com/api/big5',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'f7513e93c4msh0afadc25f67a6f1p187a3ajsn91b003d6346a',
          'X-RapidAPI-Host': 'big-five-personality-insights.p.rapidapi.com'
        },
        data: [{"id":"1","language":"en","text":`${req.body.data}`}]
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
          return res.status(201).json({"data":response.data})
      }).catch(function (error) {
          console.error(error.message);
          return res.status(400).json({"error":error.message})
      });
}
