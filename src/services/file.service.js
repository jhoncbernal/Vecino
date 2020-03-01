const BaseService = require('./base.service')
let _filerepository= null;

class FileService {
    constructor({ FileRepository }) {
        _filerepository = FileRepository;
    }
   async uploadFileCSV(portfolioFile){
       return await _filerepository.uploadFileCSV(portfolioFile);
   }
}
module.exports = FileService;