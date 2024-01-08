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
  const { getGame } = useContext(ConnectionsContext);
  const searchParams = new URLSearchParams(location.search);

  const savedGameId = searchParams.get('game');
  const shouldLoadSavedGame = savedGameId?.split('-').length === 3;
  const [savedGame, setSavedGame] = useState<ConnectionsGame | null>(null);
  const [loadingSavedGame, setLoadingSavedGame] = useState(shouldLoadSavedGame);

  const shouldLoadNytGame = searchParams.has('id');
  const [nytGame, setNytGame] = useState<ConnectionsGame | null>(null);
  const [loadingNytGame, setLoadingNytGame] = useState(shouldLoadNytGame);

  const urlGame = decodeCategories(searchParams.get('categories') || savedGameId);

  useEffect(() => {
    if (!shouldLoadSavedGame || !loadingSavedGame || savedGame) {
      return;
    }

    loadGame(savedGameId)
      .then((game) => {
        if (game) {
          setSavedGame(game);
        }
      })
      .finally(() => setLoadingSavedGame(false));
  }, [loadingSavedGame, savedGameId]);

  useEffect(() => {
    if (!shouldLoadNytGame || !loadingNytGame || nytGame) {
      return;
    }

    const id = toInt(searchParams.get('id')!)!;
    getGame(id)
      .then((game: ConnectionsGame) => {
        setNytGame(game);
      })
      .finally(() => setLoadingNytGame(false));
  }, [loadingNytGame, nytGame]);

  let game: ConnectionsGame = { categories: [] };

  if (urlGame) {
    game = urlGame;
  } else if (shouldLoadSavedGame) {
    if (loadingSavedGame) {
      return <LoadingSpinner />;
    }
    game = savedGame!;
  } else if (shouldLoadNytGame) {
    if (loadingNytGame) {
      return <LoadingSpinner />;
    }
    game = nytGame!;
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
