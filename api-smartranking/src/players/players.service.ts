import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePlayer } from './dtos/player.dto';
import { Player } from './utils/types';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @Inject('PLAYER_MODEL')
    private readonly playerModel: Model<Player>,
  ) {}
  private readonly logger = new Logger(PlayersService.name);
  private players: Player[] = [];

  async createUpdatePlayer(body: CreatePlayer): Promise<void> {
    this.logger.log(`create player Dto: ${body}`);
    const player = await this.getPlayerByEmail(body.email);
    if (player) {
      this.update(player, body);
      await this.playerModel.findOneAndUpdate({ email: player.email }, body);
    } else {
      this.create(body);
      await this.playerModel.create({
        phoneNumber: body.phoneNumber,
        email: body.email,
        name: body.name,
        ranking: 'A',
        rankingPosition: 10,
        photoUrl: 'http://localhost:3000/test',
      });
    }
  }

  async getPlayerByEmail(email: string): Promise<Player | undefined> {
    const player = this.players.find((player) => email === player.email);
    return player;
  }

  async deleteByEmail(email: string): Promise<void> {
    const player = await this.getPlayerByEmail(email);
    const index = this.players.indexOf(player);
    this.players.splice(index, 1);
  }

  async getPlayers(): Promise<Player[]> {
    return this.players;
  }

  private create(body: CreatePlayer): void {
    this.players.push({
      _id: uuidv4(),
      phoneNumber: body.phoneNumber,
      email: body.email,
      name: body.name,
      ranking: '123',
      rankingPosition: 10,
      photoUrl: 'http://localhost:3000/test',
    });
  }

  private update(player: Player, body: CreatePlayer): void {
    player.email = body.email;
    player.name = body.name;
    player.phoneNumber = body.phoneNumber;
  }
}
