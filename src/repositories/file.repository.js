
const csv = require('fast-csv');
const XLSX = require('xlsx');
let _file;
class FileRepository {
    constructor({ File }) {
        _file = File;
    }
    async uploadFileCSV(portfoliodata) {
        try {
            var wb = XLSX.read(portfoliodata, { type: 'buffer' });
            //var csvdata = XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]], { header: 0 });
            return await new Promise((resolve, reject) => {
                let jsonxlsx = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 0 })
                _file.deleteMany({}, function (err) {
                    if (err) reject((err));
                    _file.insertMany(jsonxlsx).then((result) => {
                        resolve(result.length + ' portfolios have been successfully uploaded.');
                    });
                });
            });
        } catch (err) { throw err }
    }
}

module.exports = FileRepository;