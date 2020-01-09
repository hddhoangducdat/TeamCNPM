var productModel = require("../models/productModel");

exports.one_seller_product = async (req, res) => {
  const carts = await productModel.find({ sellerId: req.params.id });
  res.render("productPage", {
    title: "TeamCNPM",
    user: {
      name: req.user.username,
      image: req.user.image,
      type: req.user.type === "admin" ? true : false,
      params: true
    },
    carts
  });
};

exports.seller_product = async (req, res) => {
  const carts =
    req.user.type === "admin"
      ? await productModel.find()
      : await productModel.find({ sellerId: req.user._id });
  const type = req.user.type === "admin" ? true : false;
  console.log(type);
  res.render("productPage", {
    title: "TeamCNPM",
    user: {
      name: req.user.username,
      image: req.user.image,
      type
    },
    carts
  });
};

exports.one_product = async (req, res) => {
  const carts = await productModel.findById(req.params.id);
  res.render("productModify", {
    title: "TeamCNPM",
    user: {
      name: req.user.username,
      image: req.user.image,
      type: req.user.type === "admin" ? true : false
    },
    product: carts
  });
};

exports.change_product = async (req, res) => {
  let product = await productModel.findById(req.params.id);
  product.name = req.body.product_name;
  product.price = req.body.product_price;
  product.description = req.body.product_description;
  product.quantity = req.body.product_quantity;
  product.category = req.body.product_categories;
  product.createdBy = req.body.product_createdBy;
  if (req.file) {
    product.images = "http://localhost:3001/" + "uploads/" + req.file.filename;
  }

  await product.save();
  res.redirect(`/management/product`);
};

exports.show_form_upload_product = async (req, res) => {
  res.render("productUpload", {
    title: "TeamCNPM",
    user: {
      name: req.user.username,
      image: req.user.image,
      type: req.user.type === "admin" ? true : false
    }
  });
};

exports.upload_product = async (req, res) => {
  let productName;
  switch (req.body.product_categories) {
    case "fashion":
      productName = "Thời trang";
      break;
    case "sport":
      productName = "Thể thao";
      break;
    case "electronic":
      productName = "Điện tử";
      break;
    case "lifestyle":
      productName = "Nhà cửa - đời sống";
      break;
    case "toolkit":
      productName = "Phụ kiện - thiết bị số";
      break;
    case "transport":
      productName = "Phương tiện";
      break;
    case "book":
      productName = "Sách";
      break;
    case "food":
      productName = "Thực phẩm";
      break;
    default:
      break;
  }
  var product = new productModel({
    name: req.body.product_name,
    price: req.body.product_price,
    description: req.body.product_description,
    quantity: req.body.product_quantity,
    category: req.body.product_categories,
    createdBy: req.user.username,
    sellerId: req.user._id,
    productName,
    sold: 0,
    images: req.file
      ? "http://localhost:3001/" + "uploads/" + req.file.filename
      : ""
  });
  await product.save();
  res.redirect("/management/product");
};

exports.add_carousel = async (req, res) => {
  let product = await productModel.findById(req.body.id);
  product.carousel = product.carousel === "red" ? "" : "red";

  await product.save();
};

exports.delete_product = async (req, res) => {
  let product = await productModel.findByIdAndDelete(req.body.id);
  await product.save();
};

exports.product_category = async (req, res) => {
  const carts =
    req.user.type === "admin"
      ? await productModel.find({ category: req.params.category })
      : await productModel.find({
          sellerId: req.user._id,
          category: req.params.category
        });
  const type = req.user.type === "admin" ? true : false;
  console.log(type);
  res.render("productPage", {
    title: "TeamCNPM",
    user: {
      name: req.user.username,
      image: req.user.image,
      params: true,
      type
    },
    carts
  });
};
