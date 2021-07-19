const Image = require("../models/imageModel");

const addImage = async (req, res) =>{
  const relPath = req.file.path.replace(/\\/g, "/");
  try{
    const image = new Image({
      image: relPath,
      userId: req.user._id
    })

    let newImage = await image.save();
    console.log(newImage)
    res.send(newImage)
  } catch (e){
    res.status(400).send(e);
  }

}

const getMyImages = async (req, res) =>{
  console.log('heelo all images')
  let allImage = await Image.find({userId: req.user._id}).populate('userId')
  console.log(allImage)
  res.send(allImage)
}

const addComment = async (req, res) =>{
  console.log('hello from add comment');
  try{
    let image = await Image.findOne({_id: req.body.imageid});
    console.log(image)
    image.imageComments.push(await req.body.imageComment);
    console.log('something is wrong')
    await image.save()
  } catch (e){
    console.log(e)
  }
}

const getImage = async (req, res) =>{
  try{
    let image = await Image.findOne({_id: req.body.imageId});
    res.send(image)
  } catch (e){
    console.log(e)
  }
}

const getPublicImage = async (req, res) =>{
  try{
    // cia reikia kad butu user ID
    // let image = await Image.findOne({_id: req.body.imageId, userId: user id});
    // cia reikia kad nebegrazintu user ID
    // res.send(image)
  } catch (e){
    console.log(e)
  }
}

module.exports = {
  addImage,
  getMyImages,
  addComment,
  getImage
}