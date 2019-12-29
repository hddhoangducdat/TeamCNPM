var userModel = require("../models/userModel");
var customerModel = require("../models/customerModel");
var _ = require("lodash");

exports.all_seller = async (req, res) => {
  var brand = await userModel.find();
  _.remove(brand, br => br.type === "admin");
  brand.map(br => {
    return {
      ...br,
      image:
        "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.0-9/54799897_104992787344972_2706694677771321344_n.jpg?_nc_cat=107&_nc_oc=AQmdBJELHSz5hbyrf5jAyenQB2WTTJAypPAREf_UF7EEZuj0bLjb_bxTmoFzWSiw_EE&_nc_ht=scontent.fsgn3-1.fna&oh=797d248960f52fb1734429caf319bbae&oe=5E19E9CC"
    };
  });

  res.render("brandPage", {
    title: "Black Hole Admin",
    user: {
      name: req.user.lastName,
      image:
        "https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/54799897_104992787344972_2706694677771321344_n.jpg?_nc_cat=107&_nc_oc=AQnC1K3OPfHj6wc3kzI_ojtRjG04EFPj1IbHojkuFXc5MG7eKUUv4sM38kEHIMarQX0&_nc_ht=scontent.fsgn1-1.fna&oh=a7fc0a694ea731bfece6af0ecc6d6135&oe=5E19E9CC",
      type: req.user.type === "admin" ? true : false
    },
    brand
  });
};
