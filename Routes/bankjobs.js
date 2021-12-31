const express = require('express')
let app = express.Router()
var request = require("request");
const axios = require('axios');
const mongoose = require('mongoose')
const Bank = require('../model/bank')
const SubMenu = require('../model/subMenu')
const User = require('../model/user')


app.get('/:c/:i/:id', (req, res) => {
  var query = require('url').parse(req.url,true).query;
  var id = req.params.id;
  var c = req.params.c;
  var i =req.params.i;
if(id==''||c==''||i==''){
console.log('not Autorised')
}else{
console.log(id);
SubMenu.findOne({menuID:c},(err,menu)=>{
//  console.log(menu);
if(err){
res.send('You are not Authorised')
}else{
if(menu == null){
res.send('You are not Authorised');
}else{
  res.render("index.ejs",{img: menu.image,u:menu.dataurl,p:menu.param,i:i,c:c,id:id});
}
}
})
console.log(id + c + i);
 }
})



app.post('/kotak',async(req,res)=>{
console.log(req.body);
User.findOne({phone:req.body.user},async(err,user)=>{
SubMenu.findOne({menuID:req.body.c},async(err,menu)=>{
 // res.render("index.ejs",{img: menu.image,u:menu.dataurl,p:menu.param});
 if(req.body.i == '1'){
var url = req.body.u
var body ={"ocPartnerFormId":menu.formid,"ocFieldValues":[{"ocFieldId":menu.field1,"value":req.body.name},{"ocFieldId":menu.field2,"value":req.body.phone},{"ocFieldId":menu.field3,"value":req.body.email}]};
let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'accept':'application/json'
    }
  };

try {

    //const response = await axios.get('http://wee.onecode.in/c/f8764R');

    const response = await axios.post(url, body, axiosConfig);
    //return response.data;
    //console.log(response.data.data);
    const bank = new Bank({
        name:req.body.name,
        user:req.body.user,
        phone:req.body.phone,
        email:req.body.email,
        isActive:1,
        mainMenu:menu.mainmenu,
        subMenu:req.body.c,
        url:response.data.data.url,
        status:1,
        point:menu.points,
        parent:user.parent
    })
    await bank.save();
//    console.log(response.data.data.url); 
    res.json({url:response.data.data.url});
   } catch (err) {
    //throw getError(err);
    console.log(err);
   }
  }
  if(req.body.i == '2'){
    var url = req.body.u

try {

    const response = await axios.get(url);

    //const response = await axios.post(url, body, axiosConfig);
    //return response.data;
    //console.log(response.data.data);
    const bank = new Bank({
        name:req.body.name,
        user:req.body.user,
        phone:req.body.phone,
        email:req.body.email,
        isActive:1,
        mainMenu:menu.mainmenu,
        subMenu:req.body.c,
        url:url,
        status:1,
        point:menu.points,
        parent:user.parent
    })
    bank.save();
//console.log(url);
    res.json({url:req.body.u})
   } catch (err) {
    res.json({url:req.body.u})
    //throw getError(err);
    console.log(err);
   }

  }
})
})

})
function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }
// app.post('/hdfc',async(req,res)=>{
//     console.log(req.body);
//     var random ='Jeh'+Date.now()+between(100000, 999999);
//     var url = "https://inr.deals/track?id=jeh536864247&src=merchant-backend&campaign=cpl&url=https://v1.hdfcbank.com/&subid="+random;
//    // var body ={"ocPartnerFormId":33,"ocFieldValues":[{"ocFieldId":"145","value":req.body.name},{"ocFieldId":"146","value":req.body.phone},{"ocFieldId":"147","value":req.body.email}]};
//     let axiosConfig = {
//         headers: {
//             'Content-Type': 'application/json;charset=UTF-8',
//             'accept':'application/json'
//         }
//       };
    
//     try {
    
//       //  const response = await axios.get(url);
//    // console.log(url)
//    // console.log(response)
//        // const response = await axios.post(url, body, axiosConfig);
//        // return response;
//         //console.log(response.data.data.url);
//         const bank = new Bank({
//             name:req.body.name,
//             user:req.body.user,
//             phone:req.body.phone,
//             email:req.body.email,
//             isActive:1,
//             mainMenu:'bankingjobs',
//             subMenu:'hdfc',
//             url:url,
//             status:1,
//             point:2
//         })
//         bank.save();
//         res.send(url)
//        } catch (err) {
//         //throw getError(err);
//         console.log(err);
//        }
    
