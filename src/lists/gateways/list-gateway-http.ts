import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { List } from '../entities/list.entity';
import { ListGatewayInterface } from './list-gateway-interface';

@Injectable()
export class ListGatewayHttp implements ListGatewayInterface {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService,
  ) {}

  public async create(list: List): Promise<List> {
    await lastValueFrom(this.httpService.post('lists', { name: list.name }));

    return list;
  }

  public async find(): Promise<List[]> {
    const { data } = await lastValueFrom(this.httpService.get('lists'));

    return data.map((item) => new List(item.name, item.id));
  }

  public async findOne(id: number): Promise<List> {
    const { data } = await lastValueFrom(this.httpService.get(`lists/${id}`));

    return new List(data.name, data.id);
  }
}
