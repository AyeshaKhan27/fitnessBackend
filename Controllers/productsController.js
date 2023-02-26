const db = require("../models");

const Product = db.product;

// 1. add user

const addProduct = async (req, res) => {
   
    let info = {
        category: req.body.category,
        title: req.body.title,
        brand: req.body.brand,
        description: req.body.description,
        price: req.body.price,
    }

    const product = await Product.create(info)
    res.status(200).send(product)
    console.log(product)
};

const getAllproduct = async (req, res) => {
  let product = await Product.findAll({});
  res.status(200).send(product);
};


// 4. update user

const updateProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateproductdata = await Product.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    res.status(201).send(updateproductdata);
  } catch (e) {
    res.status(400).send(e);
  }
};

// 5. delete user

const deleteProduct = async (req, res) => {
  try {
    const deletedata = await Product.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(400).send();
    } else {
      res.status(201).send(deletedata);
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  addProduct,
  getAllproduct,
  updateProduct,
  deleteProduct
};
