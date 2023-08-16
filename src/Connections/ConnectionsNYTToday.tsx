import { useContext } from "react";
import { ConnectionsContext } from "./ConnectionsContext";
import { FIRST_DAY, daysBetween } from "./utils";
import ConnectionsPlay from "./ConnectionsPlay";
import LoadingSpinner from "./Loading";

const ConnectionsNYTToday = () => {
    const { NYTConnections } = useContext(ConnectionsContext);

    const todayOffset = daysBetween(new Date(), FIRST_DAY);
    const categories = NYTConnections[todayOffset];

    if (NYTConnections.length === 0) {
        return <LoadingSpinner />
    }

    return <ConnectionsPlay categories={categories} backTo="archive" />;
};

export default ConnectionsNYTToday;
