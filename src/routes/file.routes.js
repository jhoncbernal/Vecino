const { Router } = require("express");
const { AuthMiddleware } = require("../middlewares");
module.exports = function ({ FileController }) {
  const router = Router();
  router.get("/:documentId", FileController.getUserByDocumentId);
  router.delete("/:Id", FileController.delete);
  router.post("", AuthMiddleware, FileController.uploadFilePortfolioUsers);
  router.post("/FileUsers/", FileController.uploadFileUsers);
  router.post(
    "/images/upload",
    FileController.uploadFileImage
  );
  router.delete("/images/delete/:KeyId", FileController.deleteFileImage);
  return router;
};
