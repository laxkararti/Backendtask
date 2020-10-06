const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    //id:{ type: mongoose.Schema.Types.ObjectId},
     email: {
         type: String,
         required: 'Email can\'t be empty',
         unique: true
     },
 
     name: {
         type: String,
         required: 'Full name can\'t be empty',
         minlength : [3,'usernam must be atleast 5 character long'],
         maxlength :[20]
     },
     phone: {
         type: Number,
         required: 'number can\'t be empty',
        length: [10]         
     },
     password: {
         type: String,
         required: 'Password can\'t be empty',
         minlength : [8,'Password must be atleast 8 character long'],
     },
 
     saltSecret: String,

     admin:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "Registration"
     }
});


userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


module.exports=mongoose.model('user', userSchema);
