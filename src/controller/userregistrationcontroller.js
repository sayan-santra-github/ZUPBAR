const user_data = require("./../models/userregistrationsmodel");
const live_trip_detail = require("./../models/live_trip_detail_model");
const { order_details_model } = require("../models/order_details_model.js");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const auth = require("../middleware/auth");
const { error, log } = require("console");
const { request } = require("http");
const Razorpay = require("razorpay");
const randomstring = require("randomstring");

// user profile picture upload

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, path.join(__dirname, "../../public/user_profile_photos"));
  },

  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}---${file.originalname}`);
  },
});

const upload = multer({ storage });

// user profile picture upload

const storageforprofilepicupdate = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, path.join(__dirname, "../../public/user_profile_photos"));
  },

  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}---${file.originalname}`);
  },
});

const uploadforprofilepicupdate = multer({
  storage: storageforprofilepicupdate,
});

// sending mail for verification

const sendverificationmail = async (first_name, last_name, email, user_id) => {
  try {
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "sayanssent@gmail.com",
        pass: "othe smvx jnvq nwce",
      },
    });

    const mailOptions = await {
      from: "sayanssent@gmail.com",
      to: email,
      subject: "no-reply",
      html:
        "<p>Hello, " +
        first_name +
        " " +
        last_name +
        ', please click the link to <a target="_blank" href="http://localhost:8000/email-verify?id=' +
        user_id +
        '"> verify</a> your mail.</p>',
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent", +info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// sending mail for reset password

const sendresetmail = async (first_name, last_name, email, token) => {
  try {
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "sayanssent@gmail.com",
        pass: "othe smvx jnvq nwce",
      },
    });

    const mailOptions = await {
      from: "sayanssent@gmail.com",
      to: email,
      subject: "For Reset Password",
      html:
        "<p>Hello, " +
        first_name +
        " " +
        last_name +
        ', please click the link to <a target="_blank" href="http://localhost:8000/reset-password?token=' +
        token +
        '"> reset</a> your password.</p>',
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent", +info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// sending mail for trip verification

const sendtripVerificationmail = async (
  token,
  company_name,
  company_email,
  company_website,
  tour_starting_place,
  tour_started_date_day,
  tour_started_date_month,
  tour_started_date_year,
  tour_started_time,
  touring_destination,
  tour_ended_date_day,
  tour_ended_date_month,
  tour_ended_date_year,
  tour_ended_time,
  tourRange_day,
  tourRange_night,
  tour_package_rate,
  tour_package_include,
  details_about_tour,
  vehicle_type,
  vehicle_seat_type,
  vehicle_environment,
  vehicle_model,
  seat_cancellation,
  seat_can_be_cancelled_options,
  tandc_1,
  tandc_2,
  tandc_3,
  tandc_4,
  tandc_5,
  tandc_6,
  tandc_7,
  tandc_8,
  tandc_9,
  tandc_other,
  accountHolder_name,
  account_number,
  ifsc_code,
  social_links_twt,
  social_links_facebook,
  social_links_insta
) => {
  try {
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "sayanssent@gmail.com",
        pass: "othe smvx jnvq nwce",
      },
    });

    const mailOptions = await {
      from: "sayanssent@gmail.com",
      to: company_email,
      subject: "For Trip Verification",
      html:
        `<p>Hello, this is sayan from Diffroute. We found that ` +
        company_name +
        ` want to organize a Trip. This is a <strong>Verification Mail</strong> from Diffroute, We request you to kindly click the link to <a target="_blank" href="http://localhost:8000/trip-verification?token=` +
        token +
        `"> verify</a> the e-mail associated with your company.</p><br/><br/>
        <table style="border: 1px solid red">
      <tr>
        <td style="border: 1px solid black">Company Name</td>
        <td style="border: 1px solid black">` +
        company_name +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Company Email</td>
        <td style="border: 1px solid black">` +
        company_email +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Company Website</td>
        <td style="border: 1px solid black">` +
        company_website +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Tour Starting Place</td>
        <td style="border: 1px solid black">` +
        tour_starting_place +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Tour Started Date</td>
        <td style="border: 1px solid black">` +
        tour_started_date_day +
        `/` +
        tour_started_date_month +
        `/` +
        tour_started_date_year +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Tour Started Time</td>
        <td style="border: 1px solid black">` +
        tour_started_time +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Touring Destination</td>
        <td style="border: 1px solid black">` +
        touring_destination +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Tour Ended Date</td>
        <td style="border: 1px solid black">` +
        tour_ended_date_day +
        `/` +
        tour_ended_date_month +
        `/` +
        tour_ended_date_year +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Tour Ended Time</td>
        <td style="border: 1px solid black">` +
        tour_ended_time +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Tour Range(Day)</td>
        <td style="border: 1px solid black">` +
        tourRange_day +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Tour Range(Night)</td>
        <td style="border: 1px solid black">` +
        tourRange_night +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Tour Package Rate</td>
        <td style="border: 1px solid black">` +
        tour_package_rate +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Tour Package Include</td>
        <td style="border: 1px solid black">` +
        tour_package_include +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Details About Tour</td>
        <td style="border: 1px solid black">` +
        details_about_tour +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Vehicle Type</td>
        <td style="border: 1px solid black">` +
        vehicle_type +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Vehicle Seat Type</td>
        <td style="border: 1px solid black">` +
        vehicle_seat_type +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Vehicle Environment</td>
        <td style="border: 1px solid black">` +
        vehicle_environment +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Vehicle Model</td>
        <td style="border: 1px solid black">` +
        vehicle_model +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Seat Cancellation</td>
        <td style="border: 1px solid black">` +
        seat_cancellation +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Seat can be Cancelled</td>
        <td style="border: 1px solid black">` +
        seat_can_be_cancelled_options +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Terms and Conditions</td>
        <td style="border: 1px solid black">
        <ul>
        <li>` +
        tandc_1 +
        `</li>
        <li>` +
        tandc_2 +
        `</li>
        <li>` +
        tandc_3 +
        `</li>
        <li>` +
        tandc_4 +
        `</li>
        <li>` +
        tandc_5 +
        `</li>
        <li>` +
        tandc_6 +
        `</li>
        <li>` +
        tandc_7 +
        `</li>
        <li>` +
        tandc_8 +
        `</li>
        <li>` +
        tandc_9 +
        `</li>
        <li>` +
        tandc_other +
        `</li>
        </ul>
        </td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Account Holder Name</td>
        <td style="border: 1px solid black">` +
        accountHolder_name +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Account Number</td>
        <td style="border: 1px solid black">` +
        account_number +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">IFSC Code</td>
        <td style="border: 1px solid black">` +
        ifsc_code +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Twitter(X)</td>
        <td style="border: 1px solid black">` +
        social_links_twt +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Facebook</td>
        <td style="border: 1px solid black">` +
        social_links_facebook +
        `</td>
      </tr>
      <tr>
        <td style="border: 1px solid black">Instagram</td>
        <td style="border: 1px solid black">` +
        social_links_insta +
        `</td>
      </tr>
        </table>
        <br/><br/>
        <p><strong>Please Note that your trip will not activated till you don't verify your e-mail id.</strong></p>
        <br/><br/>
        <p>If any details mentioned above is wrong or need to update then please don't verify the e-mail. We automatically delete the data from our database after 1 day. If you verify the e-mail id by mistake please contact us as soon as possible(within 1 day).</p>
        <br/><br/>
        <p>Thank You,</p>
        <br/>
        <p>Team Diffroute</p>`,
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent", +info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// sending mail for cancel trip

const sendmailfortripCancellation = async (first_name, last_name, email, tour_starting_place, touring_destination, token) => {
  try {
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "sayanssent@gmail.com",
        pass: "othe smvx jnvq nwce",
      },
    });

    const mailOptions = await {
      from: "sayanssent@gmail.com",
      to: email,
      subject: "For Trip Cancellation Verification",
      html:
        "<p>Hello, " +
        first_name +
        " " +
        last_name +
        `, we are sorry that we couldn't provide you the trip that you enjoy, please click the link to <a target="_blank" href="http://localhost:8000/tripcancelled?token=` +
        token +
        '"> verify and cancel</a> your ' + tour_starting_place + ' to ' + touring_destination + ' trip</p><p>Thank You,</p>',
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent", +info.response);
      }
    });
  } catch (error) {
    console.log(error)
  }
}

