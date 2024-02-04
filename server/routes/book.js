const express = require("express")
const requireLogin = require("../middleware/requireLogin")
const router = express.Router()
const mongoose = require("mongoose")
const Book = mongoose.model("Book")

router.get('/allbooks', requireLogin, (req, res) => {
    Book.find()
    .populate("author", "_id name username following followers")
    .then((books) => {
        res.json({books})
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/yaz', requireLogin, (req, res) => {
    const {title, shortDesc, category, pic } = req.body
    if(!title || !shortDesc || !category ||!pic){
        res.status(422).json({error: "lütfen tüm alanları doldurun"})
    }
    console.log(req.body);
    req.user.password = undefined
    const book = new Book({
        title: title,
        shortDesc: shortDesc,
        kapakResmi: pic,
        category: category,
        author: req.user,
    })
    book.save()
    .then(result => {
        res.json({book: result})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/mybooks', requireLogin ,(req, res) => {
    Book.find({author: req.user._id})
    .populate("author", "_id name username") 
    .then(mybooks => {
        res.json({mybooks: mybooks})
    })
    .catch(err => {
        console.log(err)
    })
})


router.put('/updateContent/:id', requireLogin, async (req, res) => {
    const { id } = req.params;
    const { pages } = req.body;
    Book.findByIdAndUpdate(
      id,
      { pages: pages },
      { new: true }
    )
    .then((updatedBook) => {
    if (!updatedBook) {
        return res.status(404).json({ error: "Kitap bulunamadı" });
    }
    res.json({ book: updatedBook });
    })
    .catch((err) => {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası, kitap güncellenemedi" });
    });
});

// router.delete('/deleteBook/:id', requireLogin, (req, res) => {
//     Book.findOne({_id: req.params.bookId})
//     .populate("author", "_id")
//     .exec((err, book) => {
//         if(err || !book){
//             return res.status(422).json({error: err})
//         }
//         if(book.author._id.toString() === req.user._id.toString()){
//             book.remove()
//         }
//     })

// });

router.delete('/deletebook/:id', async (req, res) => {
    try {
      const bookId = req.params.id;
      const deletedBook = await Book.findByIdAndDelete(bookId);
  
      if (!deletedBook) {
        return res.status(404).json({ error: 'Kitap bulunamadı.' });
      }
  
      res.json({ message: 'Kitap başarıyla silindi.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Sunucu hatası.' });
    }
  });

router.put('/updatePages/:id', requireLogin, async (req, res) => {
    const { id } = req.params;
    const { pages } = req.body;
    Book.findByIdAndUpdate(
      id,
      { pages: pages },
      { new: true }
    )
    .then((updatedBook) => {
    if (!updatedBook) {
        return res.status(404).json({ error: "Kitap bulunamadı" });
    }
    res.json({ book: updatedBook });
    })
    .catch((err) => {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası, kitap güncellenemedi" });
    });
});

router.put('/updateBook/:id', requireLogin, async (req, res) => {
    const { id } = req.params;
    const { title, shortDesc, category } = req.body;
    
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, shortDesc, category },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ error: "Kitap bulunamadı" });
        }

        res.json({ book: updatedBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Sunucu hatası, kitap güncellenemedi" });
    }
});

router.delete('/deletePage/:bookId/:pageTitle', async (req, res) => {
    try {
      const { bookId, pageTitle } = req.params;
      const book = await Book.findById(bookId);
      const updatedPages = book.pages.filter(page => page.pageTitle !== pageTitle);
  
      const updatedBook = await Book.findByIdAndUpdate(
        bookId,
        { pages: updatedPages },
        { new: true }
      );
  
      res.json({ book: updatedBook });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.put('/like', requireLogin, (req, res) => {
    Book.findByIdAndUpdate(
        req.body.bookId,
        { $push: { likes: req.user._id } },
        { new: true }
    )
    // kitabı begendigimizde yazar kullanici adi kaybolmasin diye bu satiri ekledim
    .populate("author", "_id name username") 
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(422).json({ error: err });
    });
});

router.put('/unlike', requireLogin, async (req, res) => {
    try {
        const result = await Book.findByIdAndUpdate(
            req.body.bookId,
            { $pull: { likes: req.user._id } },
            { new: true }
        )
        .populate("author", "_id name username") 
        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err });
    }
});


router.put('/updateViews/:id', requireLogin, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        ).populate("author", "_id name username");

        if (!updatedBook) {
            return res.status(404).json({ error: "Kitap bulunamadı" });
        }

        res.json({ book: updatedBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Sunucu hatası, kitap güncellenemedi" });
    }
});

router.post('/search-books', (req,res) => {
    let bookPattern = new RegExp('^' + req.body.query, 'i');
    let limitCount = 5;
    Book.find({title: {$regex:bookPattern}}).limit(limitCount)
    .then(book => {
        res.json({book: book})
    }).catch(err => {
        console.log(err);
    })
})


module.exports = router