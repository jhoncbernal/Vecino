const { sendEmail } = require("../helpers");
let _billService,
  _productService,
  _providerService = null;
class BillController {
  constructor({ BillService, ProductService, ProviderService }) {
    _billService = BillService;
    _productService = ProductService;
    _providerService = ProviderService;
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
        return res.status(error.status ? error.status : 500).send({
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
        return res.status(error.status ? error.status : 500).send({
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
        return res.status(error.status ? error.status : 500).send({
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
    let updateProducts = await _productService.updateProductsQuantity(
      body.products
    );
    const provider = await _providerService.getProviderByProperty(
      "_id",
      body.provider
    );
    if (shopingCart !== {} && provider) {
      body.products = shopingCart.products;
      body.deliveryCharge = provider.deliveryCharge;
      body.subTotal = shopingCart.total;
      body.Total = body.subTotal + body.deliveryCharge + body.tip;
      body.billType = provider.billType;

      if (body.flagExtraCharge) {
        body.deliveryExtraCharge = provider.deliveryExtraCharge;
        body.Total = body.Total + body.deliveryExtraCharge;
      }

      if (body.cashValue) {
        body.change = body.cashValue - body.Total;
      }
      body.states = [
        {
          start: new Date().toLocaleString("en-US", {
            timeZone: "America/Bogota",
          }),
          state: "start",
        },
      ];
      body.code = Math.floor(Math.random() * 16777215)
        .toString(16)
        .toUpperCase();

      const bill = await _billService.create(body);
      try{
        await sendEmail(provider.email, `Nuevo pedido programado para ${bill.DeliverySchedule} #${bill.code}` , "", "../public/pages/newDeliver.html")
      }catch(e){
        console.log(e)
      }
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
