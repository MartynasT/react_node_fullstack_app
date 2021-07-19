const router = require('express').Router();
const multer = require('multer')

const authenticateMiddleware = require('../middleware/authenticate');
const userControler = require('../controllers/userController');
const imageContoller = require('../controllers/imageController')
const savedImageContoller = require('../controllers/savedImagesController')

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, 'uploads')
  },
  filename: (req, file, cb)=> {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
  storage
})

router.route('/newImage')
// .get(imageContoller.getMyImages)
.post(authenticateMiddleware.authenticate,upload.single('image'), imageContoller.addImage)

router.route('/getImageById')
  .post(authenticateMiddleware.authenticate, imageContoller.getImage)

router.route('/myImages')
.get(authenticateMiddleware.authenticate, imageContoller.getMyImages)

router.route('/publicPost')
.post(authenticateMiddleware.authenticate, savedImageContoller.addImage)

router.route('/addComment')
  .post(authenticateMiddleware.authenticate, imageContoller.addComment)

router.route('/getAllPublicImages')
  .get(savedImageContoller.getAllSavedImages)

router.route('/getPublicImageById')
  .post(savedImageContoller.getPublicImage)
// Actions
router.route('/signUp')
.post(userControler.signUp)

router.route('/signIn')
.post(userControler.signIn)

router.route('/logOut')
.post(authenticateMiddleware.authenticate, userControler.logOut)

router.route('/current')
.get(authenticateMiddleware.authenticate, userControler.currentUser)





module.exports = router;