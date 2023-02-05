import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ListCreatedEvent } from '../events/list-created.event';
import { ListGatewayInterface } from '../gateways/list-gateway-interface';

@Injectable()
export class CreateListInCRMListener {
  constructor(private listIntegrationGateway: ListGatewayInterface) {}

  @OnEvent('list.created')
  public async handle(event: ListCreatedEvent) {
    this.listIntegrationGateway.create(event.list);
  }
}
