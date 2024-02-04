const express = require("express")
const requireLogin = require("../middleware/requireLogin")
const router = express.Router()
const mongoose = require("mongoose")
const Book = mongoose.model("Book")
const User = mongoose.model("User")

router.get('/profil/:username', requireLogin, (req, res) => {
    User.findOne({ username: req.params.username })
    .populate("followers", "_id name username profilResmi followers following")
    .populate("following", "_id name username profilResmi followers following")
        .select("-password")
        .then(user => {
            Book.find({ author: user._id })
                .populate("author", "_id name username email")
                .then(books => {
                    res.json({ user, books });
                })
                .catch(err => {
                    return res.status(422).json({ error: err });
                });
        })
        .catch(err => {
            console.error("Error finding user:", err);
            return res.status(404).json({ error: "Kullanıcı bulunamadı" });
        });
});

router.put('/updatepic', requireLogin, (req, res) => {
    User.findByIdAndUpdate(
      req.user._id,
      { $set: { profilResmi: req.body.profilResmi } },
      { new: true }
    )
    .exec() // Use exec() to execute the query
    .then(result => {
    res.json(result);
    })
    .catch(err => {
    res.status(422).json({ error: "pic cannot post" });
    });
});

router.put('/updatefields', requireLogin, (req, res) => {
    User.findByIdAndUpdate(
      req.user._id,
      { $set: { 
        username: req.body.username, 
        email: req.body.email,
      }},
      { new: true }
    )
    .exec() // Use exec() to execute the query
    .then(result => {
    res.json(result);
    })
    .catch(err => {
    res.status(422).json({ error: "updates cannot post" });
    });
});

router.put('/follow', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    }, {
        new: true
    })
    .then(updatedUser => {
        return User.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, { new: true }).select("-password");
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        return res.status(422).json({ error: err });
    });
});


router.put('/unfollow', requireLogin, (req, res) => {
    User.findByIdAndUpdate(
      req.body.unfollowId,
      { $pull: { followers: req.user._id } },
      { new: true }
    )
    .then(updatedFollower => {
      return User.findByIdAndUpdate(
        req.user._id,
        { $pull: { following: req.body.unfollowId } },
        { new: true }
      ).select("-password");
    })
    .then(updatedFollowing => {
      res.json(updatedFollowing);
    })
    .catch(err => {
      res.status(422).json({ error: err.message });
    });
  });



module.exports = router