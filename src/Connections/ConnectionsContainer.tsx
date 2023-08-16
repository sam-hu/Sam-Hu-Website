import { useLocation, Navigate } from 'react-router-dom';
import { ConnectionCategories, decodeCategories, validateCategories } from "./utils";
import ConnectionsGame from './ConnectionsPlay';

const ConnectionsContainer = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    let categories: ConnectionCategories = [];
    const urlCategories = decodeCategories(searchParams.get('categories'));
    let debug;
    if (urlCategories) {
        categories = urlCategories;
    } else if (location.state?.categories && validateCategories(location.state.categories)) {
        categories = location.state.categories;
    } else if (searchParams.has('debug')) {
        debug = true;
        categories = [
            {
                description: "Test Description 1",
                id: 1,
                words: ["a", "ew", "yaw", "goop"]
            },
            {
                description: "Test Description 2",
                id: 2,
                words: ["Lodge", "Tithed", "awesome", "Hardware"]
            },
            {
                description: "Test Description 3",
                id: 3,
                words: ["beautiful", "beneficial", "adjudicator", "jeopardizing"]
            },
            {
                description: "Test Description 4",
                id: 4,
                words: ["jabberwockies", "abdominoplasty", "objectification", "hieroglyphically"]
            }
        ];
    } else {
        return <Navigate to="/connections" />;
    }

    return <ConnectionsGame categories={categories} debug={debug} />;
};

export default ConnectionsContainer;
