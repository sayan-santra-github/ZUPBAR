require('dotenv').config();
const express = require("express");
const router = new express.Router();
const user_data = require("../models/userregistrationsmodel");
const bodyParser = require('body-parser')
const session = require("express-session");
const connecttocontroller = require("./../controller/userregistrationcontroller");
const auth = require("../middleware/auth");

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))


router.get("/", connecttocontroller.homeview);

router.get(
  "/createanaccount",
  auth.islogout,
  connecttocontroller.insertuser_view
);

router.post(
  "/createanaccount",
  connecttocontroller.uploading_profile_picture_controller,
  connecttocontroller.insertuser
);

router.get("/email-verify", connecttocontroller.user_email_verify)

router.get('/resend-verification-email', connecttocontroller.Resendverificationmail)

router.get("/login", auth.islogout, connecttocontroller.loginuser_view);

router.post("/login", connecttocontroller.loginuser);

router.get("/forgot-password", auth.islogout, connecttocontroller.forgotPassword_view)

router.post("/forgot-password", connecttocontroller.forgotPassword);

router.get("/reset-password", auth.islogout, connecttocontroller.resetPassword_view);

router.post("/reset-password", connecttocontroller.resetPassword)

router.get("/logout", auth.isloggedin, connecttocontroller.logoutUser);

router.get("/goforatour", connecttocontroller.get_trip_view);

router.get(
  "/organizeTrip",
  auth.isloggedin,
  connecttocontroller.organize_trip_view
);

router.post("/organizeTrip", connecttocontroller.organize_trip);

router.get("/trip-verification", connecttocontroller.trip_verification)

router.get("/registeryourvehicle", connecttocontroller.registerYourVehicleView)

router.get("/myaccount", auth.isloggedin, connecttocontroller.myaccount_view);

router.post(
  "/myaccount",
  connecttocontroller.updating_profile_picture_controller,
  connecttocontroller.myaccount
);

router.get("/triphistory", auth.isloggedin, connecttocontroller.trip_history_view);

router.get("/triphistory/tripdetails", auth.isloggedin, connecttocontroller.historyTripDetails);

router.get("/triphistory/tripdetails/cancelmytripemailverify", auth.isloggedin, connecttocontroller.cancelmytripemailverify);

router.get("/tripcancelled", connecttocontroller.tripcancelled)

router.get("/triphistory/organizedtripdetails", auth.isloggedin, connecttocontroller.historyorganizedtripdetailsView)

router.post("/triphistory/organizedtripdetails", connecttocontroller.historyorganizedtripdetails)

router.get("/organizedtripcancelled", connecttocontroller.organizedtripcancelled)

router.get(
  "/goforatour/details",
  auth.isloggedin,
  connecttocontroller.goforatour_details_view
);

router.get("/goforatour/details/prepayment", auth.isloggedin, connecttocontroller.prepayment_view)

router.get("/goforatour/details/prepayment/payments/payment-successful", connecttocontroller.paymentSuccessful)

router.get("/goforatour/details/prepayment/payments/payment-failed", connecttocontroller.paymentFailed)

router.post("/goforatour/details/prepayment/payments", connecttocontroller.Payment)

router.post("/goforatour/details/prepayment/payments/payment-verification", connecttocontroller.PaymentVerification)

router.get("/approachus", connecttocontroller.approach_us_view);

router.get("/privacypolicy", connecttocontroller.privacyPolicy)

router.get('/termsofservice', connecttocontroller.termsofservice)

router.get('/useragreement', connecttocontroller.userAgreement)

router.get('/aboutus', connecttocontroller.aboutUs)

router.get("*", connecttocontroller.notfoundPage)

module.exports = router;