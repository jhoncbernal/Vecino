const BaseService = require('./base.service')
let _billRepository = null;

class BillService extends BaseService {
    constructor({ BillRepository}) {
        super(BillRepository);
        _billRepository = BillRepository;
    }
    async getBillsByUser(userId){
        return await _billRepository.getBillsByUser(userId);
    }
    async getBillsByProvider(providerId){
        return await _billRepository.getBillsByProvider(providerId);
    }
    async getBillByProperty(propName, value){
        return await await _billRepository.getBillByProperty(propName, value);
    }

}
module.exports = BillService;