var mongoose = require("mongoose");
const BaseRepository = require("./base.repository");
let _product;
class ProductRepository extends BaseRepository {
  constructor({ Product }) {
    super(Product);
    _product = Product;
  }
  async getProductsByProvider(providerId) {
    return await _product.findOne({ provider: providerId });
  }
  async getProductByProperty(propName, value) {
    return await _product.findOne({ [propName]: value });
  }
  async getProductsTotalPrice(products) {
    let productsObj = null;
    try {
      productsObj = JSON.parse(products);
    } catch (e) {
      console.error("getProductsTotalPrice handleError", e);
    }
    if (!productsObj) {
      productsObj = products;
    }
    let total=0;
    let salvings = 0;
    let productsArray = Object.keys(productsObj).map(function (product) {
      return mongoose.Types.ObjectId(product);
    });
    return await _product
      .aggregate([
        {
          $match: {
            _id: { $in: productsArray },
          },
        },
        {
          $project: {
            _id: 1,
            urlImage: 1,
            productName: 1,
            measureType: 1,
            price: {
              $cond: {
                if: {
                  $and: [
                    { $toBool: "$promotionPrice" },
                    {
                      $lte: [
                        { $toDate: Date.now() },
                        { $toDate: "$promotionExpires" },
                      ],
                    },
                  ],
                },
                then: "$promotionPrice",
                else: "$price",
              },
            },
            salving: {
              $cond: {
                if: {
                  $and: [
                    { $toBool: "$promotionPrice" },
                    {
                      $lte: [
                        { $toDate: Date.now() },
                        { $toDate: "$promotionExpires" },
                      ],
                    },
                  ],
                },
                then: { $subtract: ["$price", "$promotionPrice"] },
                else: 0,
              },
            },
          },
        },
      ])
      .then((newProductsArray) => {
        products = newProductsArray.map(function (product) {
          total = product.price * productsObj[product._id] + total;
          product.salving = productsObj[product._id] * product.salving;
          salvings =  product.salving + salvings;
          product.quantity = productsObj[product._id];
          return product;
        });
        return { products, ...{salvings:salvings, total: total } };
      })
      .catch((err) => {
        throw err;
      });
  }
}
module.exports = ProductRepository;
