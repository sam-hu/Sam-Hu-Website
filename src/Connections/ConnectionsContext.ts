import React, { createContext } from 'react';
import { ConnectionsGame } from './utils';

type ConnectionsContextType = {
  getGame: (id: number) => Promise<ConnectionsGame>;
};

export const ConnectionsContext = createContext<ConnectionsContextType>({
  getGame: async () => Promise.resolve({ categories: [] }),
});

export type ConnectionsProviderProps = {
  children: React.ReactNode;
};
