import { useLocation, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import {
  ConnectionsGame, decodeCategories, isDebug, normalizeCategories, toInt, validateCategories,
} from './utils';
import ConnectionsPlay from './ConnectionsPlay';
import { ConnectionsContext } from './ConnectionsContext';
import LoadingSpinner from './Loading';

function ConnectionsRouter() {
  const location = useLocation();
  const { nytConnections, loadedConnections } = useContext(ConnectionsContext);
  const searchParams = new URLSearchParams(location.search);

  let game: ConnectionsGame = { categories: [] };
  const urlGame = decodeCategories(searchParams.get('categories'));
  if (urlGame) {
    game = urlGame;
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

  game.categories = normalizeCategories(game.categories, true);
  return <ConnectionsPlay game={game} debug={isDebug()} />;
}

export default ConnectionsRouter;
