import { Injectable } from '@nestjs/common';
import { ListCreatedEvent } from '../events/list-created.event';
import { ListGatewayInterface } from '../gateways/list-gateway-interface';

@Injectable()
export class CreateListInCRMListener {
  constructor(private listIntegrationGateway: ListGatewayInterface) {}

  public async handle(event: ListCreatedEvent) {
    this.listIntegrationGateway.create(event.list);
  }
}
