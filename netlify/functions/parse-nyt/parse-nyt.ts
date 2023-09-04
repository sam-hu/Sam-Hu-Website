import { Handler } from '@netlify/functions';
import axios from 'axios';
import { ConnectionCategories, ConnectionCategory } from '../../../src/Connections/utils';

export const handler: Handler = async () => {
  try {
    const connections = await GetAndParseNYTConnections();
    return {
      statusCode: 200,
      body: JSON.stringify(connections),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message,
    }
  }
}

const GetAndParseNYTConnections = async (): Promise<ConnectionCategories[]> => {
  const response = await axios.get('https://www.nytimes.com/games-assets/connections/game-data-by-day.json');
  return ParseNYTConnections(response.data);
}

type NYTGroup = {
  level: 0 | 1 | 2 | 3;
  members: string[];
};

type NYTPuzzle = {
  groups: { [groupName: string]: NYTGroup; };
  startingGroups: string[][];
};

type NYTPuzzlesData = NYTPuzzle[];

const ParseNYTConnections = (nytData: NYTPuzzlesData): ConnectionCategories[] => {
  const parsedConnections: ConnectionCategories[] = [];

  for (const item of nytData) {
    const connectionGame: ConnectionCategories = [];
    for (const groupName in item.groups) {
      const group = item.groups[groupName];
      const category: ConnectionCategory = {
        description: groupName,
        id: group.level,
        words: group.members,
      };
      connectionGame.push(category);
    }
    parsedConnections.push(connectionGame);
  }

  return parsedConnections
}
