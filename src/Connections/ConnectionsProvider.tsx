import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { ConnectionsProviderProps, ConnectionsContext } from './ConnectionsContext';
import { ConnectionCategories } from './utils';
import './connections.scss';

function ConnectionsProvider({ children }: ConnectionsProviderProps) {
  const [nytConnections, setNytConnections] = useState<ConnectionCategories[]>([]);
  const [loadedConnections, setLoadedConnections] = useState(false);

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
        <meta property="title" content="Connections" />
        <meta property="og:title" content="Connections" />
        <meta property="og:image" content={`${window.location.origin}/Connections.png`} />
        <link rel="icon" type="image/svg" href={`${window.location.origin}/Connections.svg`} />
      </Helmet>
      {children}
    </ConnectionsContext.Provider>
  );
}

export default ConnectionsProvider;
