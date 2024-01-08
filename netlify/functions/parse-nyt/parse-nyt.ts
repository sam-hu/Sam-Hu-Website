/* eslint-disable import/prefer-default-export */
import { Handler } from '@netlify/functions';
import axios from 'axios';
import { ConnectionsGame } from '../../../src/Connections/utils';
import { NYTPuzzle, ParseGame } from '../../shared';

export const handler: Handler = async () => {
  try {
    const games = await GetAndParseGames();
    return {
      statusCode: 200,
      body: JSON.stringify(games),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return {
      statusCode: 500,
      body: e.message,
    };
  }
};

const GetAndParseGames = async (): Promise<ConnectionsGame[]> => {
  const response = await axios.get('https://www.nytimes.com/games-assets/connections/game-data-by-day.json');
  return response.data.map((game: NYTPuzzle) => ParseGame(game));
};
