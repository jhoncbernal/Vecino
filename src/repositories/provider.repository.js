const BaseRepository = require('./base.repository')
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
    async getAllProviderNames(pageSize, pageNum) {
        const skips = pageSize * (pageNum - 1);
        return await _provider.find({}, { 'firstName': 1, 'uniquecode': 1, 'category': 1 })
            .skip(skips)
            .limit(pageSize);
    }
    async recover(propName, value) {
        try {
            return await _provider.findOne({ [propName]: value })
        } catch (error) {
            const err = new Error();
            err.status = 500;
            err.message = error.message;
            throw err;
        }
    }


    async reset(token) {
        return await _provider.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })

    }

    async resetPassword(token) {
        return await _provider.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    }

    async verifyEmail(body) {
        try {
            return await _provider.findOne({ email: body.email });

        } catch (error) {
            const err = new Error();
            err.status = 500;
            err.message = error.message;
            throw err;
        }
    }

    async verify(token) {
        return await _provider.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    }
}
module.exports = ProviderRepository;