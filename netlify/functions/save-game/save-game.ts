/* eslint-disable import/prefer-default-export */
import { Handler } from '@netlify/functions';
import { humanId } from 'human-id';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../firestore/firestore';

export const handler: Handler = async (event) => {
  try {
    const payload = event.body;
    if (!payload) {
      return {
        statusCode: 400,
        body: 'No body provided',
      };
    }

    const requestBody = JSON.parse(payload);
    const id = humanId({ separator: '-', capitalize: false });
    await setDoc(doc(db, 'games', id), requestBody);
    return {
      statusCode: 200,
      body: id,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return {
      statusCode: 500,
      body: e.message,
    };
  }
};
