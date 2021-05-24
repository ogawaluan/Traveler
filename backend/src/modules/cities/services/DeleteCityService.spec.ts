import FakeCitiesRepository from "../repositories/fakes/FakeCitiesRepository";
import DeleteCityService from "./DeleteCityService";

let fakeCitiesRepository: FakeCitiesRepository;
let deleteCityService: DeleteCityService;

describe('DeleteCityService', () => {
  beforeEach(() => {
    fakeCitiesRepository = new FakeCitiesRepository();
    deleteCityService = new DeleteCityService(
      fakeCitiesRepository
    );
  });

  it('should be able to delete a city', () => {})
});