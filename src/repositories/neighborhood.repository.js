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
async getNeighborhoodByNeighborhoodname(neighborhoodname){
    return await _neighborhood.findOne({neighborhoodname});
}
}
module.exports=NeighborhoodRepository;