import { useContext } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { ConnectionsContext } from "./ConnectionsContext";
import { CaretRightOutlined, BookOutlined } from '@ant-design/icons';
import { ConnectionsMenu } from "./ConnectionsMenu";
import { FIRST_DAY, daysBetween, formatDate, generateLink } from "./utils";
import LoadingSpinner from "./Loading";

const ConnectionsNYTArchive = () => {
    const { NYTConnections: allConnections } = useContext(ConnectionsContext)
    const navigate = useNavigate();

    const getDateString = (offset: number): string => {
        const newDate = new Date(FIRST_DAY);
        newDate.setDate(FIRST_DAY.getDate() + offset);
        return formatDate(newDate);
    }

    const todayOffset = daysBetween(new Date(), FIRST_DAY);

    const contents = allConnections.length === 0
        ? <LoadingSpinner />
        : allConnections.slice(0, todayOffset).map((connection, index) => {
            const buttonText = `${getDateString(index)} - #${index + 1}`
            return (
                <Button
                    style={{ margin: "6px 0" }}
                    key={index}
                    onClick={() => {
                        const link = generateLink(connection);
                        navigate(link, { state: { backTo: "archive" } });
                    }}
                    type={index > todayOffset ? "dashed" : "default"}
                >
                    {index === todayOffset ? <strong>{buttonText}</strong> : buttonText}
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
                    <Button
                        className="button with-margin"
                        type="primary"
                        onClick={() => {
                            navigate("/connections/today");
                        }}
                        icon={<CaretRightOutlined />}
                        style={{ height: "72px", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        <div>
                            <div>
                                Play today's puzzle
                            </div>
                            <div>
                                {getDateString(todayOffset)} - #{todayOffset + 1}
                            </div>
                        </div>
                    </Button>

                    <div style={{ borderBottom: "1px solid #d9d9d9", marginTop: "24px", marginBottom: "24px" }} />

                    {contents}
                </div>
            </div>
        </>
    )
}

export default ConnectionsNYTArchive;
