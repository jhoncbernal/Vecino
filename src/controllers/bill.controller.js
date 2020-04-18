let _billService,
  _productService = null;
class BillController {
  constructor({ BillService, ProductService }) {
    _billService = BillService;
    _productService = ProductService;
  }

  async get(req, res) {
    const { billId } = req.params;
    await _billService
      .get(billId)
      .then((bill) => {
        if (!bill) {
          return res.status(404).send({
            message: "bill not found with id " + req.params.billId,
          });
        }
        res.send(bill);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "bill not found with id " + req.params.billId,
          });
        }
        return res.status(error.status).send({
          message: "Error retrieving bill with id " + req.params.billId,
        });
      });
  }

  async getAll(req, res) {
    const { id: userId } = req.user;
    const bills = await _billService.getBillsByProvider(userId);
    bills = await _billService.getBillsByUser(userId);
    return res.send(bills);
  }

  async update(req, res) {
    const { body } = req;
    const { billId } = req.params;
    _billService
      .update(billId, body)
      .then((bill) => {
        if (!bill) {
          return res.status(404).send({
            message: "bill not found with id " + req.params.billId,
          });
        }
        res.send(bill);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "bill not found with id " + req.params.billId,
          });
        }
        return res.status(error.status).send({
          message: "Error updating bill with id " + req.params.billId,
        });
      });
  }

  async delete(req, res) {
    const { billId } = req.params;
    await _billService
      .delete(billId)
      .then((bill) => {
        if (!bill) {
          return res.status(404).send({
            message: "bill not found with id " + req.params.billId,
          });
        }
        res.send({ message: "bill deleted successfully!" });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: "bill not found with id " + req.params.billId,
          });
        }
        return res.status(error.status).send({
          message: "Could not delete bill with id " + req.params.billId,
        });
      });
  }

  async create(req, res) {
    let { body } = req;
    const { id: userId } = req.user;
    body.user = userId;

    let shopingCart = await _productService.getProductsTotalPrice(
      body.products
    );

    if (shopingCart !== {}) {
      body.products = shopingCart.products;

      body.subTotal = shopingCart.total;
      body.Total = shopingCart.total + body.valueDelivery;
      if (body.cashValue) {
        body.change = body.cashValue - body.Total;
      }

      const bill = await _billService.create(body);
      return res.send(bill);
    }
  }
  async getBillsByProvider(req, res) {
    const { id: providerId } = req.user;
    const bills = await _billService.getBillsByProvider(providerId);
    return res.send(bills);
  }
  async getBillsByUser(req, res) {
    const { id: userId } = req.user;
    const bills = await _billService.getBillsByUser(userId);
    return res.send(bills);
  }
}

module.exports = BillController;
