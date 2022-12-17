const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    post:[
      {
        CompanyName:String, 
        email:String,  
        role: String,
        type: {type: String},
        desc: String,
        other:String,
        address:String
      }
    ],
    applied:[
        {
        CompanyName:String, 
        email:String,  
        role: String,
        type: {type: String},
        desc: String,
        other:String,
        address:String,
        Name:String,
        Resume:String,
        Email:String,
        match:String,
        alone: Number,
        attached: Number,
        attracted: Number,
        compound: Number,
        entitled: Number,
        free: Number,
        happy: Number,
        hated: Number,
        loved: Number,
        negative: Number,
        neutral: Number,
        positive: Number,
        achievement: Number,
        active: Number, 
        agreeableness: Number,
        conscientiousness: Number,
        cooperative: Number,
        disciplined: Number,
        emotionally_aware: Number,
        extraversion: Number,
        imaginative: Number,
        intellectual: Number,
        neuroticism: Number,
        openness: Number,
        trusting: Number 
        }
    ]


});
mongoose.model('User', userSchema);
userSchema.set('autoIndex', false);