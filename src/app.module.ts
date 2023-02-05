import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListModel } from './lists/entities/list.model';
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [
    ListsModule,
    EventEmitterModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: ':memory:',
      autoLoadModels: true,
      models: [ListModel],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
