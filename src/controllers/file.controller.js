const json2csv = require('json2csv');
const path = require('path');
let _fileService, _userService,_neighborhoodService = null;
let neighborhood = null;
class FileController {
    constructor({ FileService, UserService,NeighborhoodService }) {
        _fileService = FileService;
        _userService = UserService;
        _neighborhoodService=NeighborhoodService;
    }

    async uploadFileCSV(req, res) {
        try {

            if (!req.files) {
                return res.status(400).send('No files were uploaded.');
            }
            const result = await _fileService.uploadFileCSV(req.files.file.data).catch((err) => { throw err });
            if (result) {
                const users = await _userService.updateUserPoints('neighborhoodcode', neighborhood.neighborhoodcode).catch((err) => { throw err });
              return  res.sendFile(path.join(__dirname, '/../public/pages/fileupload.html'));
             //  return res.status(200);
            }


        } catch (err) { return res.send(err); }
    }
    async get(req, res) {
        const { id: userId } ={id:"5e5d8865e13634446e9ddc50"};// req.user;
        neighborhood = await _neighborhoodService.get(userId).catch((err) => {
            return res.status(500).send(err);
        });
        res.sendFile(path.join(__dirname, '/../public/pages/fileupload.html'));
    }
    async getExampledata(req, res) {


        var fields = [
            'codigo',
            'concepto contable',
            'nombre',
            '_1_30',
            '_31_60',
            '_61_90',
            '_mas_90',
            'total'
        ];


        let json = [{
            "codigo": "51210",
            "concepto contable": "INTERESES",
            "nombre": "JUAN PABLO PEREZ",
            "_1_30": "0",
            "_61_90": "10000",
            "_mas_90": "20000",
            "total": "20000"
        }, {
            "codigo": "61030",
            "concepto contable": "ADMINISTRACION",
            "nombre": "JORGE CAMILO SUAREZ",
            "_1_30": "0",
            "_61_90": "0",
            "_mas_90": "0",
            "total": "0"
        }, {
            "codigo": "101220",
            "concepto contable": "EXTRA",
            "nombre": "EDUWIN PORRAS",
            "_1_30": "125000",
            "_61_90": "0",
            "_mas_90": "0",
            "total": "0"
        }, {
            "codigo": "9830",
            "concepto contable": "ADMINISTRACION",
            "nombre": "CRISTIAN CARRILLO",
            "_1_30": "0",
            "_61_90": "0",
            "_mas_90": "200000",
            "total": "200000"
        }]
        const csv = json2csv.parse(json, { fields: fields });

        res.set("Content-Disposition", "attachment;filename=portafolio.csv");
        res.set("Content-Type", "application/octet-stream");

        res.send(csv);

    }
}
module.exports = FileController