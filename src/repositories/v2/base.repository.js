const handleMongoError = require("../../utils/mongoErrorHandler.util");
class BaseRepository {
  constructor(model) {
    this.model = model;
  }
  // Get a single model by ID
  async getById(modelId) {
    try {
      const model = await this.model.findById(modelId);
      return model;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  // Get all models with pagination
  async getAll(pageNumber, pageSize) {
    try {
      const models = await this.model.find()
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .exec();
      return models;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  // Delete a single model by ID
  async deleteById(modelId) {
    try {
      const result = await this.model.deleteOne({ _id: modelId });
      return result.deletedCount;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  // Delete multiple models that match a condition
  async deletesByCondition(condition) {
    try {
      const result = await this.model.deleteMany(condition);
      return result.deletedCount;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  // Create a single model
  async create(modelData) {
    try {
      const result = new (modelData);
      const saved = await result.save();
      return saved;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  // Create multiple models
  async creates(modelsData) {
    try {
      const result = await this.model.insertMany(modelsData);
      return result;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  // Update a single model by ID
  async updateById(modelId, updatedData) {
    try {
      const result = await this.model.updateOne({ _id: modelId }, updatedData);
      return result.nModified;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }

  // Update multiple models that match a condition
  async updateByCondition(condition, updatedData) {
    try {
      const result = await this.model.updateMany(condition, updatedData);
      return result.nModified;
    } catch (error) {
      console.error(error);
      throw handleMongoError(error);
    }
  }
}
module.exports = BaseRepository;
