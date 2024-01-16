const Product = require('../model/Product');
const fs = require('fs');



module.exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}




module.exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}



module.exports.createProduct = async (req, res) => {
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock

  } = req.body;
  try {

    await Product.create({
      product_name,
      product_detail,
      product_price,
      brand,
      category,
      countInStock,
      product_image: req.product_image
    });

    return res.status(200).json({
      status: 'success',
      message: `successfully created`
    });

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}






module.exports.updateProduct = async (req, res) => {
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock,


  } = req.body;
  try {

    if (req.product_image) {
      await Product.findByIdAndUpdate({ _id: req.params.id }, {
        product_name,
        product_detail,
        product_price,
        brand,
        category,
        countInStock,
        product_image: req.product_image
      });
    } else {
      await Product.findByIdAndUpdate({ _id: req.params.id }, {
        product_name,
        product_detail,
        product_price,
        brand,
        category,
        countInStock,

      });
    }



    return res.status(200).json({
      status: 'success',
      message: `successfully updated`
    });

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}










module.exports.addReview = async (req, res) => {
  const user = req.userId;
  const id = req.params.id;
  const {
    username,
    comment,
    rating,
  } = req.body;
  try {
    const isExist = await Product.findById({ _id: id });

    if (isExist) {
      const isThere = await isExist.reviews.find((rev) => rev.user.toString() === user);
      if (isThere) {
        return res.status(400).json({
          status: 'error',
          message: `you have already reviewed it`
        });
      } else {
        isExist.reviews.push({ username, comment, rating: Number(rating), user });
        const total = isExist.reviews.reduce((a, b) => a + b.rating, 0);

        isExist.rating = total / isExist.reviews.length;

        isExist.numReviews = isExist.reviews.length;

        await isExist.save();
        return res.status(201).json({
          status: 'success',
          message: `review added successfully`
        });

      }


    } else {
      return res.status(404).json({
        status: 'error',
        message: `product doesn't exist`
      });
    }

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}
















module.exports.removeProduct = async (req, res) => {
  const {
    product_image,

  } = req.body;
  try {

    await Product.findByIdAndDelete({ _id: req.params.id });

    fs.unlink(`.${product_image}`, (err) => {

    })

    return res.status(200).json({
      status: 'success',
      message: `successfully created`
    });

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }
}
