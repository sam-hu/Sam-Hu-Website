import { useContext } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { ConnectionsContext } from "./ConnectionsContext";
import { BookOutlined, CheckCircleFilled, HourglassOutlined } from '@ant-design/icons';
import { ConnectionsMenu } from "./ConnectionsMenu";
import { getDateString, getPuzzleStates, getTodayOffset, isSolved } from "./utils";
import LoadingSpinner from "./Loading";
import PlayTodayButton from "./PlayTodayButton";

const ConnectionsNYTArchive = () => {
    const { nytConnections, loadedConnections } = useContext(ConnectionsContext)
    const navigate = useNavigate();
    const today = getTodayOffset();
    const puzzleStates = getPuzzleStates();

    const progressIcon = (id: number) => {
        const puzzleState = puzzleStates[id];
        if (puzzleState && puzzleState.guesses && puzzleState.guesses.length > 0) {
            if (isSolved(puzzleState)) {
                return <CheckCircleFilled style={{ fontSize: "24px", color: "green" }} />
            }
            return <HourglassOutlined style={{ fontSize: "24px", color: "dimgray" }} />
        }
        return null;
    }

    const contents = !loadedConnections
        ? <LoadingSpinner />
        : nytConnections.slice(0, today).map((_, index) => {
            const id = index + 1;
            const buttonText = `${getDateString(index)} - #${id}`
            return (
                <Button
                    style={{ margin: "6px 0", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", justifyContent: "center", padding: "0 24px" }}
                    key={index}
                    onClick={() => {
                        const link = `/connections/play?id=${id}`;
                        navigate(link, { state: { backTo: "archive" } });
                    }}
                    type={index > today ? "dashed" : "default"}
                >
                    <div>
                    </div>
                    <div>
                        {index === today ? <strong>{buttonText}</strong> : buttonText}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        {progressIcon(id)}
                    </div>
                </Button>
            )
        }).reverse()

    return (
        <>
            <ConnectionsMenu />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ padding: "36px 12px", maxWidth: "768px", width: "100%", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
                        <BookOutlined height="36px" width="36px" style={{ fontSize: "36px" }} />
                        <Title level={1} style={{ marginTop: 0, marginBottom: 0, marginLeft: "12px" }}>NYT Archive</Title>
                    </div>

                    <PlayTodayButton backTo="archive" />

                    <div style={{ borderBottom: "1px solid #d9d9d9", marginTop: "24px", marginBottom: "24px" }} />

                    {contents}
                </div>
            </div>
        </>
    )
}

export default ConnectionsNYTArchive;
