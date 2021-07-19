const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    image:{
      type: String,
      required: true
    },
    imageComments:{
      type: Array,
      default: []
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
  },
  {
    toJSON:{
      transform(doc, ret){
        if (ret.image)
          ret.image = "http://localhost:3001/" + ret.image;
      }
    }
  }
);

const Image = mongoose.model("Image", imageSchema);

module.exports = Image