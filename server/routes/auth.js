require("dotenv").config()
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require('../keys')
const requireLogin = require("../middleware/requireLogin")

router.get('/protected', requireLogin, (req, res) => {
     res.send("hello user")
})

router.post('/signup', (req, res) => {
   const {name, username, email, password, profilResmi} = req.body
   // eger bu degerler girilmemise error gonder
   if(!name || !username || !email || !password){
    return res.status(422).json({error: "lütfen tüm alanları doldurun"})
   }
   User.findOne({email: email})
   .then((savedUser) => {
        if(savedUser){
            // eğer bu erroru alırsa kod devam etmesin diye return koyuldu
            return res.status(422).json({error: "email zaten kayıtlı"})
        }
        bcrypt.hash(password, 12)
        .then(hashedpassword => {
            const user = new User({
                name: name,
                username: username,
                email: email,
                password: hashedpassword,
                profilResmi: profilResmi
            })
            user.save()
            .then(user => {
                res.json({message: "kayıt oluşturuldu"})
            })
            .catch(error => {
                console.log(error);
            })
        })
   })
   .catch(err => {
    console.log(err)
   })
})

router.post('/login', (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(422).json({error: "lütfen email ya da parola girin"})
    }
    User.findOne({email: email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error: "geçersiz email ya da parola"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch){
                // res.json({message: "başarıyla giriş yapıldı"})
                const token = jwt.sign({ _id: savedUser._id}, JWT_SECRET)
                const {_id, name, email, username, password, profilResmi, followers, following, booksRead} = savedUser
                res.json({token: token, user: {_id, name, username, email, password, profilResmi, followers, following, booksRead}})
            } 
            else{
                return res.status(422).json({error: "geçersiz email ya da parola"})
            }
        })
        .catch(err => { console.log(err) })
    })
})

module.exports = router