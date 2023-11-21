/* eslint-disable import/prefer-default-export */
import { Handler } from '@netlify/functions';
import { doc, getDoc } from 'firebase/firestore';
import { db, gamesCollection } from '../../shared/firestore';

export const handler: Handler = async (event) => {
  try {
    const id = event.queryStringParameters?.id;
    if (!id) {
      return {
        statusCode: 400,
        body: 'No id provided',
      };
    }

    const resp = await getDoc(doc(db, gamesCollection(), id));
    const game = JSON.stringify(resp.data());
    return {
      statusCode: 200,
      body: game,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return {
      statusCode: 500,
      body: e.message,
    };
  }
};