// sending mail for stop trip casting

const sendmailforstopcastingtrip = async (company_name, company_email, token, why_cancel_trip_option, why_cancel_trip_thoughts) => {
  try {
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "sayanssent@gmail.com",
        pass: "othe smvx jnvq nwce",
      },
    });

    const mailOptions = await {
      from: "sayanssent@gmail.com",
      to: company_email,
      subject: "For Trip Cancellation Verification",
      html:
        "<p>Team " +
        company_name +
        `, we hope you got a satisfied service from us and now, you want to stop casting your trip on our webpage with an satisfied result. </p>
        <br/>
        <p>To stop casting your trip please <a target="_blank" href="http://localhost:8000/organizedtripcancelled?token=` +
        token +
        '&why_cancel_trip_option=' +
        why_cancel_trip_option + 
        '&why_cancel_trip_thoughts=' + 
        why_cancel_trip_thoughts + 
        '">click here</a>.</p> <br> <p>Thanks for trusting us,</p>',
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent", +info.response);
      }
    });
  } catch (error) {
    console.log(error)
  }
}

// home page view

const homeview = async (req, res) => {
  try {
    const user = await user_data.findById(req.session.user_id);
    res.render("index", { user });
  } catch (error) {
    console.log(error);
  }
};

// get a trip view

