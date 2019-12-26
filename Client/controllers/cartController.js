var cartModel = require("../models/cartModel");

exports.cart_list = async (req, res) => {
  console.log(req.user._id);
  const { carts } = await cartModel.findOne({
    userId: req.user._id
  });

  let sum = 0;
  carts.forEach(cart => (sum = sum + cart.price));

  res.render("cartPage", {
    title: "Black Hole",
    user: req.user,
    condition: false,
    sum,
    carts
  });
};
