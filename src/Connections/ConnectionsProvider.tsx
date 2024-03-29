import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { ConnectionsProviderProps, ConnectionsContext } from './ConnectionsContext';
import { ConnectionsGame } from './utils';
import './connections.scss';

function ConnectionsProvider({ children }: ConnectionsProviderProps) {
  const [nytConnections, setNytConnections] = useState<ConnectionsGame[]>([]);
  const [loadedConnections, setLoadedConnections] = useState(false);

  useEffect(() => {
    document.title = 'Connections';
    const faviconLink = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    faviconLink.type = 'image/svg+xml';
    faviconLink.href = '/Connections.svg';
  }, []);

  useEffect(() => {
    if (loadedConnections) {
      return;
    }

    axios.get('/.netlify/functions/parse-nyt')
      .then((response) => {
        const connections = response.data as ConnectionsGame[];
        setNytConnections(connections);
      })
      .finally(() => { setLoadedConnections(true); });
  }, [loadedConnections]);

  const getGame = async (id: number): Promise<ConnectionsGame> => {
    if (id <= nytConnections.length) {
      return nytConnections[id - 1];
    }

    return (await axios.post('/.netlify/functions/parse-nyt-by-id', id)).data;
  };

  const connectionsValue = useMemo(() => ({ getGame }), [nytConnections, loadedConnections]);

  return (
    <ConnectionsContext.Provider value={connectionsValue}>
      <Helmet>
        <title>Connections</title>
        <link rel="icon" type="image/svg+xml" href="/Connections.svg" />
        <meta property="og:title" content="Connections" />
        <meta property="og:url" content="https://sam-hu.com/connections" />
        <meta property="og:image" content="/Connections.png" />
      </Helmet>
      {children}
    </ConnectionsContext.Provider>
  );
}

export default ConnectionsProvider;
