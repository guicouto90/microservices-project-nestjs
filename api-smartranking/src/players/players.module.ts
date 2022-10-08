import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PlayersController } from './players.controller';
import { playersProvider } from './players.provider';
import { PlayersService } from './players.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PlayersController],
  providers: [PlayersService, ...playersProvider],
})
export class PlayersModule {}
