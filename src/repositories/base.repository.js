const uuid = require("uuid");
class BaseRepository {
  constructor(model) {
    this.model = model;
  }
  async get(id) {
    const fieldName = uuid.validate(id) ? "uuid" : "_id";

    return await this.model.find({ [fieldName]: id });
  }
  async getAll(propName, value, pageSize = 5, pageNum = 1, orderBy = "_id") {
    const skips = pageSize * (pageNum - 1);
    return await this.model
      .find({ [propName]: value })
      .sort(-orderBy)
      .skip(skips)
      .limit(pageSize);
  }
  async create(entity) {
    return await this.model.create(entity);
  }
  async update(id, entity) {
    const fieldName = uuid.validate(id) ? "uuid" : "_id";

    return await this.model.updateOne({ [fieldName]: id }, entity, {
      new: true,
    });
  }
  async delete(id) {
    const fieldName = uuid.validate(id) ? "uuid" : "_id";

    return await this.model.findOneAndDelete({ [fieldName]: id });
  }
}
module.exports = BaseRepository;
