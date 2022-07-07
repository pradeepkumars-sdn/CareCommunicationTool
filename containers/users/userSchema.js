const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const bcrypt = require("bcrypt");
SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema(
  {
    // _id: String,
    name: {
      type: String,
      required: false,
      default: null,
    },

    email: {
      type: String,
      default: null,
    },
    password: {
      type: String,
    },
    contact: {
      type: String,
      default: null,
    },

    userType: {
      //SuperAdmin, Nursing Home, Assesstive Living
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    dob: {
      type: Date,
      default: null,
    },

    nursingCompany: {
      type: String,
      default: null,
    },

    description: {
      type: String,
      default: null,
    },

    geoLocation: {
      type: Boolean,
      default: false,
    },

    assistedLivings:{
      type:String,
      default:null
    },

    nurshingHome:{
      type:String,
      default:null
    },
  },
  {
    versionKey: false,
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    // timestamps: { currentTime: () => Date.now() },
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.plugin(mongoosePaginate);
userSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("users", userSchema);
