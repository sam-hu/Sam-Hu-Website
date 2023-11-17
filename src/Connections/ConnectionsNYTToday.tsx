import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ConnectionsContext } from './ConnectionsContext';
import { getTodayOffset, normalizeGame } from './utils';
import ConnectionsPlay from './ConnectionsPlay';
import LoadingSpinner from './Loading';

function ConnectionsNYTToday() {
  const location = useLocation();
  const { nytConnections, loadedConnections } = useContext(ConnectionsContext);

  const game = nytConnections[getTodayOffset()];
  const backTo = location.state?.backTo || 'archive';

  if (!loadedConnections) {
    return <LoadingSpinner />;
  }

  return <ConnectionsPlay game={normalizeGame(game, true)} backTo={backTo} />;
}

export default ConnectionsNYTToday;
