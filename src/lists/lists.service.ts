import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';
import { ListGatewayInterface } from './gateways/list-gateway-interface';

@Injectable()
export class ListsService {
  constructor(
    private listGateway: ListGatewayInterface,
    private httpService: HttpService,
  ) {}

  public async create({ name }: CreateListDto) {
    const list = new List(name);

    const data = await this.listGateway.create(list);

    await lastValueFrom(
      this.httpService.post('lists', {
        name: data.name,
      }),
    );

    return data;
  }

  public async findAll() {
    return await this.listGateway.find();
  }

  public async findOne(id: number) {
    const list = await this.listGateway.findOne(id);

    if (!list) {
      throw new Error('List not found.');
    }

    return list;
  }
}
