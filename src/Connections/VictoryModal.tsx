import { Button, Modal } from "antd";
import { useState } from "react";
import { ShareAltOutlined } from '@ant-design/icons';
import { ICONS_BY_DIFFICULTY } from "./utils";
import { RecordedGuess, WordState } from "./ConnectionsPlay";

export const VictoryModal = ({ guesses, allWords, visible, onClose }: { guesses: RecordedGuess[]; allWords: { [key: string]: WordState; }; visible: boolean; onClose: () => void; }) => {
    const [copied, setCopied] = useState(false);
    const guessList = guesses.map((guess) => guess.words.map((word) => ICONS_BY_DIFFICULTY[allWords[word].difficulty]).join(""));

    const onShare = () => {
        let text = guessList.join("\n");
        if (guessList.length === 4) {
            text = text + "\n😎Perfect😎";
        } else if (guessList.length > 4 && guessList.length < 8) {
            text = text + "\n😒Mid😒";
        } else if (guessList.length >= 8) {
            text = text + "\n💀Bodied💀";
        }
        if (navigator.share) {
            const shareData = {
                text: text,
            };
            navigator.share(shareData);
        } else {
            if (!copied) {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2000);
            }
            navigator.clipboard.writeText(text);
        }
    };

    const footer = <div style={{ display: "flex", flexDirection: "column", marginTop: "24px" }}>
        <Button className="button with-margin" onClick={onShare} type="primary" icon={<ShareAltOutlined />}>
            {copied ? "Copied to clipboard!" : "Share results"}
        </Button>
        <Button className="button with-margin" onClick={onClose}>
            Close
        </Button>
    </div>;

    return <Modal
        open={visible}
        title={<div style={{ fontSize: "24px" }}>Nice!</div>}
        style={{ textAlign: "center" }}
        centered
        onCancel={onClose}
        cancelButtonProps={{ hidden: true }}
        footer={footer}>
        <div style={{ paddingTop: "16px" }}>
            {guessList.map((guess, index) => <div key={index} style={{ fontSize: "24px", height: "24px" }}>{guess}</div>)}
        </div>
    </Modal>;
};
