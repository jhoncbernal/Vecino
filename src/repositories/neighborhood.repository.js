const BaseRepository=require('./base.repository')
let _neighborhood=null;
class NeighborhoodRepository extends BaseRepository{
constructor({Neighborhood}){
    super(Neighborhood);
    _neighborhood=Neighborhood;
}
async getNeighborhoodByNeighborhoodcode(neighborhoodcode){
    return await _neighborhood.findOne({neighborhoodcode});
}
async getNeighborhoodByUsername(username){
    return await _neighborhood.findOne({username});
}
async getNeighborhoodByProperty(propName, value) {
    return await _neighborhood.findOne({[propName]: value });
}
async recover(propName, value) {
    try {
        return await _neighborhood.findOne({ [propName]: value })
    } catch (error) {
        const err = new Error();
        err.status = 500;
        err.message = error.message;
        throw err;
    }
}
async reset(token) {
    return await _neighborhood.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })

}

async resetPassword(token) {
    return await _neighborhood.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
}

async verifyEmail(body) {
    try {
        return await _neighborhood.findOne({ email: body.email });

    } catch (error) {
        const err = new Error();
        err.status = 500;
        err.message = error.message;
        throw err;
    }
}

async verify(token) {
    return await _neighborhood.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
}
}
module.exports=NeighborhoodRepository;