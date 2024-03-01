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

// sending mail for verification

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
    const trips = await live_trip_detail.find({});

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
    let tour_started_date_month = tour_started_date.getMonth();
    let tour_started_date_year = tour_started_date.getFullYear();
    let tour_ended_date_day = tour_ended_date.getDate();
    let tour_ended_date_month = tour_ended_date.getMonth();
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
        common_trip_id: Date.now() + "_" + randomstring.generate(),
        tour_created_userId: req.session.user_id,
        company_name: req.body.company_name,
        company_email: req.body.company_email,
        company_website: req.body.company_website,
        tour_starting_place: req.body.tour_starting_place,
        tour_started_date_day,
        tour_started_date_month: tour_started_date_month + 1,
        tour_started_date_year,
        tour_started_time: req.body.tour_started_time,
        touring_destination: req.body.touring_destination,
        tour_ended_date_day,
        tour_ended_date_month: tour_ended_date_month + 1,
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
        console.log("the page part is :" + tourorganized);
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
    const user = await user_data.findById({_id: req.session.user_id});
    const attendedTripsSalt = await user.trip_attended;
    const organizedTripsForTripHit = await live_trip_detail.find({tour_created_userId: req.session.user_id});

    const attendedTripsArr = [];

    for (let i = 0; i < attendedTripsSalt.length; i++) {
      var attendedTrips = attendedTripsSalt[i].trip;
      attendedTripsArr.push(attendedTrips)
    }

    const attendTripsForTripHit = []

    for (let i = 0; i < attendedTripsArr.length; i++) {
      const element = attendedTripsArr[i];
      const initialattendTripsForTripHit = await live_trip_detail.findOne({ common_trip_id: element})
      attendTripsForTripHit.push(initialattendTripsForTripHit)
    }

    res.render("trip_history", { user, attendTripsForTripHit, organizedTripsForTripHit });

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
        res.send("your email is not verified");
      }
    } else {
      res.render("forgot_password", { message: "Email Id is not found" });
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
          common_trip_id: req.body.common_trip_id,
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
      const common_trip_id = req.query.common_trip_id;

      console.log(common_trip_id);

      console.log(randomstring.generate());

      await user_data.findOneAndUpdate(
        { _id: user_id },
        {
          $push: {
            trip_attended: { trip: common_trip_id },
          },
        }
      );

      await live_trip_detail.findOneAndUpdate(
        { common_trip_id: common_trip_id },
        {
          $push: {
            trip_attendies: { user: user_id },
          },
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
    console.log(error);
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
  trip_history_view,
  registerYourVehicleView,
  myaccount_view,
  updating_profile_picture_controller,
  myaccount,
  goforatour_details_view,
  approach_us_view,
  loginuser_view,
  insertuser_view,
  notfoundPage,
};
