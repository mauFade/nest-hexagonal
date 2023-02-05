import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ListModel } from './entities/list.model';
import { HttpModule } from '@nestjs/axios';
import { ListGatewaySequelize } from './gateways/list-gateway-sequelize';
import { ListGatewayHttp } from './gateways/list-gateway-http';
import { CreateListInCRMListener } from './listeners/create-list-in-crm.listener';

@Module({
  imports: [
    SequelizeModule.forFeature([ListModel]),
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    ListGatewaySequelize,
    ListGatewayHttp,
    CreateListInCRMListener,
    { provide: 'ListPersistenceGateway', useExisting: ListGatewaySequelize },
    { provide: 'ListIntegrationGateway', useExisting: ListGatewayHttp },
  ],
})
export class ListsModule {}
