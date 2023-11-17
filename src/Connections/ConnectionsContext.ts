import React, { createContext } from 'react';
import { ConnectionsGame } from './utils';

type ConnectionsContextType = {
  nytConnections: ConnectionsGame[];
  loadedConnections: boolean;
};

export const ConnectionsContext = createContext<ConnectionsContextType>({
  nytConnections: [],
  loadedConnections: false,
});

export type ConnectionsProviderProps = {
  children: React.ReactNode;
};
