
const csv = require('fast-csv');
let _file = null;
class FileRepository {
    constructor({ File }) {
        _file = File;
    }
    async uploadFileCSV(authorFile) {
        try {
            return await new Promise((resolve, reject) => {
                var portfolios = [];
                csv
                    .parseString(authorFile.data.toString(), {
                        headers: true,
                        ignoreEmpty: true
                    })
                    .on('error', error => reject(error))
                    .on("data", function (data) {
                        portfolios.push(data);
                    })
                    .on("end", function () {
                        _file.create(portfolios, function (err, documents) {
                            if (err) reject(err);
                        });

                        resolve(portfolios.length + ' portfolios have been successfully uploaded.');
                    });
            });
        } catch (err) { throw err }
    }
}

module.exports = FileRepository;