const isloggedin = async (req, res, next) => {
  try {
    if (req.session.user_id) {
    } else {
      await res.redirect("/login");
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

const islogout = async (req, res, next) => {
  try {
    if (req.session.user_id) {
      await res.redirect("/");
    } else {
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};



module.exports = {
  isloggedin,
  islogout,
};
