import React, { createContext, useEffect, useState } from 'react';
import { ConnectionCategories } from './ConnectionsPlay';
import axios from "axios";

type ConnectionsContextType = {
    NYTConnections: ConnectionCategories[];
};

export const ConnectionsContext = createContext<ConnectionsContextType>({
    NYTConnections: [],
});

type ConnectionsProviderProps = {
    children: React.ReactNode;
};

export const ConnectionsProvider = ({ children }: ConnectionsProviderProps) => {
    const [connections, setConnections] = useState<ConnectionCategories[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (loaded) {
            return;
        }

        axios.get("/.netlify/functions/parse-nyt")
            .then((response) => {
                const connections = response.data as ConnectionCategories[];
                setConnections(connections);
            })
            .finally(() => { setLoaded(true) });
    }, [loaded]);

    return (
        <ConnectionsContext.Provider value={{ NYTConnections: connections }}>
            {children}
        </ConnectionsContext.Provider>
    );
};
