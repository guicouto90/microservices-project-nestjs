import { Connection } from 'mongoose';
import { PlayerSchema } from './schemas/players.schema';

export const playersProvider = [
  {
    provide: 'PLAYER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Players', PlayerSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
