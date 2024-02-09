const express = require("express");
const router = new express.Router();
const user_data = require("../models/userregistrationsmodel");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const connecttocontroller = require("./../controller/userregistrationcontroller");
const auth = require("../middleware/auth");

router.use(
  session({
    secret: "sadd5410053#@$%^tyrSFSS754",
    resave: false,
    saveUninitialized: false,
  })
);


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

router.get("/login", auth.islogout, connecttocontroller.loginuser_view);

router.post("/login", connecttocontroller.loginuser);

router.get("/logout", auth.isloggedin, connecttocontroller.logoutUser);

router.get("/goforatour", connecttocontroller.get_trip_view);

router.get(
  "/organizeTrip",
  auth.isloggedin,
  connecttocontroller.organize_trip_view
);

router.post("/organizeTrip", connecttocontroller.organize_trip);

router.get("/registeryourvehicle", connecttocontroller.registerYourVehicleView)

router.get("/myaccount", auth.isloggedin, connecttocontroller.myaccount_view);

router.post(
  "/myaccount",
  connecttocontroller.updating_profile_picture_controller,
  connecttocontroller.myaccount
);

router.get("/triphistory", connecttocontroller.trip_history_view);

router.get(
  "/goforatour/details",
  auth.isloggedin,
  connecttocontroller.goforatour_details_view
);

router.post("/goforatour/details/payments", connecttocontroller.Payment)

router.get("/approachus", connecttocontroller.approach_us_view);

router.get("*", connecttocontroller.notfoundPage)

module.exports = router;
