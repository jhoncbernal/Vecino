import BaseService from "./base.service.js";
class PetService extends BaseService {
  constructor({ PetRepository }) {
    super(PetRepository);
    this.repository = PetRepository;
  }
}

export default PetService;
