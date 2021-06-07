const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  url: { type: String, required: true },
  comments: [ { type: String }],
  user: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    }
})
module.exports = mongoose.model('Blog', blogSchema)    