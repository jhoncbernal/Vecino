const BaseRepository = require('./base.repository')
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
        return await this.model
            .find({$query:{ [propName]: value } })
            .sort('points')
            .skip(skips)
            .limit(pageSize);
}
}
module.exports = UserRepository;