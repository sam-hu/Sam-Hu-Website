import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { getDateString, getPuzzleStates, getTodayOffset, isSolved } from "./utils";
import { CaretRightFilled, CheckCircleFilled, HourglassOutlined } from '@ant-design/icons';

const PlayTodayButton = ({ style, backTo }: { style?: React.CSSProperties, backTo?: string }) => {
    const navigate = useNavigate();
    const today = getTodayOffset();
    const puzzleStates = getPuzzleStates();

    const progressIcon = () => {
        const puzzleState = puzzleStates[today + 1];
        if (puzzleState && puzzleState.guesses && puzzleState.guesses.length > 0) {
            if (isSolved(puzzleState.categoriesState)) {
                return <CheckCircleFilled style={{ fontSize: "24px" }} />
            }
            return <HourglassOutlined style={{ fontSize: "24px" }} />
        }
        return null;
    }

    return <Button
        className="button with-margin"
        type="primary"
        onClick={() => {
            navigate("/connections/today", { state: { backTo } });
        }}
        style={{ height: "72px", fontSize: "16px", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", justifyContent: "center", padding: "0 24px", ...style }}
    >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <CaretRightFilled style={{ fontSize: "24px", marginRight: "8px" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
            <div>
                <div>
                    Today's puzzle
                </div>
                <div>
                    {getDateString(today)} - #{today + 1}
                </div>
            </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            {progressIcon()}
        </div>
    </Button>
}

export default PlayTodayButton;
