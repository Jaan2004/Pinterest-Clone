var express = require('express');
var router = express.Router();
const usermodel=require("./Users")
const postmodel=require("./posts")
const passport=require("passport")
const localstrategy=require("passport-local")
const upload = require("./multer");
//  const { post } = require('../app');
passport.use(new localstrategy(usermodel.authenticate()))


// router.get('/alluserpost',  async function(req, res) {   //Create
//   let user= await usermodel
//   .findOne({_id:"669191667010f8551588792b"})
//   .populate('posts')
//   res.send(user)
  
//  });
 router.get('/',  async function(req, res) {   //Create

  res.render('index')
  
 });


// router.get('/createuser',  async function(req, res) {   //Create
//  let createuser= await usermodel.create({
//     username:"jan",
//     password: "jan",
//     posts: [],
//     email: "jan1@gmail.com",
//     fullName: "janyam1an"
//   })
// res.send(createuser)
// });

  router.get('/profile', isloggedin, async function(req, res,next) {   //Create
   const user= await usermodel.findOne({
    username:req.session.passport.user
   })
   .populate("posts")
   
    res.render('profile',{user})
    
   });
   router.get('/login', function(req, res,next) {   //Create
    res.render('login',{error: req.flash('error')})
    
   });
   router.get('/feed', isloggedin, async function(req, res, next) {
    try {
        const user = await usermodel.findOne({ username: req.session.passport.user }).populate('posts');
        if (!user) {
            return res.status(404).send('User  not found');
        }
        res.render('feed', { user }); // Pass the user object to the template
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
   router.get('/contact', function(req, res,next) {   //Create
    res.render('contact')
    
   });

   router.post('/upload',isloggedin,upload.single("file"), async function(req, res,next) {   //Create
  const user= await usermodel.findOne({username: req.session.passport.user})
  const post=await postmodel.create({
    content: req.body.filecaption, // Assuming you want to save the caption in 'content'
    user: user._id,
    image: req.file.filename, // Make sure to add this line
  })
    user.posts.push(post._id);
    await user.save();
    res.send("done")
   
   });

  router.post('/register',  async function(req, res) {   //Create
    const { username, email, fullname } = req.body;
    const userdata = new usermodel({ username, email, fullname });
    
 usermodel.register(userdata,req.body.password)
 .then(function(){
  passport.authenticate("local")(req,res,function(){
    res.redirect("/feed");

  })
  })
})

 router.post('/login',  passport.authenticate("local",{
    successRedirect: "/feed",
    failureRedirect: "/login",
    failureFlash: true
  }),function(req,res){
   });

  router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

function isloggedin(req,res,next){
  if(req.isAuthenticated())
    return next();
  res.redirect("/login")
}
module.exports = router;
