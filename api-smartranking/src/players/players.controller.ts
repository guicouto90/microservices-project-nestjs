import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePlayer } from './dtos/player.dto';
import { PlayersService } from './players.service';
import { Player } from './utils/types';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private playerService: PlayersService) {}
  @Post()
  async createUpdatePlayer(@Body() body: CreatePlayer): Promise<string> {
    await this.playerService.createUpdatePlayer(body);
    return 'Player Registered Succesfully';
  }

  @Get()
  async getPlayers(@Query('email') email: string): Promise<Player[] | Player> {
    if (email) {
      const player = await this.playerService.getPlayerByEmail(email);
      if (!player) {
        throw new NotFoundException('Player not found');
      }
      return player;
    }
    return this.playerService.getPlayers();
  }

  @Delete()
  async deletePlayer(@Query('email') email: string): Promise<void> {
    await this.playerService.deleteByEmail(email);
  }
}
