const BaseRepository = require('./base.repository')
let _bill;
class BillRepository extends BaseRepository {
    constructor({ Bill }) {
        super(Bill);
        _bill = Bill;
    }
    async getBillsByUser(userId){
        return await _bill.find({'user':userId});
    }
    async getBillsByProvider(providerId){
        return await _bill.find({'provider':providerId});
    }
    async getBillByProperty(propName, value){
        return await await _bill.findOne({ [propName]: value });
    }
    
}
module.exports = BillRepository;