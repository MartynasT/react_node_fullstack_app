const mongoose = require('mongoose');

const savedImageSchema = new mongoose.Schema(
  {
    savedImageId:{
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
  },
  {
    // toJSON:{
    //   transform(doc, ret){
    //     if (ret.image)
    //       ret.image = "http://localhost:3001/" + ret.image;
    //   }
    // }
  }
);

const SavedImage = mongoose.model("SavedImage", savedImageSchema);

module.exports = SavedImage