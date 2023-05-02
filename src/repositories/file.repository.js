//const csv = require("fast-csv");
const createError = require("../utils/createError");
import BaseRepository from "./base.repository.js";
const XLSX = require("xlsx");
let _file;
class FileRepository extends BaseRepository {
  constructor({ File }) {
    super(File);
    _file = File;
  }

  async uploadFilePortfolioUsers(portfoliodata) {
    const wb = XLSX.read(portfoliodata, { type: "buffer" });
    const sheet = wb.Sheets[wb.SheetNames[0]];

    const expectedColumns = [
      "codigo",
      "nombre",
      "_1_30",
      "_31_60",
      "_61_90",
      "_mas_90",
      "total",
      "juridico",
    ];

    if (!this.validateXlsxSchema(sheet, expectedColumns)) {
      createError(400, "El archivo no tiene el formato correcto");
    }

    const jsonxlsx = XLSX.utils.sheet_to_json(sheet, {
      header: 0,
    });

    try {
      await _file.deleteMany({ total: { $exists: true } });
      const result = await _file.insertMany(jsonxlsx);
      return `${result.length} portfolios have been successfully uploaded.`;
    } catch (err) {
      throw new Error(
        "Error occurred while uploading portfolios: " + err.message
      );
    }
  }

  async uploadFileUsers(usersData) {
    try {
      const wb = XLSX.read(usersData, { type: "buffer" });
      const sheet = wb.Sheets[wb.SheetNames[0]];

      const expectedColumns = [
        "Torre",
        "Apartamento",
        "Correo",
        "Telefono",
        "Nombres",
        "Apellidos",
        "Propietario",
        "Identificacion",
      ];

      if (!this.validateXlsxSchema(sheet, expectedColumns)) {
        createError(400, "El archivo no tiene el formato correcto");
      }

      const jsonxlsx = XLSX.utils.sheet_to_json(sheet, {
        header: 0,
      });

      await _file.deleteMany({ Apartamento: { $exists: true } });
      const result = await _file.insertMany(jsonxlsx);

      return result;
    } catch (err) {
      throw err;
    }
  }

  async getUserByDocumentId(documentId) {
    return await _file.findOne({ Identificacion: documentId });
  }

  async deleteByDocumentId(documentId) {
    return await _file.deleteOne({ Identificacion: documentId });
  }

  validateXlsxSchema(sheet, expectedColumns) {
    const firstRow = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      raw: false,
    })[0];
    if (firstRow.length !== expectedColumns.length) {
      return false;
    }
    for (let i = 0; i < expectedColumns.length; i++) {
      if (firstRow[i] !== expectedColumns[i]) {
        return false;
      }
    }
    return true;
  }
}

module.exports = FileRepository;
