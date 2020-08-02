const router = require('express').Router();
const {User} = require('../../models/User')

const {auth} = require('../../containers/auth/auth')

// TODO: make container/auth/checkUser.js
router.get('/register', (req, res)=>{
  const user = new User(req.body);

  user.save((err,userInfo)=>{
    if(err) return res.json({success: false, err});
    return res.status(200).json({
      success: true
    })
  })
});




router.post('/login', (req,res)=>{
  User.findOne({email:req.body.email},(err,user)=>{
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    user.comparePassword(req.body.password, (err, isMatch)=>{
      if(!isMatch)
        return res.json({
          loginSuccess: false, message: "비밀번호가 틀렸습니다."
        });

      user.generateToken((err, user)=>{
        if(err) return res.status(400).send(err);

        res.cookie("x_pla", user.toke)
          .status(200)
          .json({ loginSuccess: true, userId: user._id});
      })
    });
  })
})

router.get('/api/users/auth', auth, (req,res)=>{
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})
module.exports = router;
