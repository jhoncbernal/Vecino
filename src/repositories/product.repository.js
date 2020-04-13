const BaseRepository = require('./base.repository')
let _product;
class ProductRepository extends BaseRepository {
    constructor({ Product }) {
        super(Product);
        _product = Product;
    }
    async getProductsByProvider(providerId){
        return await _product.findOne({'provider':providerId});
    }
    async getProductByProperty(propName, value){
        return await await _product.findOne({ [propName]: value });
    }
    
}
module.exports = ProductRepository;