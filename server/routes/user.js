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

router.put('/addToBooksRead/:bookId', requireLogin, async (req, res) => {
  const { bookId } = req.params;
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const bookIndex = user.booksRead.findIndex(item => item.book.toString() === bookId);

    if (bookIndex === -1) {
      user.booksRead.push({ book: bookId, progress: 0 });
      await user.save();
      res.status(200).json({ message: 'Kitap başarıyla okundu olarak işaretlendi.' });
    } else {
      res.status(400).json({ error: 'Bu kitap zaten okunmuş.' });
    }

  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Sunucu hatası. Kitap okunurken bir hata oluştu.' });
  }
});

router.put('/updateProgress/:bookId', requireLogin, async (req, res) => {
  const { bookId } = req.params;
  const { progress } = req.body;
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const bookIndex = user.booksRead.findIndex(item => item.book.toString() === bookId);

    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Kullanıcı bu kitabı okumamış.' });
    }

    user.booksRead[bookIndex].progress += progress;
    await user.save();

    res.status(200).json({ message: 'İlerleme başarıyla güncellendi.' });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Sunucu hatası. İlerleme güncellenirken bir hata oluştu.' });
  }
});

module.exports = router