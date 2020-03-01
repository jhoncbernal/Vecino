const BaseService = require('./base.service')
let _filerepository= null;

class FileService {
    constructor({ FileRepository }) {
        _filerepository = FileRepository;
    }
   async uploadFileCSV(portfoliodata){
       return await _filerepository.uploadFileCSV(portfoliodata);
   }
}
module.exports = FileService;