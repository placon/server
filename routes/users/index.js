const router = require('express').Router();
const userServices = require('../../services/users/user.service')
const { AuthContainer } = require('../../middlewares/auth/auth')
const { validateUser} = require('../../middlewares/validator/validator')
// TODO: make container/auth/checkUser.js
const authToken = AuthContainer.get("auth.User");

router.use(validateUser);

router.post('/register', userServices.registerUser );
router.get('/register/:email',userServices.checkDuplicateEmailName);
router.get('/confirmEmail', userServices.checkVerifyAuthEmail);

router.post('/login', userServices.loginUser);
router.get('/logout', authToken , userServices.logoutUser);

router.post('/upload/profileImage', authToken, userServices.uploadProfileImage);
router.post('/upload/profileText', authToken, userServices.uploadProfileText);

router.post('/update/user', authToken, userServices.updateUserInfo);

router.post('/confirm/password', authToken, userServices.confirmUserPassword);
router.post('/update/password', authToken, userServices.updateUserPassword);

router.post('/delete', authToken, userServices.deleteUser);

// @desc TODO: get user info of One, multi
router.get('/display/one/:email', authToken, userServices.displayOneUser);
router.get('/display/list/:name/:page_index/:page_size', authToken, userServices.displayUserList);

router.get('/auth', authToken, userServices.sendIsAuth);

module.exports = router;
