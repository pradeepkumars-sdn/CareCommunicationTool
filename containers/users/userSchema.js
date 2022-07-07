const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // _id: String,
    name: {
      type: String,
      required: false,
      default:null
    },

    email: {
      type: String,
      default:null
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

    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },
  {
    versionKey: false,
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Date.now() },
  }
);

userSchema.plugin(mongoosePaginate);
userSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("users", userSchema);
