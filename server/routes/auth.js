require("dotenv").config(); // Ortam değişkenlerini yükle
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middleware/requireLogin");

// Korunan rota örneği
router.get('/protected', requireLogin, (req, res) => {
    res.send("hello user");
});

// Kullanıcı kaydı
router.post('/signup', (req, res) => {
    const { name, username, email, password, profilResmi } = req.body;

    if (!name || !username || !email || !password) {
        return res.status(422).json({ error: "Lütfen tüm alanları doldurun" });
    }

    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "Email zaten kayıtlı" });
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        name: name,
                        username: username,
                        email: email,
                        password: hashedpassword,
                        profilResmi: profilResmi
                    });
                    user.save()
                        .then(() => {
                            res.json({ message: "Kayıt oluşturuldu" });
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(500).json({ error: "Kayıt oluşturulurken bir hata oluştu" });
                        });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Bir hata oluştu" });
        });
});

// Kullanıcı girişi
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Lütfen email ve parolayı girin" });
    }

    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Geçersiz email ya da parola" });
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
                        const { _id, name, email, username, profilResmi, followers, following, booksRead } = savedUser;
                        res.json({ token: token, user: { _id, name, username, email, profilResmi, followers, following, booksRead } });
                    } else {
                        return res.status(422).json({ error: "Geçersiz email ya da parola" });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: "Bir hata oluştu" });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Bir hata oluştu" });
        });
});

module.exports = router;