var historyModel = require("../models/historyModel");
var productModel = require("../models/productModel");

exports.show_bill = async (req, res) => {
  let response = await historyModel.find();
  const result = response.map(r => {
    let condition1, condition2, condition3, condition4;
    condition4 = false;
    let sum = 0;
    r.bill.forEach(cart => (sum = sum + parseInt(cart.price) * cart.number));
    switch (r.history) {
      case "findItem":
        condition1 = "active";
        break;
      case "shipping":
        condition2 = "active";
        break;
      case "cancle":
        condition4 = true;
        break;
      default:
        condition3 = "active";
        break;
    }
    return {
      _id: r._id,
      bill: r.bill,
      condition1,
      condition2,
      condition3,
      condition4,
      sum
    };
  });
  res.render("shoppingPage", {
    title: "Black Hole Admin",
    user: {
      name: req.user.username,
      image: req.user.image,
      type: req.user.type === "admin" ? true : false
    },
    history: result
  });
};

exports.cancle_bill = async (req, res) => {
  let bill = await historyModel.findById(req.body.id);
  bill.history = "cancle";
  await bill.save();
  res.redirect("../shopping");
};

exports.find_item = async (req, res) => {
  let bill = await historyModel.findById(req.body.id);
  bill.history = "findItem";
  await bill.save();
};

exports.shipping_item = async (req, res) => {
  res.redirect("../shopping");
  let bill = await historyModel.findById(req.body.id);
  bill.history = "shipping";
  await bill.save();
};

const increase_sold_product = async (id, number) => {
  let product = await productModel.findById(id);
  product.sold += number;
  product.quantity -= number;
  await product.save();
};

exports.finish_item = async (req, res) => {
  let bill = await historyModel.findById(req.body.id);
  bill.bill.forEach(cart => increase_sold_product(cart._id, cart.number));
  bill.history = "finish";
  await bill.save();
};
