const bindMethods = require("../../utils/bindMethods");
class BaseController {
  constructor(service) {
    this.service = service;
    bindMethods(this);
  }

  async get(req, res) {
    try {
      const id = req.params.id;
      const user = await this.service.getById(id);
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const pageNumber = parseInt(req.query.pageNumber) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const users = await this.service.getAll(pageNumber, pageSize);
      return res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await this.service.deleteById(id);
      return res.json({ message: " deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const userData = req.body;
      const saved = await this.service.create(userData);
      return res.status(201).json(saved);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Invalid Request" });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      await this.service.updateById(id, updatedData);
      return res.json({ message: " updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: error.message });
    }
  }
}
module.exports = BaseController;
