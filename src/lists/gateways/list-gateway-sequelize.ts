import { InjectModel } from '@nestjs/sequelize';
import { List } from '../entities/list.entity';
import { ListModel } from '../entities/list.model';
import { ListGatewayInterface } from './list-gateway-interface';

export class ListGatewaySequelize implements ListGatewayInterface {
  constructor(
    @InjectModel(ListModel)
    private listModel: typeof ListModel,
  ) {}

  public async create(list: List): Promise<List> {
    const data = await this.listModel.create(list);

    list.id = data.id;

    return list;
  }

  public async find(): Promise<List[]> {
    const data = await this.listModel.findAll();

    return data.map((item) => new List(item.name, item.id));
  }

  public async findOne(id: number): Promise<List> {
    const list = await this.listModel.findByPk(id);

    if (!list) {
      throw new Error('List not found.');
    }

    return new List(list.name, list.id);
  }
}
