import React, { createContext, useEffect, useState } from 'react';
import { ConnectionCategories } from './ConnectionsPlay';
import axios from "axios";
import { Helmet } from 'react-helmet';

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
            <Helmet>
                <title>Connections</title>
                <meta property="title" content="Connections" />
                <meta property="og:title" content="Connections" />
                {/* <meta property="og:image" content={image} /> */}
            </Helmet>
            {children}
        </ConnectionsContext.Provider>
    );
};
