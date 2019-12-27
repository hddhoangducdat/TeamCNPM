var userModel = require("../models/userModel");
var profileModel = require("../models/profileModel");

exports.profile_info = async (req, res) => {
  const profile = await profileModel.findById(req.user._id);
  res.render("profilePage", {
    title: "Black Hole",
    condition: false,
    user: req.user,
    // profile: {
    //   name: "Hoàng Đức Đạt",
    //   address: "7A/102 Thành Thái",
    //   phone: "0981831448",
    //   sex: "nam",
    //   email: "hddhoangducdat@gmail.com",
    //   picture:
    //     "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.0-9/54799897_104992787344972_2706694677771321344_n.jpg?_nc_cat=107&_nc_oc=AQmdBJELHSz5hbyrf5jAyenQB2WTTJAypPAREf_UF7EEZuj0bLjb_bxTmoFzWSiw_EE&_nc_ht=scontent.fsgn3-1.fna&oh=797d248960f52fb1734429caf319bbae&oe=5E19E9CC"
    // }
    profile
  });
};
