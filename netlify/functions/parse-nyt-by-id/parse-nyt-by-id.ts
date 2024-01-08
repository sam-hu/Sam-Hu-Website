/* eslint-disable import/prefer-default-export */
import { Handler } from '@netlify/functions';
import axios from 'axios';
import moment from 'moment';
import {
  ConnectionsGame, getDateByOffset, toInt,
} from '../../../src/Connections/utils';
import { ParseGame } from '../../shared';

export const handler: Handler = async (event) => {
  try {
    const payload = event.body;
    if (!payload) {
      return {
        statusCode: 400,
        body: 'No body provided',
      };
    }

    const game = await GetAndParseGame(toInt(payload)!);
    return {
      statusCode: 200,
      body: JSON.stringify(game),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return {
      statusCode: 500,
      body: e.message,
    };
  }
};

const GetAndParseGame = async (id: number): Promise<ConnectionsGame> => {
  const date = getDateByOffset(id - 1);
  const formattedDate = moment(date).format('YYYY-MM-DD');
  const response = await axios.get(`https://www.nytimes.com/svc/connections/v1/${formattedDate}.json`);
  return ParseGame(response.data);
};
