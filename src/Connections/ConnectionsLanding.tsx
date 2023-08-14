import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { CaretRightOutlined, EditOutlined, BookOutlined } from '@ant-design/icons';

export const ConnectionsLanding = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ padding: "36px 12px", maxWidth: "768px", width: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "36px" }}>
                    <img src="/Connections.svg" height="36px" />
                    <Title level={1} style={{ marginTop: 0, marginBottom: 0, marginLeft: "12px" }}>Connections</Title>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "75vh" }}>
                    <Button
                        className="button with-margin"
                        style={{ height: "96px" }}
                        type="primary"
                        onClick={() => {
                            navigate("/connections/today", { state: { backTo: "landing" } });
                        }}
                        icon={<CaretRightOutlined />}
                    >
                        Play today's puzzle
                    </Button>
                    <Button
                        className="button"
                        style={{ height: "96px" }}
                        onClick={() => {
                            navigate("/connections/archive");
                        }}
                        icon={<BookOutlined />}
                    >
                        NYT Archive
                    </Button>

                    <div style={{ borderBottom: "1px solid #d9d9d9", marginTop: "36px", marginBottom: "36px", width: "100%" }} />

                    <Button
                        className="button with-margin"
                        style={{ height: "96px" }}
                        onClick={() => {
                            navigate("/connections/create");
                        }}
                        icon={<EditOutlined />}
                    >
                        Create your own
                    </Button>
                </div>
            </div>
        </div >
    );
}