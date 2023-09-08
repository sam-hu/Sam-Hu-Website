import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { ConnectionsProviderProps, ConnectionsContext } from './ConnectionsContext';
import { ConnectionCategories } from './utils';
import './connections.scss';

const title = 'Connections';
const favicon = '/Connections.svg';

function ConnectionsProvider({ children }: ConnectionsProviderProps) {
  const [nytConnections, setNytConnections] = useState<ConnectionCategories[]>([]);
  const [loadedConnections, setLoadedConnections] = useState(false);

  useEffect(() => {
    document.title = title;
    const faviconLink = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    faviconLink.href = favicon;
  }, []);

  useEffect(() => {
    if (loadedConnections) {
      return;
    }

    axios.get('/.netlify/functions/parse-nyt')
      .then((response) => {
        const connections = response.data as ConnectionCategories[];
        setNytConnections(connections);
      })
      .finally(() => { setLoadedConnections(true); });
  }, [loadedConnections]);

  const connectionsValue = useMemo(() => ({ nytConnections, loadedConnections }), [nytConnections, loadedConnections]);

  return (
    <ConnectionsContext.Provider value={connectionsValue}>
      <Helmet>
        <title>Connections</title>
        <meta property="title" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content="/Connections.png" />
        <link rel="icon" type="image/svg" href={favicon} />
      </Helmet>
      {children}
    </ConnectionsContext.Provider>
  );
}

export default ConnectionsProvider;
