let _productService=null;
class ProductController{
constructor({ProductService}) {
    _productService=ProductService;
}

async get(req,res){
    const{productId}=req.params;
     await _productService.get(productId).then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving product with id " + req.params.productId
        });
    });
}

async getAll(req,res){
    const {providerId,pageSize,pageNum}=req.query;
    const products = await _productService.getAll('provider',providerId,pageSize,pageNum);
    return res.send(products);
}

async update(req,res){
    const{body}=req;
    const{productId}=req.params;
    _productService.update(productId,body).then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error updating product with id " + req.params.productId
        });
    });
 
}

async delete(req,res){
    const{productId}=req.params;
    await _productService.delete(productId).then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });
        }
        res.send({message: "product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });
}
async getProductsTotalPrice(req,res){
    const {productsIds}=req.query;
    await _productService.getProductsTotalPrice(productsIds).then(product => {
        if(!product) {
            return res.status(404).send({
                message: "products not found with ids " + productsIds
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "products not found with body " + productsIds
            });                
        }
        return res.status(500).send({
            message: err
        });
    });
}


async create(req,res){
    const {body}=req;
    const{id:userId}=req.user;
    body.provider=userId;
    const productExist= await _productService.getProductByProperty('productName',body.productName);
    if (productExist) {
        if(body.provider===productExist.provider){
        const error = new Error();
        error.status = 409;
        error.message = "product already exist";
        throw error;
    }
    }
    const product= await _productService.create(body);
    return res.send(product);
}


}
module.exports=ProductController