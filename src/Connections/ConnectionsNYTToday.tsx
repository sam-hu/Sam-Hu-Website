import { useContext } from "react";
import { ConnectionsContext } from "./ConnectionsContext";
import { getTodayOffset } from "./utils";
import ConnectionsPlay from "./ConnectionsPlay";
import LoadingSpinner from "./Loading";

const ConnectionsNYTToday = () => {
    const { NYTConnections, LoadedConnections } = useContext(ConnectionsContext);

    const categories = NYTConnections[getTodayOffset()];

    if (!LoadedConnections) {
        return <LoadingSpinner />
    }

    return <ConnectionsPlay categories={categories} backTo="archive" />;
};

export default ConnectionsNYTToday;
