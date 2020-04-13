const BaseService = require('./base.service')
let _productRepository = null;

class ProductService extends BaseService {
    constructor({ ProductRepository}) {
        super(ProductRepository);
        _productRepository = ProductRepository;
    }
    async getProductsByProvider(providerId){
        return await _productRepository.getProductsByProvider(providerId);
    }
    async getProductByProperty(propName, value){
        return await await _productRepository.getProductByProperty(propName, value);
    }

}
module.exports = ProductService;