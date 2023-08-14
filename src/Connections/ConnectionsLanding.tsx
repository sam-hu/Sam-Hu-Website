import React from "react";
import { Button, Modal } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { CaretRightOutlined, EditOutlined, BookOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { colorsByDifficulty, isMobile } from "./ConnectionsPlay";
import { ConnectionsMenu } from "./ConnectionsMenu";

export const ConnectionsLanding = () => {
    const navigate = useNavigate();
    const [showHowTo, setShowHowTo] = React.useState(false);

    return (
        <>
            <ConnectionsMenu />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <HowToPlay open={showHowTo} onClose={() => setShowHowTo(false)} />
                <div style={{ padding: "36px 12px", maxWidth: "768px", width: "100%", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "36px" }}>
                        <img src="/Connections.svg" height="36px" width="36px" />
                        <Title level={1} style={{ marginTop: 0, marginBottom: 0, marginLeft: "12px" }}>Connections</Title>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "70vh", maxHeight: isMobile() ? "500px" : "1000px" }}>
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
                            type="primary"
                        >
                            Create your own
                        </Button>
                        <Button
                            className="button with-margin"
                            style={{ height: "96px" }}
                            onClick={() => {
                                setShowHowTo(true);
                            }}
                            icon={<QuestionCircleOutlined />}
                            type="dashed"
                        >
                            How to play
                        </Button>
                    </div>
                </div>
            </div >
        </>
    );
}


export const HowToPlay = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
    return <Modal open={open} onCancel={onClose} onOk={onClose} cancelButtonProps={{ style: { display: 'none' } }} style={{ zIndex: 1200 }}>
        <h2 className="modal-title">How to play Connections</h2>
        <p><b>Find groups of four items that share something in common.</b></p>
        <ul>
            <li>Select four items and tap 'Submit' to check if your guess is correct.</li>
        </ul>
        <p><b>Category Examples</b></p>
        <ul>
            <li>FISH: Bass, Flounder, Salmon, Trout</li>
            <li>FIRE ___: Ant, Drill, Island, Opal</li>
        </ul>
        <p>Categories will always be more specific than "5-LETTER WORDS," "NAMES" or "VERBS."</p>
        <p>Each puzzle has exactly one solution. Watch out for words that seem to belong to multiple categories!</p>
        <div id="color-descriptions">
            <p>Each group is assigned a color, which will be revealed as you solve: </p>
            <div>
                <ul>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span className="help-emoji" style={{ backgroundColor: colorsByDifficulty[0] }}></span>
                        Easy
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span className="help-emoji" style={{ backgroundColor: colorsByDifficulty[1] }}></span>
                        Medium
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span className="help-emoji" style={{ backgroundColor: colorsByDifficulty[2] }}></span>
                        Hard
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
                        <span className="help-emoji" style={{ backgroundColor: colorsByDifficulty[3] }}></span>
                        Very hard
                    </div>
                </ul>
            </div>
        </div>
        <small>
            Connections was created by the New York Times. The original version of this game can be found on their website.
        </small>
    </Modal >
}
