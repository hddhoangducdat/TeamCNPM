var express = require("express");
var isAuthenticated = require("../middlewares/isAuthenticated");
var router = express.Router();

router.get("/", isAuthenticated, async (req, res) => {
  console.log(req.user);
  res.render("profilePage", {
    title: "Black Hole Admin",

    user: {
      username: req.user.username,
      email: req.user.email,
      fullName: req.user.firstName + " " + req.user.lastName,
      image:
        "https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/54799897_104992787344972_2706694677771321344_n.jpg?_nc_cat=107&_nc_oc=AQnC1K3OPfHj6wc3kzI_ojtRjG04EFPj1IbHojkuFXc5MG7eKUUv4sM38kEHIMarQX0&_nc_ht=scontent.fsgn1-1.fna&oh=a7fc0a694ea731bfece6af0ecc6d6135&oe=5E19E9CC",
      type: req.user.type === "admin" ? true : false
    }
  });
});

module.exports = router;
