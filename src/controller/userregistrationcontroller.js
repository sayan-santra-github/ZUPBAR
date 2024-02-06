const user_data = require("./../models/userregistrationsmodel");
const trip_detail = require("./../models/organize_a_trip_model");
const bcrypt = require("bcryptjs");
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
    const trips = await trip_detail.find({});

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
      const tourorganizer = new trip_detail({
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
        details_about_tour: req.body.details_about_tour,
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
    const user = await user_data.findById(req.session.user_id);
    const tripId = req.query.id;
    const trips = await trip_detail.findById({ _id: tripId });
    res.render("insidegettrip", { user, trips });
  } catch (error) {
    console.log(error);
  }
};

// Trip_History view

const trip_history_view = async (req, res) => {
  try {
    const user = await user_data.findById(req.session.user_id);
    res.render("trip_history", { user });
  } catch (error) {
    console.log(error.message);
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
          console.log("the page part is :" + user_registerd);
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
      req.body.login_password || req.body.login_passwordForaldcft;

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

//Payment Method

const Payment = async (req, res) => {
  try {
    var instance = new Razorpay({
      key_id: "rzp_test_PAvdEzSBZI90ek",
      key_secret: "eVzJyo6RSA6Zku6rgTgP1Q6d",
    });

    // const amount = Number(req.body.tour_package_rat) * 100 * Number(req.body.number_of_seats);
    // console.log("jfdhgkdjshfghjgdhfgjd" + req.body.tour_package_rat);
    // console.log(req.body)
    // console.log("duyfreiuriuoeyrueyiuhr" + amount)

    var options = {
      amount: "50000",
      currency: "INR",
      receipt: "rcptid_1",
    };
    instance.orders.create(options, function (err, order) {
      if (!err) {
        console.log("order ytfuyiyytytuyttutt");
        res.send({ orderId: order });
      } else {
        console.log(err);
        console.log(order);
      }
    });
  } catch (error) {
    console.log("payment " + error);
  }
};

// Not Found Page_view

const notfoundPage = async (req, res) => {
  try {
    res.render("notfoundPage");
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
  logoutUser,
  homeview,
  get_trip_view,
  Payment,
  organize_trip_view,
  organize_trip,
  trip_history_view,
  myaccount_view,
  updating_profile_picture_controller,
  myaccount,
  goforatour_details_view,
  approach_us_view,
  loginuser_view,
  insertuser_view,
  notfoundPage,
};
