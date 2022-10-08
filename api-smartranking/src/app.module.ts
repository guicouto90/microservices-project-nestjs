import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [PlayersModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
