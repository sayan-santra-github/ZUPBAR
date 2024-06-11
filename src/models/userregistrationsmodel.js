const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userregistrationschema = new mongoose.Schema(
  {
    // profile_picture_url: {
    //   type: String,
    // },

    profile_picture: {
      data: Buffer,
      contentType: String
    },

    first_name: {
      type: String,
      required: true,
    },

    last_name: {
      type: String,
    },

    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },

    country: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      unique: true,
      required: true,
      min: 10,
      max: 10,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
      min: [6, "Must be at least 6, got {VALUE}"],
    },

    confirm_password: {
      type: String,
      required: true,
      min: [6, "Must be at least 6, got {VALUE}"],
    },

    email_isVerified: {
      type: Boolean,
      default: false,
    },

    trip_attended: {
      type: [
        {
          trip: {
            type: String,
            ref: "live_trip_detail",
          },
        },
      ],
      default: [],
    },

    token: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

//hashing password

userregistrationschema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
  this.confirm_password = await bcrypt.hash(this.password, 10);

  next();
});

const user_data = new mongoose.model("user_data", userregistrationschema);

module.exports = user_data;
