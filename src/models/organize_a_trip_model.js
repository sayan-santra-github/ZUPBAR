const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const organize_a_trip_schema = new mongoose.Schema(
  {
    tour_created_userId: {
      type: String,
    },

    company_name: {
      type: String,
      require: true,
    },

    company_email: {
      type: String,
      unique: true,
      require: true,
    },

    company_website: {
      type: String,
    },

    tour_starting_place: {
      type: String,
      required: true,
    },

    tour_started_date_day: {
      type: String,
      required: true,
    },

    tour_started_date_month: {
      type: String,
      required: true,
    },

    tour_started_date_year: {
      type: String,
      required: true,
    },
    tour_started_time: {
      type: String,
      required: true,
    },
    touring_destination: {
      type: String,
      required: true,
    },
    tour_ended_date_day: {
      type: String,
      required: true,
    },

    tour_ended_date_month: {
      type: String,
      required: true,
    },

    tour_ended_date_year: {
      type: String,
      required: true,
    },
    tour_ended_time: {
      type: String,
      required: true,
    },
    tourRange_day: {
      type: Number,
      required: true,
    },
    tourRange_night: {
      type: Number,
      required: true,
    },
    tour_package_rate: {
      type: Number,
      required: true,
    },
    details_about_tour: {
      type: String,
    },
    tandc_1: {
      type: String,
      required: true,
    },
    tandc_2: {
      type: String,
      required: true,
    },
    tandc_3: {
      type: String,
      required: true,
    },
    tandc_4: {
      type: String,
      required: true,
    },
    tandc_5: {
      type: String,
      required: true,
    },
    tandc_6: {
      type: String,
      required: true,
    },
    tandc_7: {
      type: String,
    },
    tandc_8: {
      type: String,
    },
    tandc_9: {
      type: String,
    },
    tandc_other: {
      type: String,
    },
    accountHolder_name: {
      type: String,
      required: true,
    },
    account_number: {
      type: Number,
      required: true,
    },
    ifsc_code: {
      type: String,
      required: true,
    },
    trip_attendies: [
      {
        user_id: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const trip_detail = new mongoose.model("trip_detail", organize_a_trip_schema);

module.exports = trip_detail;
