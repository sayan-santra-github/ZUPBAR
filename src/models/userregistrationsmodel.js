const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userregistrationschema = new mongoose.Schema(
  {
    profile_picture_url: {
      type: String,
    },

    first_name: {
      type: String,
      required: true,
    },

    last_name: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },

    dob: {
      type: Date,
      required: true,
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

    trip_attended: [
      {
        trip: {
          type: String,
        },
      },
    ],

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

//generating token

userregistrationschema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      "hnbvt521364%**)(%#5lo;<,/?>:'jhASDER123"
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    res.send("the error part is:" + error);
    console.log("the error part is:" + error);
  }
};

//hashing password

userregistrationschema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
  this.confirm_password = await bcrypt.hash(this.password, 10);

  next();
});

const user_data = new mongoose.model("user_data", userregistrationschema);

module.exports = user_data;
