import { useLocation, Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import {
  ConnectionsGame, decodeCategories, isDebug, loadGame, normalizeGame, toInt, validateCategories,
} from './utils';
import ConnectionsPlay from './ConnectionsPlay';
import { ConnectionsContext } from './ConnectionsContext';
import LoadingSpinner from './Loading';

function ConnectionsRouter() {
  const location = useLocation();
  const { nytConnections, loadedConnections } = useContext(ConnectionsContext);
  const searchParams = new URLSearchParams(location.search);

  const gameId = searchParams.get('game');
  const shouldLoadSavedGame = gameId?.split('-').length === 3;
  const [savedGame, setSavedGame] = useState<ConnectionsGame | null>(null);
  const [loadingSavedGame, setLoadingSavedGame] = useState(shouldLoadSavedGame);

  const urlGame = decodeCategories(searchParams.get('categories') || gameId);

  useEffect(() => {
    if (!loadingSavedGame || !gameId) {
      return;
    }

    loadGame(gameId)
      .then((game) => {
        if (game) {
          setSavedGame(game);
        }
      })
      .finally(() => setLoadingSavedGame(false));
  }, [loadingSavedGame, gameId]);

  let game: ConnectionsGame = { categories: [] };

  if (urlGame) {
    game = urlGame;
  } else if (shouldLoadSavedGame) {
    if (loadingSavedGame) {
      return <LoadingSpinner />;
    }
    game = savedGame!;
  } else if (searchParams.has('id')) {
    if (!loadedConnections) {
      return <LoadingSpinner />;
    }
    const id = toInt(searchParams.get('id')!)!;
    game = nytConnections[id - 1];
  } else if (location.state?.game && validateCategories(location.state.game.categories)) {
    game = location.state.game;
  } else if (isDebug()) {
    game = {
      categories: [
        {
          description: 'Test Description 1',
          id: 1,
          words: ['a', 'ew', 'yaw', 'goop'],
        },
        {
          description: 'Test Description 2',
          id: 2,
          words: ['Lodge', 'Tithed', 'awesome', 'Hardware'],
        },
        {
          description: 'Test Description 3',
          id: 3,
          words: ['beautiful', 'beneficial', 'adjudicator', 'jeopardizing'],
        },
        {
          description: 'Test Description 4',
          id: 4,
          words: ['jabberwockies', 'abdominoplasty', 'objectification', 'hieroglyphically'],
        },
      ],
    };
  }

  if (!game || game.categories.length === 0) {
    return <Navigate to="/connections" />;
  }

  return <ConnectionsPlay game={normalizeGame(game, true)} debug={isDebug()} />;
}

export default ConnectionsRouter;
