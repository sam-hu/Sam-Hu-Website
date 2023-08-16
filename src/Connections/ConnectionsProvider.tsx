import { useEffect, useState } from 'react';
import axios from "axios";
import { Helmet } from 'react-helmet';
import { ConnectionsProviderProps, ConnectionsContext } from './ConnectionsContext';
import { ConnectionCategories } from './utils';
import './connections.scss';

const ConnectionsProvider = ({ children }: ConnectionsProviderProps) => {
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
            .finally(() => { setLoaded(true); });
    }, [loaded]);

    return (
        <ConnectionsContext.Provider value={{ NYTConnections: connections }}>
            <Helmet>
                <title>Connections</title>
                <meta property="title" content="Connections" />
                <meta property="og:title" content="Connections" />
                <meta property="og:image" content={`${window.location.origin}/Connections.png`} />
                <link rel="icon" type="image/svg" href={`${window.location.origin}/Connections.svg`} />
            </Helmet>
            {children}
        </ConnectionsContext.Provider>
    );
};

export default ConnectionsProvider;
