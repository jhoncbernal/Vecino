const BaseRepository = require("./base.repository");
let _provider = null;
class ProviderRepository extends BaseRepository {
  constructor({ Provider }) {
    super(Provider);
    _provider = Provider;
  }
  async getProviderByuniquecode(uniquecode) {
    return await _provider.findOne({ uniquecode });
  }
  async getProviderByUsername(username) {
    return await _provider.findOne({ username });
  }
  async getProviderByProperty(propName, value) {
    return await _provider.findOne({ [propName]: value });
  }
  async getAllProviderNames(city,pageSize, pageNum) {
    const skips = pageSize * (pageNum - 1);
    return await _provider
      .find({city:city}, { firstName: 1, uniquecode: 1, category: 1 ,deliveryCharge:1,deliveryExtraCharge:1,schedule:1,billType:1,urlImage:1,paymentMethod:1,promoBanner:1})
      .skip(skips)
      .limit(pageSize);
  }
  async getAllCities(pageSize, pageNum) {
    const skips = pageSize * (pageNum - 1);
    return await _provider
      .find()
      .skip(skips)
      .limit(pageSize)
      .distinct("city");
  }
  
  async recover(propName, value) {
    return await _provider.findOne({ [propName]: value });
  }

  async reset(token) {
    return await _provider.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  }

  async resetPassword(token) {
    return await _provider.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  }

  async verifyEmail(body) {
    return await _provider.findOne({ email: body.email });
  }

  async verify(token) {
    return await _provider.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
  }
}
module.exports = ProviderRepository;
