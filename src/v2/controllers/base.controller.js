import bindMethods from "../../utils/bindMethods.js";
class BaseController {
  constructor(service) {
    this.service = service;
    bindMethods(this);
  }

  async get(req, res) {
    try {
      const id = req.params.id;
      const user = await this.service.getById(id);
      return res.send(user);
    } catch (error) {
      console.error(error);
      return res.status(error?.statusCode||404).send({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const pageNumber = parseInt(req.query.pageNumber) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const users = await this.service.getAll(pageNumber, pageSize, req.ability);
      return res.send(users);
    } catch (error) {
      console.error(error);
      return res.status(error?.statusCode||500).send({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await this.service.deleteById(id);
      return res.send({ message: " deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(error?.statusCode||404).send({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const userData = req.body;
      const saved = await this.service.create(userData);
      return res.status(error?.statusCode||201).send(saved);
    } catch (error) {
      console.error(error);
      return res.status(error?.statusCode||400).send({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      await this.service.updateById(id, updatedData);
      return res.send({ message: " updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(error?.statusCode||404).send({ message: error.message });
    }
  }
}
export default BaseController;
