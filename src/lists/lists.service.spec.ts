import { of } from 'rxjs';
import { ListGatewayInMemory } from './gateways/list-gateway-in-memory';
import { ListsService } from './lists.service';

const mockHttpService = {
  post: jest.fn().mockReturnValue(of(null)),
};

describe('ListsService', () => {
  let service: ListsService;
  let listGateway: ListGatewayInMemory;

  beforeEach(() => {
    listGateway = new ListGatewayInMemory();
    service = new ListsService(listGateway, mockHttpService as any);
  });

  it('should resolve', async () => {
    const list = await service.create({ name: 'test' });

    expect(listGateway.items).toEqual([list]);
  });
});
