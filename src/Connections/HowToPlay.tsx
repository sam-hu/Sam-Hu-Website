import { Modal } from "antd";
import { COLORS_BY_DIFFICULTY } from "./utils";

const HowToPlay = ({ open, onClose }: { open: boolean; onClose: () => void; }) => {
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
                        <span className="help-emoji" style={{ backgroundColor: COLORS_BY_DIFFICULTY[0] }}></span>
                        Easy
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span className="help-emoji" style={{ backgroundColor: COLORS_BY_DIFFICULTY[1] }}></span>
                        Medium
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span className="help-emoji" style={{ backgroundColor: COLORS_BY_DIFFICULTY[2] }}></span>
                        Hard
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
                        <span className="help-emoji" style={{ backgroundColor: COLORS_BY_DIFFICULTY[3] }}></span>
                        Very hard
                    </div>
                </ul>
            </div>
        </div>
        <small>
            Connections was created by the New York Times. The original version of this game can be found on their website.
        </small>
    </Modal>;
};

export default HowToPlay;
