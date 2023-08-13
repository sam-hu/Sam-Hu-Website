import { Handler } from '@netlify/functions';
import axios from 'axios';
import { ConnectionCategories } from '../../../src/ConnectionsPlay';

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


export const GetAndParseNYTConnections = async (): Promise<ConnectionCategories[]> => {
  try {
    const response = await axios.get('https://www.nytimes.com/games/prototype/connections/dist/index.78dfee00.js');
    const text = await response.data;
    return ParseNYTConnections(text);
  } catch (e) {
    console.error(e);
    return [];
  }
}

const ParseNYTConnections = (text: string): ConnectionCategories[] => {
  const regex = /var x=(\[.*?\]);/s;
  const match = text.match(regex);

  if (match && match[1]) {
    const jsonData = eval(match[1]);
    const parsedData: ConnectionCategories[] = [];

    for (const item of jsonData) {
      const connections: ConnectionCategories = [];

      for (const groupName in item.groups) {
        const group = item.groups[groupName];
        const connection = {
          description: groupName,
          id: group.level,
          words: group.members,
        };

        connections.push(connection);
      }

      parsedData.push(connections);
    }

    return parsedData
  }

  return [];
}
