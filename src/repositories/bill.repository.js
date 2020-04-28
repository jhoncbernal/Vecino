const BaseRepository = require('./base.repository')
let _bill;
class BillRepository extends BaseRepository {
    constructor({ Bill }) {
        super(Bill);
        _bill = Bill;
    }
    async getBillsByUser(userId){
        return await _bill.find({'user':userId}).sort({'enabled':-1,'updatedAt':-1});
    }
    async getBillsByProvider(providerId){
        return await _bill.find({'provider':providerId}).sort({'enabled':-1,'updatedAt':-1});
    }
    async getBillByProperty(propName, value){
        return await await _bill.findOne({ [propName]: value });
    }
    
}
module.exports = BillRepository;