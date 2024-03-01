const mongoose = require("mongoose");

const live_trip_details_schema = new mongoose.Schema(
  {
    common_trip_id:{
      type: String,
      require: true,
    },
    
    tour_created_userId: {
      type: mongoose.Types.ObjectId,
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
    tour_package_include: {
      type: Array,
      required: true,
    },
    details_about_tour: {
      type: String,
    },
    vehicle_type: {
      type: String,
      required: true,
    },
    vehicle_seat_type: {
      type: String,
      required: true,
    },
    vehicle_environment: {
      type: String,
      required: true,
    },
    vehicle_model: {
      type: String,
      required: true,
    },
    seat_cancellation: {
      type: String,
      required: true,
    },
    seat_can_be_cancelled_options: {
      type: String,
      required: true,
    },
    tandc_1: {
      type: String,
    },
    tandc_2: {
      type: String,
    },
    tandc_3: {
      type: String,
    },
    tandc_4: {
      type: String,
    },
    tandc_5: {
      type: String,
    },
    tandc_6: {
      type: String,
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
    social_links_twt: {
      type: String,
    },
    social_links_facebook: {
      type: String,
    },
    social_links_insta: {
      type: String,
    },
    trip_attendies: {
      type: [{user: { type: mongoose.Schema.Types.ObjectId,
      ref: 'user_data'}}],
      default: []
    },
  },
  { timestamps: true }
);

const live_trip_detail = mongoose.model(
  "live_trip_detail",
  live_trip_details_schema
);

module.exports = live_trip_detail;
