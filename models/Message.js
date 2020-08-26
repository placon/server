const mongoose = require('../configs/mongo.db')

const messageSchema = mongoose.Schema({
  room_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  message:{
    type: String,
    minLength: 1,
    maxLength: 4000,
    required: true,
  },
  register_date:{
    type: String
  },
  del_ny :{
    type: Boolean
  },
  delete_date:{
    type: String
  }
})

const Message = mongoose.model('Message', messageSchema);

module.exports = {Message};
