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
  async updateProductsQuantity(products) {
    let productsObj = null;
    if (!productsObj) {
      productsObj = products;
    }

    return await Promise.all(
      Object.keys(productsObj).map(async function (product) {
        let quantity = products[product];
        return await _product
          .findOneAndUpdate(
            {
              _id: mongoose.Types.ObjectId(product),
            },{ $inc: { totalAmount: -quantity }},{new:true}
          )
          .then((result) => {
            return result;
          })
          .catch((e) => {
            return e;
          });
      })
    );
  }
  async getProductsTotalPrice(products) {
    let productsObj = null;
    try {
      productsObj = JSON.parse(products);
    } catch (e) {
      console.error("getProductsTotalPrice handleError");
    }
    if (!productsObj && !products) {
      return { products: [], salvings: 0, total: 0 };
    }

    if (!productsObj) {
      productsObj = products;
    }
    let total = 0;
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
            totalAmount: 1,
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
          product.quantity =
            product.totalAmount >= productsObj[product._id]
              ? productsObj[product._id]
              : product.totalAmount;
          product.salving = product.quantity * product.salving;
          total = product.price * product.quantity + total;
          salvings = product.salving + salvings;
          return product;
        });
        return { products, ...{ salvings: salvings, total: total } };
      })
      .catch((err) => {
        throw err;
      });
  }
}
module.exports = ProductRepository;
