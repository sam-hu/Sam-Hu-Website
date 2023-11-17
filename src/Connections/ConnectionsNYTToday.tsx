import { useContext } from 'react';
import { ConnectionsContext } from './ConnectionsContext';
import { getTodayOffset, normalizeGame } from './utils';
import ConnectionsPlay from './ConnectionsPlay';
import LoadingSpinner from './Loading';

function ConnectionsNYTToday() {
  const { nytConnections, loadedConnections } = useContext(ConnectionsContext);

  const game = nytConnections[getTodayOffset()];

  if (!loadedConnections) {
    return <LoadingSpinner />;
  }

  return <ConnectionsPlay game={normalizeGame(game, true)} backTo="archive" />;
}

export default ConnectionsNYTToday;
