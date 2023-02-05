import { Inject, Injectable } from '@nestjs/common';
import EventEmitter from 'events';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';
import { ListCreatedEvent } from './events/list-created.event';
import { ListGatewayInterface } from './gateways/list-gateway-interface';

@Injectable()
export class ListsService {
  constructor(
    @Inject('ListPersistenceGateway')
    private listPersistenceGateway: ListGatewayInterface,
    private eventEmitter: EventEmitter,
  ) {}

  public async create({ name }: CreateListDto) {
    const list = new List(name);

    await this.listPersistenceGateway.create(list);
    // Emite o evento
    this.eventEmitter.emit('list.created', new ListCreatedEvent(list));

    return list;
  }

  public async findAll() {
    return await this.listPersistenceGateway.find();
  }

  public async findOne(id: number) {
    const list = await this.listPersistenceGateway.findOne(id);

    if (!list) {
      throw new Error('List not found.');
    }

    return list;
  }
}
