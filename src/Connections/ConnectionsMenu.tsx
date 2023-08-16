import { useState } from 'react';
import { slide as Menu } from 'react-burger-menu'
import { useNavigate } from 'react-router-dom';
import { CloseOutlined, BookOutlined, QuestionCircleOutlined, EditOutlined, CaretRightFilled } from '@ant-design/icons';
import { isMobile } from './utils';
import HowToPlay from './HowToPlay';

export const ConnectionsMenu = () => {
    const [showHowTo, setShowHowTo] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const backTo = window.location.pathname === "/connections/archive" ? "archive" : "landing";

    return <Menu
        right
        isOpen={isOpen}
        width={isMobile() ? "288px" : "432px"}
        onStateChange={(state) => setIsOpen(state.isOpen)}
        customCrossIcon={<CloseOutlined />}
        burgerButtonClassName={isMobile() ? "bm-burger-button-mobile" : "bm-burger-button-desktop"}
        crossButtonClassName={isMobile() ? "bm-cross-button-mobile" : "bm-cross-button-desktop"}
    >
        <div>
            <img src="/Connections.svg" height="24px" />
            <a className="menu-item" onClick={() => { setIsOpen(false); navigate("/connections") }}>
                Home
            </a>
        </div>

        <div>
            <CaretRightFilled />
            <a className="menu-item" onClick={() => { setIsOpen(false); navigate("/connections/today", { state: { backTo } }) }}>
                Today's puzzle
            </a>
        </div>

        <div>
            <BookOutlined />
            <a className="menu-item" onClick={() => { setIsOpen(false); navigate("/connections/archive") }}>
                NYT Archive
            </a>
        </div>

        <div>
            <EditOutlined />
            <a className="menu-item" onClick={() => { setIsOpen(false); navigate("/connections/create") }}>
                Create a puzzle
            </a>
        </div>

        <div>
            <QuestionCircleOutlined />
            <a className="menu-item" onClick={() => { setIsOpen(false); setShowHowTo(true) }}>
                How to play
            </a>
        </div>

        <HowToPlay open={showHowTo} onClose={() => setShowHowTo(false)} />
    </Menu>
}
