import React, { createContext } from 'react';
import { ConnectionCategories } from './utils';

type ConnectionsContextType = {
    NYTConnections: ConnectionCategories[];
};

export const ConnectionsContext = createContext<ConnectionsContextType>({
    NYTConnections: [],
});

export type ConnectionsProviderProps = {
    children: React.ReactNode;
};
