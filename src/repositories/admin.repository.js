const BaseRepository = require('./base.repository')
let _admin = null;
class AdminRepository extends BaseRepository {
    constructor({ Admin }) {
        super(Admin);
        _admin = Admin;
    }
    async getAdminByneighborhoodcode(neighborhoodcode) {
        return await _admin.findOne({ neighborhoodcode });
    }
    async getAdminByUsername(username) {
        return await _admin.findOne({ username });
    }
    async getAdminByProperty(propName, value) {
        return await _admin.findOne({ [propName]: value });
    }
    async getAllAdminNames(pageSize, pageNum) {
        const skips = pageSize * (pageNum - 1);
        return await _admin.find({}, { 'firstName': 1, 'neighborhoodcode': 1, '_id': 0 })
            .skip(skips)
            .limit(pageSize);
    }
    async recover(propName, value) {
        try {
            return await _admin.findOne({ [propName]: value })
        } catch (error) {
            const err = new Error();
            err.status = 500;
            err.message = error.message;
            throw err;
        }
    }


    async reset(token) {
        return await _admin.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })

    }

    async resetPassword(token) {
        return await _admin.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    }

    async verifyEmail(body) {
        try {
            return await _admin.findOne({ email: body.email });

        } catch (error) {
            const err = new Error();
            err.status = 500;
            err.message = error.message;
            throw err;
        }
    }

    async verify(token) {
        return await _admin.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    }
}
module.exports = AdminRepository;