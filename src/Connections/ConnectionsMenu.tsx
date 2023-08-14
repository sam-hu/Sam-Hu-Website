import { useState } from 'react';
import { stack as Menu } from 'react-burger-menu'
import { HowToPlay } from './ConnectionsLanding';
import { useNavigate } from 'react-router-dom';
import { CloseOutlined, BookOutlined, QuestionCircleOutlined, EditOutlined, CalendarOutlined } from '@ant-design/icons';
import { isMobile } from './ConnectionsPlay';


export const ConnectionsMenu = () => {
    const [showHowTo, setShowHowTo] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

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
            <CalendarOutlined />
            <a className="menu-item" onClick={() => { setIsOpen(false); navigate("/connections/today") }}>
                Today's puzzle
            </a>
        </div>

        <div>
            <BookOutlined />
            <a className="menu-item" onClick={() => { setIsOpen(false); navigate("/connections/archive") }}>
                Archive
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
                How to Play
            </a>
        </div>

        <HowToPlay open={showHowTo} onClose={() => setShowHowTo(false)} />
    </Menu>
}