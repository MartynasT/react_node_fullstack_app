const SavedImage = require("../models/savedImageModal");
const Image = require("../models/imageModel");
const addImage = async (req, res) =>{
  // const relPath = req.file.path.replace(/\\/g, "/");
  try{
    const savedImage = new SavedImage({
      savedImageId: req.body.imageId,
      userId: req.user._id
    })

    let newImage = await savedImage.save();
    console.log(newImage)
    res.send(newImage)
  } catch (e){
    res.status(400).send(e);
  }
}

const getAllSavedImages = async (req, res) =>{
  console.log('heelo all saved Images images')
  let allImage = await SavedImage.find()
  console.log(allImage)
  res.send(allImage)
}

const getPublicImage = async (req, res) =>{
  console.log('hello from singe image')
  try{
    let imageExists = await SavedImage.findOne({savedImageId: req.body.imageId});
    let image;
    if (imageExists){
      image = await Image.findOne({_id: req.body.imageId});
    }
    console.log('public one image')
    console.log(image)
    res.send(image)
  } catch (e){
    console.log(e)
  }
}


module.exports = {
  addImage,
  getAllSavedImages,
  getPublicImage
}