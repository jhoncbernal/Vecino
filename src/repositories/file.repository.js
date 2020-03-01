
const csv = require('fast-csv');
const XLSX = require('xlsx');
let _file = null;
class FileRepository {
    constructor({ File }) {
        _file = File;
    }
    async uploadFileCSV(portfoliodata) {
        try {
            var wb = XLSX.read(portfoliodata, {type:'buffer'});
            /* generate array of json */
           // data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header:1});
            //console.log(data);
            var csvdata = XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]], {header:0});
            return await new Promise((resolve, reject) => {
                var portfolios = [];
                csv
                    .parseString(csvdata, {
                        headers: true,
                        ignoreEmpty: true
                    })
                    .on('error', error => reject(error))
                    .on("data", function (data) {
                        portfolios.push(data);
                    })
                    .on("end", function () {
                        _file.deleteMany({}, function(err){ if (err) reject(handleError(err)); 
                            _file.create(portfolios, function (err, documents) {if (err) reject(handleError(err));
                                resolve(portfolios.length + ' portfolios have been successfully uploaded.');
                             });
                             });
                        

                        
                    });
            });
        } catch (err) { throw err }
    }
}

module.exports = FileRepository;