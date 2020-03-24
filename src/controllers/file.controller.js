const json2csv = require('json2csv');
const path = require('path');
let _fileService, _userService,_neighborhoodService = null;
class FileController {
    constructor({ FileService, UserService,NeighborhoodService }) {
        _fileService = FileService;
        _userService = UserService;
        _neighborhoodService=NeighborhoodService;
    }

    async uploadFileCSV(req, res) {
        try {
            const{id:userId}=req.user;
            const neighborhood = await _neighborhoodService.get(userId);
            if (!req.files) {
                return res.status(400).send('No files were uploaded.');
            }
            const result = await _fileService.uploadFileCSV(req.files.file.data).catch((err) => { throw err });
            if (result) {
            await _userService.updateUserPoints('neighborhoodcode', neighborhood.neighborhoodcode).catch((err) => { throw err });
               return res.status(200).send('Updated');
            }


        } catch (e) { 
            res.status(500).send({ "ErrorMessage": e.message });
        } 
    }
    
    
}
module.exports = FileController