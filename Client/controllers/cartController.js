var cartModel = require("../models/cartModel");
var productModel = require("../models/productModel");
var _ = require("lodash");

exports.cart_list = async (req, res) => {
  //console.log(req.user._id);
  // const { carts } = await cartModel.findOne({
  //   userId: req.user._id
  // });

  var response = await cartModel.findOne({ userId: req.user._id });
  const carts = response ? response.carts : null;
  let sum = 0;
  if (carts)
    carts.forEach(cart => (sum = sum + parseInt(cart.price) * cart.number));

  res.render("cartPage", {
    title: "Black Hole",
    user: req.user,
    // condition: false,
    sum,
    carts
  });
};

exports.addToCart = async (req, res) => {
  const product = await productModel.findById(req.body.id);
  var giohang = await cartModel.findOne({ userId: req.user._id });
  if (!giohang) giohang = new cartModel({ userId: req.user._id, carts: [] });
  if (!_.find(giohang.carts, cart => cart._id.equals(product._id))) {
    giohang.carts = [
      ...giohang.carts,
      {
        name: product.name,
        price: product.price,
        type: product.category,
        number: req.body.number ? req.body.number : 1,
        _id: product._id,
        image: product.images
      }
    ];
    await giohang.save();
    if (req.body.number) res.redirect("/cart");
  }
};

exports.remove_item = async (req, res) => {
  var response = await cartModel.findOne({ userId: req.user._id });

  _.remove(response.carts, cart => cart._id.equals(req.body.id));
  response.markModified("carts");
  await response.save();
};

exports.increase_product = async (req, res) => {
  let response = await cartModel.findOne({ userId: req.user._id });
  response.carts.forEach(cart => {
    if (cart._id.equals(req.body.id)) cart.number = cart.number + 1;
  });
  response.markModified("carts");
  await response.save();
};

exports.decrease_product = async (req, res) => {
  let response = await cartModel.findOne({ userId: req.user._id });
  response.carts.forEach(cart => {
    if (cart._id.equals(req.body.id)) cart.number = cart.number - 1;
  });
  response.markModified("carts");
  await response.save();
};