const get_trip_view = async (req, res) => {
  try {
    const user = await user_data.findById(req.session.user_id);
    let trips = await live_trip_detail.find({ isActivate: true });

    for (let i = 0; i < trips.length; i++) {
      const element = trips[i];
      if (Date.now() >= element.tourInactiveDate || element.available_seats <= 0) {
        await element.updateOne({ isActivate: false });
      }
    }

    trips = await live_trip_detail.find({ isActivate: true });

    res.render("goforatour", {
      user,
      trips,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// organize a trip view

const organize_trip_view = async (req, res) => {
  try {
    res.render("organize_a_trip");
  } catch (error) {
    console.log(error.message);
  }
};

// organize a trip

const organize_trip = async (req, res) => {
  try {
    const company_name = req.body.company_name;
    const company_email = req.body.company_email;
    const tour_starting_place = req.body.tour_starting_place;
    const tour_started_date = new Date(req.body.tour_started_date);
    const tour_started_time = req.body.tour_started_time;
    const touring_destination = req.body.touring_destination;
    const seat_allocated = req.body.seat_allocated;
    const tour_ended_date = new Date(req.body.tour_ended_date);
    const tour_ended_time = req.body.tour_ended_time;
    const tourRange_day = req.body.tourRange_day;
    const tourRange_night = req.body.tourRange_night;
    const tour_package_rate = req.body.tour_package_rate;
    const tandc_1 = req.body.tandc_1;
    const tandc_2 = req.body.tandc_2;
    const tandc_3 = req.body.tandc_3;
    const tandc_4 = req.body.tandc_4;
    const tandc_5 = req.body.tandc_5;
    const tandc_6 = req.body.tandc_6;
    const accountHolder_name = req.body.accountHolder_name;
    const account_number = req.body.account_number;
    const ifsc_code = req.body.ifsc_code;

    let tour_started_date_day = tour_started_date.getDate();
    let tour_started_date_month = Number(tour_started_date.getMonth()) + 1;
    let tour_started_date_year = tour_started_date.getFullYear();
    let tour_ended_date_day = tour_ended_date.getDate();
    let tour_ended_date_month = Number(tour_ended_date.getMonth()) + 1;
    let tour_ended_date_year = tour_ended_date.getFullYear();

    if (
      company_name &&
      company_email &&
      tour_ended_date &&
      tour_ended_time &&
      tour_starting_place &&
      tour_started_date &&
      tour_started_time &&
      touring_destination &&
      seat_allocated &&
      tourRange_day &&
      tourRange_night &&
      tour_package_rate &&
      tandc_1 &&
      tandc_2 &&
      tandc_3 &&
      tandc_4 &&
      tandc_5 &&
      tandc_6 &&
      accountHolder_name &&
      account_number &&
      ifsc_code
    ) {
      const tourorganizer = new live_trip_detail({
        tour_created_userId: req.session.user_id,
        company_name: req.body.company_name,
        company_email: req.body.company_email,
        company_website: req.body.company_website,
        tour_starting_place: req.body.tour_starting_place,
        tourInactiveDate: tour_started_date - 3 * 86400000,
        tour_canBeCancelled_date: tour_started_date - (Number(req.body.seat_can_be_cancelled_options[8]) * 86400000),
        tour_started_date_day,
        tour_started_date_month,
        tour_started_date_year,
        tour_started_time: req.body.tour_started_time,
        touring_destination: req.body.touring_destination,
        seat_allocated: req.body.seat_allocated,
        available_seats: req.body.seat_allocated,
        tour_ended_date_day,
        tour_ended_date_month,
        tour_ended_date_year,
        tour_ended_time: req.body.tour_ended_time,
        tourRange_day: req.body.tourRange_day,
        tourRange_night: req.body.tourRange_night,
        tour_package_rate: req.body.tour_package_rate,
        tour_package_include: req.body.tour_package_include,
        details_about_tour: req.body.details_about_tour,
        vehicle_type: req.body.vehicle_type,
        vehicle_seat_type: req.body.vehicle_seat_type,
        vehicle_environment: req.body.vehicle_environment,
        vehicle_model: req.body.vehicle_model,
        seat_cancellation: req.body.seat_cancellation,
        seat_can_be_cancelled_options: req.body.seat_can_be_cancelled_options,
        tandc_1: req.body.tandc_1,
        tandc_2: req.body.tandc_2,
        tandc_3: req.body.tandc_3,
        tandc_4: req.body.tandc_4,
        tandc_5: req.body.tandc_5,
        tandc_6: req.body.tandc_6,
        tandc_7: req.body.tandc_7,
        tandc_8: req.body.tandc_8,
        tandc_9: req.body.tandc_9,
        tandc_other: req.body.tandc_other,
        accountHolder_name: req.body.accountHolder_name,
        account_number: req.body.account_number,
        ifsc_code: req.body.ifsc_code,
        social_links_twt: req.body.social_links_twt,
        social_links_facebook: req.body.social_links_facebook,
        social_links_insta: req.body.social_links_insta,
      });

      const tourorganized = await tourorganizer.save();

      if (tourorganized) {
        const randomToken = randomstring.generate();

        await live_trip_detail.findByIdAndUpdate(
          { _id: tourorganized._id },
          { $set: { token: randomToken } }
        );

        await sendtripVerificationmail(
          randomToken,
          req.body.company_name,
          req.body.company_email,
          req.body.company_website,
          req.body.tour_starting_place,
          tour_started_date_day,
          tour_ended_date_month,
          tour_started_date_year,
          req.body.tour_started_time,
          req.body.touring_destination,
          tour_ended_date_day,
          tour_ended_date_month,
          tour_ended_date_year,
          req.body.tour_ended_time,
          req.body.tourRange_day,
          req.body.tourRange_night,
          req.body.tour_package_rate,
          req.body.tour_package_include,
          req.body.details_about_tour,
          req.body.vehicle_type,
          req.body.vehicle_seat_type,
          req.body.vehicle_environment,
          req.body.vehicle_model,
          req.body.seat_cancellation,
          req.body.seat_can_be_cancelled_options,
          req.body.tandc_1,
          req.body.tandc_2,
          req.body.tandc_3,
          req.body.tandc_4,
          req.body.tandc_5,
          req.body.tandc_6,
          req.body.tandc_7,
          req.body.tandc_8,
          req.body.tandc_9,
          req.body.tandc_other,
          req.body.accountHolder_name,
          req.body.account_number,
          req.body.ifsc_code,
          req.body.social_links_twt,
          req.body.social_links_facebook,
          req.body.social_links_insta
        );
        res.status(201).redirect("/");
      } else {
        res.redirect("back", {
          message: "Please check your all details",
        });
      }
    } else {
      res.send("please fill all details");
    }
  } catch (error) {
    res.send({ message: "there is a problem please try again" });
    console.log(error.message);
  }
};

// Trip Verification

const trip_verification = async (req, res) => {
  try {
    const token = req.query.token;
    const istoken = await live_trip_detail.findOne({ token: token });

    if (istoken) {
      await live_trip_detail.findOneAndUpdate(
        { token: token },
        {
          $set: {
            isActivate: true,
            token: "",
          },
        }
      );
      res.render("trip_verified");
    } else {
      res.send("Your Token is invalid. Please try again !!");
    }
  } catch (error) {}
};

// myaccount view

const myaccount_view = async (req, res) => {
  try {
    const user = await user_data.findById(req.session.user_id);

    if (!user) {
      res.redirect("/login");
    } else {
      res.render("userprofile", {
        user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const updating_profile_picture_controller = uploadforprofilepicupdate.single(
  "profile_picture_upload"
);

const myaccount = async (req, res) => {
  try {
    const user = await user_data.findById({ _id: req.session.user_id });

    if (req.file) {
      const userDataUpdated = await user_data.findByIdAndUpdate(
        { _id: user._id },
        {
          $set: {
            profile_picture_url: req.file.filename,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            gender: req.body.gender,
            country: req.body.country,
            state: req.body.state,
            phone: req.body.phone,
          },
        }
      );
    } else {
      const userDataUpdated = await user_data.findByIdAndUpdate(
        { _id: user._id },
        {
          $set: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            gender: req.body.gender,
            country: req.body.country,
            state: req.body.state,
            phone: req.body.phone,
          },
        }
      );
    }

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

// goforatour_details view

const goforatour_details_view = async (req, res) => {
  try {
    const user = await user_data.findById({ _id: req.session.user_id });
    const tripId = req.query.id;
    const trips = await live_trip_detail.findById({ _id: tripId });
    res.render("insidegettrip", { user, trips });
  } catch (error) {
    console.log(error);
  }
};

// Trip_History view

const trip_history_view = async (req, res) => {
  try {
    const user = await user_data.findById({ _id: req.session.user_id });
    const attendedTripsSalt = await user.trip_attended;
    const organizedTripsForTripHit = await live_trip_detail.find({
      tour_created_userId: req.session.user_id,
    });

    const attendedTripsArr = [];

    for (let i = 0; i < attendedTripsSalt.length; i++) {
      var attendedTrips = attendedTripsSalt[i].trip;
      attendedTripsArr.push(attendedTrips);
    }

    const attendTripsForTripHit = [];

    for (let i = 0; i < attendedTripsArr.length; i++) {
      const element = attendedTripsArr[i];
      const initialattendTripsForTripHit = await live_trip_detail.findOne({
        _id: element,
      });
      attendTripsForTripHit.push(initialattendTripsForTripHit);
    }

    console.log(attendTripsForTripHit);

    res.render("trip_history", {
      user,
      attendTripsForTripHit,
      organizedTripsForTripHit,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// register you vehicle_view

const registerYourVehicleView = async (req, res) => {
  try {
    res.render("servicenotavailable");
  } catch (error) {
    console.log(error);
  }
};

// approach_us view

const approach_us_view = async (req, res) => {
  try {
    const user = await user_data.findById(req.session.user_id);
    res.render("Approach", { user });
  } catch (error) {
    console.log(error.message);
  }
};

// user email verification method

const user_email_verify = async (req, res) => {
  try {
    await user_data.updateOne(
      { _id: req.query.id },
      { $set: { email_isVerified: true } }
    );

    res.render("userEmailVerified_View");
  } catch (error) {
    console.log(error);
  }
};

// user registration method

const insertuser_view = (req, res) => {
  return res.render("createanaccountform");
};

const uploading_profile_picture_controller = upload.single(
  "profile_picture_upload"
);

const insertuser = async (req, res) => {
  try {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const gender = req.body.gender;
    const country = req.body.country;
    const state = req.body.state;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    const conpassword = req.body.conpassword;

    if (
      first_name &&
      last_name &&
      gender &&
      country &&
      state &&
      phone &&
      email &&
      password &&
      conpassword
    ) {
      if (password === conpassword) {
        if (req.file) {
          var initial_profile_picture = req.file.filename;
        } else {
          initial_profile_picture = "user-regular-24.png";
        }
        const registeruser = new user_data({
          profile_picture_url: initial_profile_picture,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          gender: req.body.gender,
          country: req.body.country,
          state: req.body.state,
          phone: req.body.phone,
          email: req.body.email,
          password: req.body.password,
          confirm_password: req.body.conpassword,
        });

        const user_registerd = await registeruser.save();

        if (user_registerd) {
          await sendverificationmail(
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            user_registerd._id
          );
          res.status(201).redirect("/");
        } else {
          res.redirect("/createanaccount", {
            message: "Please check your details",
          });
        }
      } else {
        res.send("passwords are not matching");
      }
    } else {
      res.render("createanaccountform", {
        message: "Please fill all the fields",
      });
    }
  } catch (error) {
    res.render("createanaccountform", { message: "User already registered" });
    console.log(error);
  }
};

//login user method

const loginuser_view = (req, res) => {
  res.render("login");
};

const loginuser = async (req, res) => {
  const sublogincheckForUsericon = auth.logincheckForUsericon;
  try {
    const user_typed_email = req.body.login_email;
    const user_typed_password =
      req.body.login_password ||
      req.body.login_passwordForaldcft ||
      req.body.login_password_smscr;

    const useremail = await user_data.findOne({ email: user_typed_email });

    const isMatch = await bcrypt.compare(
      user_typed_password,
      useremail.password
    );

    const token = await useremail.generateAuthToken();

    const cookies = res.cookie("jwt", token, {
      expires: new Date(Date.now() + 45 * 24 * 3600000),
      httpOnly: true,
      // secure: true
    });

    if (isMatch) {
      const email_isVerified = useremail.email_isVerified;
      if (email_isVerified) {
        req.session.user_id = useremail._id;
        res.status(201).redirect("/");
      } else {
        res.send("Your email is not verified....");
      }
    } else {
      res.send("invaild password details");
    }
  } catch (error) {
    res.send("invalid email" + "" + error);
  }
};

// Forgot Password View

const forgotPassword_view = async (req, res) => {
  try {
    res.render("forgot_password");
  } catch (error) {
    console.log(error);
  }
};

// Forgot Password

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.emailForReset;

    const isemailfound = await user_data.findOne({ email: email });

    if (isemailfound) {
      if (isemailfound.email_isVerified) {
        const randomString = randomstring.generate() + Date.now();

        const updatedata = await user_data.updateOne(
          { email: email },
          { $set: { token: randomString } }
        );

        sendresetmail(
          isemailfound.first_name,
          isemailfound.last_name,
          isemailfound.email,
          randomString
        );

        res.render("forgot_password", {
          msg: "Please check your mail to reset your password.",
        });
      } else {
        alert("Email is not found !");
        res.render("forgot_password");
      }
    } else {
      res.render("forgot_password");
      alert("Email Id is not found");
    }
  } catch (error) {
    console.log(error);
  }
};

// Reset Password View

const resetPassword_view = async (req, res) => {
  try {
    const usertoken = req.query.token;
    const tokenData = await user_data.findOne({ token: usertoken });
    if (tokenData) {
      res.render("reset_password", {
        user_id: tokenData._id,
        user_email: tokenData.email,
      });
    } else {
      res.redirect("/");
      alert("Invalid token found!");
    }
  } catch (error) {
    console.log(error);
  }
};

// Reset Password

const resetPassword = async (req, res) => {
  try {
    const new_password = req.body.new_password;
    const confirm_new_password = req.body.confirm_new_password;
    const user_id = req.body.user_id;

    if (new_password === confirm_new_password) {
      const new_password_Payload = await bcrypt.hash(new_password, 10);
      const confirm_new_password_Payload = await bcrypt.hash(
        confirm_new_password,
        10
      );

      await user_data.findByIdAndUpdate(
        { _id: user_id },
        {
          $set: {
            password: new_password_Payload,
            confirm_password: confirm_new_password_Payload,
            token: "",
          },
        }
      );

      res.render("login", { homemsg: "Password Updated !" });
    } else {
      res.render("reset_password", { message: "Password did not match !" });
    }
  } catch (error) {
    console.log(error);
  }
};

// logout user

const logoutUser = async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("jwt");
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
};

// Prepayment View

const prepayment_view = async (req, res) => {
  try {
    const user_id = req.session.user_id;
    res.render("prepayment", { user_id });
  } catch (error) {
    console.log(error);
  }
};

//Payment Method

const Payment = async (req, res) => {
  try {
    var instance = new Razorpay({
      key_id: "rzp_test_DRZ2l5e2BpzChh",
      key_secret: "7oHTLeSmCN6ocJiT5a9OVixM",
    });

    const body = req.body;
    console.log(Object.assign(body));
    const amount = Number(req.body.tourPackage) * Number(req.body.numberSeats);

    console.log(amount);

    let options = {
      amount: amount * 100,
      currency: "INR",
      receipt: req.session.user_id + "-" + Date.now().toString(),
    };
    instance.orders.create(options, async function (err, order) {
      if (!err) {
        await order_details_model.create({
          order_id: order.id,
          trip_id: req.body.trip_id,
          amount: amount,
        });

        console.log(order);
        res.json(order);
      } else {
        const errobj = err;
        console.log(Object.assign(errobj));
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// Payment Verification

const PaymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const bodyData = razorpay_order_id + "|" + razorpay_payment_id;

    const except_bodyData = crypto
      .createHmac("sha256", "7oHTLeSmCN6ocJiT5a9OVixM")
      .update(bodyData)
      .digest("hex");

    const isValid = except_bodyData === razorpay_signature;

    if (isValid) {
      await order_details_model.findOneAndUpdate(
        { order_id: razorpay_order_id },
        {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        }
      );

      const user_id = req.query.user_id;
      const trip_id = req.query.trip_id;
      const number_of_seats = Number(req.query.number_of_seats);

      await user_data.findOneAndUpdate(
        { _id: user_id },
        {
          $push: {
            trip_attended: { trip: trip_id },
          },
        }
      );

      await live_trip_detail.findByIdAndUpdate(
        { _id: trip_id },
        {
          $push: {
            trip_attendies: { user: user_id, number_of_seats: number_of_seats },
          },
        }
      );

      const currentTrips = await live_trip_detail.findById({
        _id: trip_id,
      });
      const available_seats = currentTrips.available_seats;

      await live_trip_detail.findOneAndUpdate(
        { trip_id: trip_id },
        {
          available_seats: available_seats - number_of_seats,
        }
      );

      res.redirect(
        `http://localhost:8000/goforatour/details/prepayment/payments/payment-successful?payment_id=${razorpay_payment_id}`
      );
      return;
    } else {
      res.redirect(
        "http://localhost:8000/goforatour/details/prepayment/payments/payment-failed"
      );
      return;
    }
  } catch (error) {
    console.log(error.message);
  }
};

// Payment successful

const paymentSuccessful = async (req, res) => {
  try {
    res.render("paymentsuccess");
  } catch (error) {
    console.log(error);
  }
};

// Payment Failed

const paymentFailed = async (req, res) => {
  try {
    res.render("paymentfailed");
  } catch (error) {
    console.log(error);
  }
};

// cancel my trip page

const historyTripDetails = async (req, res) => {
  try {
    const trips = await live_trip_detail.findById({_id: req.query.id});
    const trip_attendies = trips.trip_attendies;
    const user = req.session.user_id;
    let number_of_seats;

    for (let i = 0; i < trip_attendies.length; i++) {
      const element = trip_attendies[i];
      if (element.user == user) {
        number_of_seats = element.number_of_seats
      }
    }
    res.render('historyTripDetailsView', {user, trips, number_of_seats});
  } catch (error) {
    console.log(error)
  }
}

const cancelmytripemailverify = async (req, res) => {
  try {
    const tokenforcanceltrip = randomstring.generate()
    const user = await user_data.findById({_id: req.query.user_id})
    const trip = await live_trip_detail.findById({_id: req.query.trip_id})
    
    await user_data.findByIdAndUpdate({_id: req.query.user_id}, {
      $set:{token: tokenforcanceltrip}
    })
    sendmailfortripCancellation(user.first_name, user.last_name, user.email, trip.tour_starting_place, trip.touring_destination, tokenforcanceltrip)
    res.render('cancelMyTripemailverify')
  } catch (error) {
    console.log(error)
  }
}

const tripcancelled = async (req, res) => {
  try {
    const token = req.query.token;
    const isusertoken = await user_data.findOne({ token: token });

    if (isusertoken) {
      await user_data.findOneAndUpdate(
        { token: token },
        {
          $pull:{trip_attended:{trip: istriptoken._id}},
          $set:{token: ""}
        }
      );

      res.render("tripisnowcancelled");
    } else {
      res.send("Your Token is invalid. Please try again !!");
    }
  } catch (error) {
    console.log(error)
  }
}

// stop casting my organized trip

const historyorganizedtripdetailsView = async (req, res) => {
  try {
    const trips = await live_trip_detail.findById({_id: req.query.id})
    res.render("historyorganizedtripdetails", {trips})
  } catch (error) {
    console.log(error)
  }
}

const historyorganizedtripdetails = async (req, res) => {
  try {
    const tokenforstopTripCasting = randomstring.generate()
    await live_trip_detail.findByIdAndUpdate({_id: req.body.id}, {
      $set: {token: tokenforstopTripCasting}
    })
    await sendmailforstopcastingtrip(req.body.company_name, req.body.company_email, tokenforstopTripCasting, req.body.why_cancel_trip_option, req.body.why_cancel_trip_thoughts)
    res.render('stopcastingtripmailverify')
  } catch (error) {
    console.log(error)
  }
}

const organizedtripcancelled = async (req, res) => {
  try {
    await live_trip_detail.findOneAndUpdate({token: req.query.token}, {
      $set: {token: '', isActivate: false, why_cancel_trip_option: req.query.why_cancel_trip_option, why_cancel_trip_thoughts: req.query.why_cancel_trip_thoughts},
    })
    res.render('tripcastingstopped')
  } catch (error) {
    console.log(error)
  }
}

// Not Found Page_view

const notfoundPage = async (req, res) => {
  try {
    res.status(404).render("notfoundPage");
  } catch (error) {
    console.log(error);
  }
};

// exports function

module.exports = {
  uploading_profile_picture_controller,
  insertuser,
  user_email_verify,
  loginuser,
  forgotPassword_view,
  forgotPassword,
  resetPassword_view,
  resetPassword,
  logoutUser,
  homeview,
  get_trip_view,
  Payment,
  PaymentVerification,
  paymentSuccessful,
  paymentFailed,
  prepayment_view,
  organize_trip_view,
  organize_trip,
  trip_verification,
  trip_history_view,
  registerYourVehicleView,
  myaccount_view,
  updating_profile_picture_controller,
  myaccount,
  goforatour_details_view,
  approach_us_view,
  loginuser_view,
  insertuser_view,
  historyorganizedtripdetailsView,
  historyorganizedtripdetails,
  organizedtripcancelled,
  historyTripDetails,
  cancelmytripemailverify,
  tripcancelled,
  notfoundPage,
};
