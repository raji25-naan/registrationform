const { Router } = require('express');
const express = require('express');
const { updateOne } = require('./infoschema');
const infoschema = require('./infoschema');
var unirest = require("unirest");

const router = express.Router();
var otp;

router.post('/post', async (req, res)=> {
    console.log(1);
    console.log(req);
    var mobileNumber= req.body.MobileNumber;
console.log(mobileNumber)

    const data =   new infoschema({
        firstname : req.body.firstname,
        lastname  : req.body.lastname,
        Email :req.body.Email,
        MobileNumber : req.body.MobileNumber,
        password :req.body.password,
        ConfirmPassword : req.body.ConfirmPassword,
        
    });
    const savedata = await data.save();
    var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

req.headers({
  "authorization": "bHvzGpr2f8p0T9xTVLIPOPVaHnclxduttoVigxcsIgtJRZzwj6HPfNKgcA6h"
});

otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

req.form({
  "message": "our otp number : " + otp,
  "language": "english",
  "route": "q",
  "numbers": Number(mobileNumber),
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  //console.log(res.body);
});
    return res.send(savedata);
});
 router.post("/otp",(req,res)=>{
   
    const saveotp = req.body.otp1 + req.body.otp2 + req.body.otp3 + req.body.otp4 + req.body.otp5 + req.body.otp6;
  console.log(saveotp)
    if (Number(saveotp) == Number(otp)){
    
    return res.status(200).send({msg:'success'});
    }else {
        return res.status(404).send({msg:'some text'});
    }
    

})


router.get('/find',async(req,res)  =>{
    const finddata = await infoschema.find();
    return res.send(finddata);
});


router.get('/findOne',async(req,res)  =>{
    const finddata = await infoschema.findOne({firstname:req.query.firstname});
    return res.send(finddata);
});

router.get('/findById',async(req,res)  =>{
    const finddata = await infoschema.findById({_id : req.query.id})
    return res.status(200).json({finddata});
});


router.put('/update',async(req,res)=>{
    console.log(1);
    console.log(req.body);
    const update = await infoschema.findByIdAndUpdate({_id:req.body.id},
        {
            $set : {
                firstname :req.body.firstname
            }           
        },
        {new : true}
        )
    return res.send(update);
            });


router.put('/updateOne',async(req,res)=>{
    console.log(req.body);
    const update = await infoschema.findOneAndUpdate({city : req.body.city},
        {
            $set : {
                firstname :req.body.firstname
            }           
        },
        {new : true}
        )
    return res.send(update);
    });


    {
                
    }
router.put('/updateMany',async(req,res)=>{
    const update = await infoschema.updateMany({city : req.body.city},
        {
            $set : {
                city : ""
            }           
        },
        {new : true}
    )
    return res.send(update);
            });

router.delete('/delete',async(req,res)=>{
    const Delete = await infoschema.findByIdAndRemove({_id:req.body.id},
    )          
    return res.send(Delete);
});

router.delete('/delete',async(req,res)=>{
    const Delete = await infoschema.findByIdAndDelete({_id:req.body.id},
    )          
    return res.send(Delete);
});



router.delete('/delete',async(req,res)=>{
    const Delete = await infoschema.findByOneAndDelete({_id:req.body.id},
    )          
    return res.send(Delete);
});

router.delete('/deleteMany',async(req,res)=>{
    const Delete = await infoschema.deleteMany();
    return res.send(Delete);
}); 


router.delete('/deleteOne',async(req,res)=>{
    const Delete = await infoschema.deleteOne({firstname : req.body.firstname});
    return res.send(Delete);
});



    


module.exports = router;