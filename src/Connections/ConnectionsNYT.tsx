import { useContext } from "react";
import { Button, Spin } from "antd";
import { generateLink } from "./ConnectionsCreate";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { ConnectionsContext } from "./ConnectionsContext";
import { ConnectionsGame } from "./ConnectionsPlay";
import { CaretRightOutlined, BookOutlined } from '@ant-design/icons';
import { ConnectionsMenu } from "./ConnectionsMenu";

export const FIRST_DAY = new Date(2023, 5, 12);

export const daysBetween = (now: Date, then: Date): number => {
    const timeDifference = now.getTime() - then.getTime();
    const numberOfDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return numberOfDays;
}

export const ConnectionsNYTArchive = () => {
    const { NYTConnections: allConnections } = useContext(ConnectionsContext)
    const navigate = useNavigate();

    const getDate = (offset: number): string => {
        const newDate = new Date(FIRST_DAY);
        newDate.setDate(FIRST_DAY.getDate() + offset);

        return newDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

    const todayOffset = daysBetween(new Date(), FIRST_DAY);

    const contents = allConnections.length === 0
        ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <Spin size="large" />
        </div>
        : allConnections.map((connection, index) => {
            const buttonText = `${getDate(index)} - #${index + 1}`
            return (
                <Button
                    style={{ margin: "6px 0" }}
                    key={index}
                    onClick={() => {
                        const link = generateLink(connection);
                        navigate(link, { state: { backTo: "archive" } });
                    }}
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
                    >
                        Play today's puzzle
                    </Button>

                    <div style={{ borderBottom: "1px solid #d9d9d9", marginTop: "24px", marginBottom: "24px" }} />

                    {contents}
                </div>
            </div>
        </>
    )
}

export const ConnectionsNYTToday = () => {
    const { NYTConnections } = useContext(ConnectionsContext)

    const todayOffset = daysBetween(new Date(), FIRST_DAY);
    const categories = NYTConnections[todayOffset]

    if (NYTConnections.length === 0) {
        return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <Spin size="large" />
        </div>
    }

    return <ConnectionsGame categories={categories} backTo="archive" />
}
