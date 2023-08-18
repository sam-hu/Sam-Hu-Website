import { Handler } from '@netlify/functions';
import axios from 'axios';
import { ConnectionCategories, ConnectionCategory } from '../../../src/Connections/utils';

export const handler: Handler = async (event, context) => {
  try {
    const connections = await GetAndParseNYTConnections();
    return {
      statusCode: 200,
      body: JSON.stringify(connections),
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e }),
    }
  }
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

export const GetAndParseNYTConnections = async (): Promise<ConnectionCategories[]> => {
  const response = await axios.get('https://www.nytimes.com/games/prototype/connections/dist/index.78dfee00.js');
  const text = await response.data;
  return ParseNYTConnections(text);
}

const ParseNYTConnections = (text: string): ConnectionCategories[] => {
  const regex = /var J=(\[.*?\]);/s;
  const match = text.match(regex);

  if (!(match && match[1])) {
    throw new Error('NYT Connections did not match regex')
  }

  const nytData: NYTPuzzlesData = eval(match[1]);
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
