import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { List } from './entities/list.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List)
    private listModel: typeof List,
  ) {}

  async create({ name }: CreateListDto) {
    const data = await this.listModel.create({ name });

    return data;
  }

  async findAll() {
    return await this.listModel.findAll();
  }

  async findOne(id: number) {
    const list = await this.listModel.findByPk(id);

    if (!list) {
      throw new Error('List not found.');
    }

    return list;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
