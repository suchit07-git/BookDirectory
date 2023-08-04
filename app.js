require("dotenv").config();
const express = require("express");

const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URL, {
    dbName: 'bookDB',
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, err => err ? console.log(err) : console.log('Connected to database'));

//Schema for the Author
const authorSchema = {
    first_name: String,
    last_name: String,
    age: Number
}

//Schema for the Books
const bookSchema = {
    title: String,
    author: authorSchema,
    published: Date,
    quantity: Number,
    bestseller:Boolean()
}


const Author = mongoose.model('author', authorSchema);
const Book = mongoose.model('book', bookSchema);

app.get("/", (req, res) => {
    res.render("index");
})

//Task - 1 Route

app.get('/books/:id',(req,res)=>{

    console.log("Hey!",req.params.id);

    Book.findById(req.params.id,(err, books) => {
        if (err) return console.log(err);
        res.render('disp', {books:books} );
    })
});

//Task -3 Route

app.get('/delete/:id',(req,res) =>{

    console.log("The Id of the book that got deleted !",req.params.id);

    Book.findByIdAndDelete(req.params.id,function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log("Deleted : ", docs);
            res.redirect("/books");
        }

})
    

});

//Task - 2 Routes
app.get('/set/:id',(req,res)=>{

    Book.findById(req.params.id,(err, books) => {
        if (err) return console.log(err);
        res.render('upd', {books:books} );
    })

});


app.post('/upd/:id',(req,res) =>{
    var authorObj = {
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        age:req.body.age
    }

    if(req.body.bs=="on"){
        flag = true;
    }
    else{
        flag = false;
    }

    var bookObj = {
        title: req.body.title,
        author: authorObj,
        published: req.body.date,
        quantity: req.body.qty,
        bestseller:flag
    }

    console.log("Going to Update this : ",req.params.id);
    console.log(bookObj);

    Author.findOne(authorObj, async (err, author) => {

        if(err) {
            console.log(err);
        } 
        else if(author) {
            console.log('Author already exists');
        }
        else{
                const newAuthor = new Author({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    age: req.body.age
                });
                newAuthor.save((err) => {
                    if(err) {
                        console.log(err);
                    } 
                    else {
                        console.log('Author added');
                        bookObj.author = newAuthor;
                    }
                })
            }
        })

        Book.findByIdAndUpdate({"_id" : req.params.id},{$set: bookObj},(err)=>{
                    if(!err){
                      console.log("Successfully updated article.");
                      res.redirect("/books");
        
                    }else{
                        console.log('ERRROR',err);
                      res.send("failed");
                    }
                })


    
})

//Task - 4 Route
app.get('/bs',(req,res)=>{

    Book.find({bestseller:true}, (err, bsbooks) => {
        if (err) return console.log(err);
        res.render('bs', {bsbooks: bsbooks});
    })

})


app.route('/books')
    .get((req, res) => {
        Book.find({}, (err, books) => {
            if (err) return console.log(err);
            res.render('books', {books: books});
        })
    })
    .post((req, res) => {
        Book.find({"title" : {$regex : req.body.search}}, (err, books) => {
            if (err) return console.log(err);
            res.render('books', {books: books});
        });
    });

app.route('/add')
    .get((req, res) => {
        res.render('add');
    })
    .post((req, res) => {

        if(req.body.bs=="on"){
            flag = true;
        }
        else{
            flag = false;
        }

        Author.findOne({first_name: req.body.first_name, last_name: req.body.last_name, age: req.body.age}, async (err, author) => {
            if(err) {
                console.log(err);
            } 
            else if(author) {
                console.log('Author already exists');

                const book = new Book({
                    title: req.body.title,
                    published: req.body.date,
                    quantity: req.body.qty,
                    author: author,
                    bestseller:flag
                });
                book.save((err) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('Book added');
                        res.redirect('/books');
                    }
                });
            } 
            else {
                const newAuthor = new Author({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    age: req.body.age
                });
                newAuthor.save((err) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('Author added');
                        const book = new Book({
                            title: req.body.title,
                            published: req.body.date,
                            quantity: req.body.qty,
                            author: newAuthor,
                            bestseller:flag
                        });
                        book.save((err) => {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log('Book added');
                                res.redirect('/books');
                            }
                        });
                    }
                });
            }
        })
    })

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port -`,process.env.PORT)
})
