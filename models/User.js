const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ]
  }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce(
      (total, friends) => total + friends.replies.length + 1,
      0
    );
  });


const User = model('User', UserSchema);

module.exports = User;