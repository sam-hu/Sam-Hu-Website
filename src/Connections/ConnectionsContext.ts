import React, { createContext } from 'react';
import { ConnectionCategories } from './utils';

type ConnectionsContextType = {
    NYTConnections: ConnectionCategories[];
    LoadedConnections: boolean;
};

export const ConnectionsContext = createContext<ConnectionsContextType>({
    NYTConnections: [],
    LoadedConnections: false,
});

export type ConnectionsProviderProps = {
    children: React.ReactNode;
};
