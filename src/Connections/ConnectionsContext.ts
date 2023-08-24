import React, { createContext } from 'react';
import { ConnectionCategories } from './utils';

type ConnectionsContextType = {
    nytConnections: ConnectionCategories[];
    loadedConnections: boolean;
};

export const ConnectionsContext = createContext<ConnectionsContextType>({
    nytConnections: [],
    loadedConnections: false,
});

export type ConnectionsProviderProps = {
    children: React.ReactNode;
};
