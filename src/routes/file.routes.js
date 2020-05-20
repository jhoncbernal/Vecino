const { Router } = require("express");

const { AuthMiddlewareAdmin } = require("../middlewares");
module.exports = function ({ FileController }) {
  const router = Router();
  router.get("/:documentId", FileController.getUserByDocumentId);
  router.delete("/:Id", FileController.delete);
  router.post("", AuthMiddlewareAdmin, FileController.uploadFilePortfolioUsers);
  router.post("/FileUsers/", FileController.uploadFileUsers);
  router.post(
    "/images/upload",
    AuthMiddlewareAdmin,
    FileController.uploadFileImage
  );
  router.delete("/images/delete/:KeyId", FileController.deleteFileImage);
  return router;
};
