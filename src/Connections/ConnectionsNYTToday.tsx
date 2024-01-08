import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ConnectionsContext } from './ConnectionsContext';
import { ConnectionsGame, getTodayOffset, normalizeGame } from './utils';
import ConnectionsPlay from './ConnectionsPlay';
import LoadingSpinner from './Loading';

function ConnectionsNYTToday() {
  const location = useLocation();
  const { getGame } = useContext(ConnectionsContext);
  const [game, setGame] = useState<ConnectionsGame | null>(null);
  const backTo = location.state?.backTo || 'archive';

  useEffect(() => {
    if (game) {
      return;
    }

    const id = getTodayOffset() + 1;
    getGame(id).then((connectionsGame) => {
      setGame(connectionsGame);
    });
  }, [game]);

  if (!game) {
    return <LoadingSpinner />;
  }

  return <ConnectionsPlay game={normalizeGame(game, true)} backTo={backTo} />;
}

export default ConnectionsNYTToday;