//     })
//     app.post('/axis',async(req,res)=>{
//     console.log(req.body);
//     var random ='Jeh'+Date.now()+between(100000, 999999);
//     var url = "https://api.onecode.in/userForm/addLead?hash=eyJvbmVjb2RlIjoiT25lQDgwODAxMDA1MTIiLCJwYXJ0bmVySWQiOiI5MiIsInBob25lTm8iOiI5MTg4NjIwMjQxMjMifQ==&hasOtpCheck=false";
//     var body ={
//   "ocPartnerFormId": 36,
//   "ocFieldValues": [
//     {
//       "ocFieldId": "163",
//       "value": req.body.name
//     },
//     {
//       "ocFieldId": "164",
//       "value": req.body.phone
//     },
//     {
//       "ocFieldId": "165",
//       "value": req.body.email
//     }
//   ]
// }
//     let axiosConfig = {
//         headers: {
//             'Content-Type': 'application/json;charset=UTF-8',
//             'accept':'application/json'
//         }
//       };
    
//     try {
    
      
//      const response = await axios.post(url, body, axiosConfig);
//        // return response;
//      console.log(response.data.data.url);
//         const bank = new Bank({
//             name:req.body.name,
//             user:req.body.user,
//             phone:req.body.phone,
//             email:req.body.email,
//             isActive:1,
//             mainMenu:'bankingjobs',
//             subMenu:'axis',
//             url:url,
//             status:1,
//             point:3
//         })
//         bank.save();
//         res.send(response.data.data.url)
//        } catch (err) {
//         //throw getError(err);
//         console.log(err);
//        }
    
//     })

//     app.post('/equitas',async(req,res)=>{
//       console.log(req.body);
//       var random ='Jeh'+Date.now()+between(100000, 999999);
//       var url = "https://api.onecode.in/userForm/addLead?hash=eyJvbmVjb2RlIjoiT25lQDgwODAxMDA1MTIiLCJwYXJ0bmVySWQiOiI3MCIsInBob25lTm8iOiI5MTg4NjIwMjQxMjMifQ==&hasOtpCheck=false";
//       var body ={"ocPartnerFormId":30,"ocFieldValues":[{"ocFieldId":"135","value":req.body.name},{"ocFieldId":"136","value":req.body.phone},{"ocFieldId":"137","value":req.body.email}]}
//       let axiosConfig = {
//           headers: {
//               'Content-Type': 'application/json;charset=UTF-8',
//               'accept':'application/json'
//           }
//         };
      
//       try {
      
        
//        const response = await axios.post(url, body, axiosConfig);
//          // return response;
//        console.log(response.data.data.url);
//           const bank = new Bank({
//               name:req.body.name,
//               user:req.body.user,
//               phone:req.body.phone,
//               email:req.body.email,
//               isActive:1,
//               mainMenu:'bankingjobs',
//               subMenu:'equitas',
//               url:url,
//               status:1,
//               point:1
//           })
//           bank.save();
//           res.send(response.data.data.url)
//          } catch (err) {
//           //throw getError(err);
//           console.log(err);
//          }
      
//       })
//       app.post('/indusind',async(req,res)=>{
//         console.log(req.body);
//         var random ='Jeh'+Date.now()+between(100000, 999999);
//         var url = "https://inr.deals/track?id=jeh536864247&src=merchant-backend&campaign=cpl&url=https://indusforex.indusind.com/&subid="+random;
//        // var body ={"ocPartnerFormId":33,"ocFieldValues":[{"ocFieldId":"145","value":req.body.name},{"ocFieldId":"146","value":req.body.phone},{"ocFieldId":"147","value":req.body.email}]};
//         let axiosConfig = {
//             headers: {
//                 'Content-Type': 'application/json;charset=UTF-8',
//                 'accept':'application/json'
//             }
//           };
        
//         try {
        
//           //  const response = await axios.get(url);
//        // console.log(url)
//        // console.log(response)
//            // const response = await axios.post(url, body, axiosConfig);
//            // return response;
//             //console.log(response.data.data.url);
//             const bank = new Bank({
//                 name:req.body.name,
//                 user:req.body.user,
//                 phone:req.body.phone,
//                 email:req.body.email,
//                 isActive:1,
//                 mainMenu:'bankingjobs',
//                 subMenu:'indusind',
//                 url:url,
//                 status:1,
//                 point:1
//             })
//             bank.save();
//             res.send(url)
//            } catch (err) {
//             //throw getError(err);
//             console.log(err);
//            }
        
//         })

      //https://inr.deals/track?id=jeh536864247&src=merchant-backend&campaign=cpl&url=https://indusforex.indusind.com/
module.exports = app

