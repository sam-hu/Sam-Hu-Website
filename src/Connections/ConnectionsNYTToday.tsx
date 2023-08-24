import { useContext } from "react";
import { ConnectionsContext } from "./ConnectionsContext";
import { getTodayOffset, normalizeCategories } from "./utils";
import ConnectionsPlay from "./ConnectionsPlay";
import LoadingSpinner from "./Loading";

const ConnectionsNYTToday = () => {
    const { nytConnections, loadedConnections } = useContext(ConnectionsContext);

    const categories = nytConnections[getTodayOffset()];

    if (!loadedConnections) {
        return <LoadingSpinner />
    }

    const startingCategories = normalizeCategories(categories, true);
    return <ConnectionsPlay categories={startingCategories} backTo="archive" />;
};

export default ConnectionsNYTToday;
