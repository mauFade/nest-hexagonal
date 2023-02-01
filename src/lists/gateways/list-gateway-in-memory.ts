import { List } from '../entities/list.entity';
import { ListGatewayInterface } from './list-gateway-interface';

export class ListGatewayInMemory implements ListGatewayInterface {
  public items: Array<List> = [];

  public async create(list: List): Promise<List> {
    list.id = this.items.length + 1;

    this.items.push(list);

    return list;
  }

  public async find(): Promise<List[]> {
    return this.items;
  }

  public async findOne(id: number): Promise<List> {
    return this.items.filter((item) => item.id === id)[0];
  }
}
