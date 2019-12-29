var productModel = require("../models/productModel");

exports.seller_product = async (req, res) => {
  const carts =
    req.user.type === "admin"
      ? await productModel.find()
      : await productModel.find({ sellerId: req.user._id });

  res.render("productPage", {
    title: "Black Hole Admin",
    user: {
      name: req.user.lastName,
      image:
        "https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/54799897_104992787344972_2706694677771321344_n.jpg?_nc_cat=107&_nc_oc=AQnC1K3OPfHj6wc3kzI_ojtRjG04EFPj1IbHojkuFXc5MG7eKUUv4sM38kEHIMarQX0&_nc_ht=scontent.fsgn1-1.fna&oh=a7fc0a694ea731bfece6af0ecc6d6135&oe=5E19E9CC",
      type: req.user.type === "admin" ? true : false
    },
    carts
  });
};

exports.one_product = async (req, res) => {
  const carts = await productModel.findById(req.params.id);
  res.render("productModify", {
    title: "Black Hole Admin",
    user: {
      name: "Hoàng Đức Đạt",
      image:
        "https://scontent.fsgn1-1.fna.fbcdn.net/v/t1.0-9/54799897_104992787344972_2706694677771321344_n.jpg?_nc_cat=107&_nc_oc=AQnC1K3OPfHj6wc3kzI_ojtRjG04EFPj1IbHojkuFXc5MG7eKUUv4sM38kEHIMarQX0&_nc_ht=scontent.fsgn1-1.fna&oh=a7fc0a694ea731bfece6af0ecc6d6135&oe=5E19E9CC",
      type: req.user.type === "admin" ? true : false
    },
    product: carts
  });
};
