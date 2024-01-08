/* eslint-disable import/prefer-default-export */
import { Handler } from '@netlify/functions';
import axios from 'axios';
import { ConnectionsGame } from '../../../src/Connections/utils';
import { NYTPuzzles, ParseGame } from '../../shared';

export const handler: Handler = async () => {
  try {
    const connections = await GetAndParseNYTConnections();
    return {
      statusCode: 200,
      body: JSON.stringify(connections),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return {
      statusCode: 500,
      body: e.message,
    };
  }
};

const GetAndParseNYTConnections = async (): Promise<ConnectionsGame[]> => {
  const response = await axios.get('https://www.nytimes.com/games-assets/connections/game-data-by-day.json');
  return ParseNYTConnections(response.data);
};

const ParseNYTConnections = (nytData: NYTPuzzles): ConnectionsGame[] => nytData.map((game) => ParseGame(game));
