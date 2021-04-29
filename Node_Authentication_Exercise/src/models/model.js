const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

// userSchema.pre("insert", () => {
//   this.set({ createdDate: Date.now() });
// });

const userModel = mongoose.model("Users", userSchema);

module.exports = {
  userModel,
};
