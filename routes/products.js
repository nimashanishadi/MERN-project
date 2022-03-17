const express = require("express");
const Products = require("../models/products");

const router = express.Router();

//save Products
router.post("/product/save", (req, res) => {
  let newProduct = new Products(req.body);

  newProduct.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Product saved successfuly",
    });
  });
});

//get products
router.get("/products", (req, res) => {
  Products.find().exec((err, products) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingProducts: products,
    });
  });
});

//update products
router.put("/product/update/:id", (req, res) => {
  Products.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, product) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      return res.status(200).json({
        success: "Updated Successfully",
      });
    }
  );
});

//delete product
router.delete("/product/delete/:id", (req, res) => {
  Products.findByIdAndRemove(req.params.id).exec((err, deleteProduct) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });

    return res.json({
      message: "Delete Successfully",
      deleteProduct,
    });
  });
});

//get specific product
router.get("/product/:id", (req, res) => {
  let productId = req.params.id;

  Products.findById(productId, (err, product) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  });
});

module.exports = router;
