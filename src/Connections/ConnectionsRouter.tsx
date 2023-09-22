import { useLocation, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import {
  ConnectionCategories, decodeCategories, isDebug, normalizeCategories, toInt, validateCategories,
} from './utils';
import ConnectionsPlay from './ConnectionsPlay';
import { ConnectionsContext } from './ConnectionsContext';
import LoadingSpinner from './Loading';

function ConnectionsRouter() {
  const location = useLocation();
  const { nytConnections, loadedConnections } = useContext(ConnectionsContext);
  const searchParams = new URLSearchParams(location.search);

  let categories: ConnectionCategories = [];
  const urlCategories = decodeCategories(searchParams.get('categories'));
  if (urlCategories) {
    categories = urlCategories;
  } else if (searchParams.has('id')) {
    if (!loadedConnections) {
      return <LoadingSpinner />;
    }
    const id = toInt(searchParams.get('id')!)!;
    categories = nytConnections[id - 1];
  } else if (location.state?.categories && validateCategories(location.state.categories)) {
    categories = location.state.categories;
  } else if (isDebug()) {
    categories = [
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
    ];
  }

  if (!categories || categories.length === 0) {
    return <Navigate to="/connections" />;
  }

  const startingCategories = normalizeCategories(categories, true);
  return <ConnectionsPlay categories={startingCategories} debug={isDebug()} />;
}

export default ConnectionsRouter;
