import { List } from '../entities/list.entity';

export interface ListGatewayInterface {
  create(list: List): Promise<List>;
  find(): Promise<Array<List>>;
  findOne(id: number): Promise<List>;
}
