import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { getCompletedPuzzles, getDateString, getTodayOffset } from "./utils";
import { CaretRightFilled, CheckCircleFilled } from '@ant-design/icons';

const PlayTodayButton = ({ style, backTo }: { style?: React.CSSProperties, backTo?: string }) => {
    const navigate = useNavigate();
    const today = getTodayOffset();
    const completedPuzzles = getCompletedPuzzles();

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
            {completedPuzzles[today + 1] && <CheckCircleFilled style={{ fontSize: "24px" }} />}
        </div>
    </Button>
}

export default PlayTodayButton;
