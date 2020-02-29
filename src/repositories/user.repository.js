const BaseRepository = require('./base.repository');

let _user = null;
class UserRepository extends BaseRepository {
    constructor({ User }) {
        super(User);
        _user = User;
    }
    async getUserByUsername(username) {
        return await _user.findOne({ username });
    }
    async getUsersByPoints(propName, value, pageSize = 5, pageNum = 1, ) {
        const skips = pageSize * (pageNum - 1);
        return await _user
            .find({ $query: { [propName]: value } })
            .sort('points')
            .skip(skips)
            .limit(pageSize);
    }
    async getUserByProperty(propName, value) {
        return await _user.findOne({[propName]: value });
    }
    async recover(body) {
        try {
            return await _user.findOne({ email: body.email })
        } catch (error) {
            const err = new Error();
            err.status = 500;
            err.message = error.message;
            throw err;
        }
    }
    async reset(token) {
        return await _user.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })

    }

    async resetPassword(token) {
        return await _user.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    }

    async verifyEmail(body) {
        try {
            return await _user.findOne({ email: body.email });

        } catch (error) {
            const err = new Error();
            err.status = 500;
            err.message = error.message;
            throw err;
        }
    }

    async verify(token) {
        return await _user.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    }

}


module.exports = UserRepository;