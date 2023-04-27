const { Router } = require("express");

module.exports = function ({ WorkerController }) {
  const router = Router();

  router.get("/:workerId", WorkerController.get);
  router.get("", WorkerController.getAll);
  //router.get("/user/:userId", WorkerController.getUserWorkers);
  router.post("", WorkerController.create);
  router.patch("/:workerId", WorkerController.update);
  router.delete("/:workerId", WorkerController.delete);

  return router;
}