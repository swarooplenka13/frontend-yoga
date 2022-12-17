const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can\'t be empty',
        unique:true
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    saltSecret: String,
    otp:Number,
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
    sent:[
        {
        name:String,
        res:String,
        mail:String,
        role:String,
        type:{type: String},
        sal:String,
        }
    ]


});

// Custom validation for email
// /^([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([]){2,4}$/
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            this.hire = false;
            next();
        });
    });
});


// Methods
// userSchema.methods.postdata = async function(val)
// {
//     try {
//     this.post=this.post.concat(val);
//     this.save();
//     return this.post;
//     }
//     catch(err){
//       console.log(err);
//     }
// }

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}



mongoose.model('User', userSchema);
userSchema.set('autoIndex', false);