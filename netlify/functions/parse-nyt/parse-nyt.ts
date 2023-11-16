/* eslint-disable import/prefer-default-export */
import { Handler } from '@netlify/functions';
import axios from 'axios';
import { ConnectionsGame, ConnectionCategory } from '../../../src/Connections/utils';

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

type NYTGroup = {
  level: 0 | 1 | 2 | 3;
  members: string[];
};

type NYTPuzzle = {
  groups: { [groupName: string]: NYTGroup; };
  startingGroups: string[][];
};

type NYTPuzzlesData = NYTPuzzle[];

const ParseNYTConnections = (nytData: NYTPuzzlesData): ConnectionsGame[] => {
  const parsedConnections: ConnectionsGame[] = [];

  for (const item of nytData) {
    const connectionGame: ConnectionsGame = { categories: [] };
    for (const groupName in item.groups) {
      const group = item.groups[groupName];
      const category: ConnectionCategory = {
        description: groupName,
        id: group.level,
        words: group.members,
      };
      connectionGame.categories.push(category);
    }
    parsedConnections.push({ categories: connectionGame.categories.sort((a, b) => a.id - b.id) });
  }

  return parsedConnections;
};
