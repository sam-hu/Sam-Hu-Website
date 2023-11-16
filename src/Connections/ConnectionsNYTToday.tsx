import { useContext } from 'react';
import { ConnectionsContext } from './ConnectionsContext';
import { getTodayOffset, normalizeCategories } from './utils';
import ConnectionsPlay from './ConnectionsPlay';
import LoadingSpinner from './Loading';

function ConnectionsNYTToday() {
  const { nytConnections, loadedConnections } = useContext(ConnectionsContext);

  const game = nytConnections[getTodayOffset()];

  if (!loadedConnections) {
    return <LoadingSpinner />;
  }

  game.categories = normalizeCategories(game.categories, true);
  return <ConnectionsPlay game={game} />;
}

export default ConnectionsNYTToday;
