var userModel = require("../models/userModel");
var productModel = require("../models/productModel");
var cartModel = require("../models/cartModel");
var historyModel = require("../models/historyModel");
var sellerModel = require("../models/sellerModel");
var httpMsgs = require("http-msgs");
var _ = require("lodash");

const delete_product = async id => {
  const product = await productModel.findByIdAndDelete(id);
  await product.save();
};

exports.seller_delete = async (req, res) => {
  const seller = await sellerModel.findOneAndDelete({ _id: req.body.id });
  const product = await productModel.find({ sellerId: req.body.id });
  product.forEach(p => delete_product(p._id));
  await seller.save();
};

exports.delete_user = async (req, res) => {
  //   console.log(req.body)/;
  const user = await userModel.findOneAndDelete({ _id: req.body.id });
  const cart = await cartModel.findOneAndDelete({ userId: req.body.id });
  const history = await historyModel.findOneAndDelete({ userId: req.body.id });

  await user.save();
  if (cart) await cart.save();
  if (history) await history.save();
};

exports.home_show = async (req, res) => {
  if (req.user.type === "admin") {
    const user = await userModel.find();
    res.render("userPage", {
      title: "TeamCNPM",
      user: {
        name: req.user.username,
        image: req.user.image,
        type: req.user.type === "admin" ? true : false
      },
      people: user
    });
  } else {
    const product = await productModel.find({ sellerId: req.user._id });
    let earning = 0;
    let quantity = 0;
    let statictis = [];
    product.sort((a, b) => {
      return b.price * b.sold - a.price * a.sold;
    });

    product.forEach((p, i) => {
      p.profit = p.sold * p.price;
      if (i === 10) return;
      statictis = [...statictis, p];
    });
    product.forEach(p => {
      earning += p.sold * p.price;
      quantity += p.sold;
    });
    res.render("homePage", {
      title: "TeamCNPM",
      user: {
        name: req.user.username,
        image: req.user.image,
        type: req.user.type === "admin" ? true : false
      },
      earning,
      quantity,
      statictis
    });
  }
};

exports.search_product = async (req, res) => {
  let search = req.body.search.toLowerCase();
  const product = req.user.type
    ? await productModel.find()
    : await productModel.find({ sellerId: req.user._id });
  let arr = [];
  product.forEach((p, i) => {
    var vtr = p.name.toLowerCase().search(search);
    if (vtr !== -1)
      arr = [
        ...arr,
        { name: p.name, href: `/management/product/modify/${p._id}` }
      ];
  });
  console.log(arr);
  httpMsgs.sendJSON(req, res, {
    arr
  });
};

exports.user_info = async (req, res) => {
  let user = await userModel.findById(req.params.id);
  res.render("userInfo", {
    title: "TeamCNPM",
    user: {
      name: req.user.username,
      image: req.user.image,
      type: req.user.type === "admin" ? true : false
    },
    userInfo: user
  });
};

exports.change_user_info = async (req, res) => {
  let user = await userModel.findById(req.params.id);
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.sex = req.body.sex;
  user.address = req.body.address;
  user.phone = req.body.phone;
  if (req.file) {
    user.image = "http://localhost:3001/" + "uploads/" + req.file.filename;
  }
  await user.save();
  res.redirect(`/user/${req.params.id}`);
};

exports.upload_profile = async (req, res) => {
  let seller = await sellerModel.findById(req.user._id);
  seller.firstName = req.body.firstName;
  seller.lastName = req.body.lastName;
  seller.username = req.body.username;
  seller.email = req.body.email;
  if (req.file) {
    seller.image = "http://localhost:3001/" + "uploads/" + req.file.filename;
  }
  await seller.save();
  res.redirect("/profile");
};

exports.block_user = async (req, res) => {
  let user = await userModel.findById(req.params.id);
  user.blocked = true;
  await user.save();
};

exports.unblock_user = async (req, res) => {
  let user = await userModel.findById(req.params.id);
  user.blocked = false;
  await user.save();
};
