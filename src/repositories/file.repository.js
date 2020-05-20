//const csv = require("fast-csv");
const BaseRepository = require("./base.repository");
const XLSX = require("xlsx");
let _file;
class FileRepository extends BaseRepository {
  constructor({ File }) {
    super(File);
    _file = File;
  }
  
  async uploadFilePortfolioUsers(portfoliodata) {
    var wb = XLSX.read(portfoliodata, { type: "buffer" });
    //var csvdata = XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]], { header: 0 });
    return await new Promise((resolve, reject) => {
      let jsonxlsx = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
        header: 0,
      });
      _file.deleteMany({'total':{$exists:true}}, function (err) {
        if (err) reject(err);
        _file.insertMany(jsonxlsx).then((result) => {
          resolve(
            result.length + " portfolios have been successfully uploaded."
          );
        });
      });
    });
  }

  async uploadFileUsers(usersData) {
    var wb = XLSX.read(usersData, { type: "buffer" });
    //var csvdata = XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[0]], { header: 0 });
    return await new Promise((resolve, reject) => {
      let jsonxlsx = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
        header: 0,
      });
      _file.deleteMany({'Apartamento':{$exists:true}}, function (err) {
        if (err) reject(err);
        _file.insertMany(jsonxlsx).then((result) => {
          resolve(
            result.length + " portfolios have been successfully uploaded."
          );
        });
      });
    });
  }
  async getUserByDocumentId(documentId) {
    return await _file.findOne({ 'Identification':documentId });
  }
}

module.exports = FileRepository;
