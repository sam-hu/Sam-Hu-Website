import React from 'react';
import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, BookOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ConnectionsMenu from './ConnectionsMenu';
import { isMobile } from './utils';
import HowToPlay from './HowToPlay';
import PlayTodayButton from './PlayTodayButton';

function ConnectionsLanding() {
  const navigate = useNavigate();
  const [showHowTo, setShowHowTo] = React.useState(false);

  return (
    <>
      <ConnectionsMenu />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <HowToPlay open={showHowTo} onClose={() => setShowHowTo(false)} />
        <div style={{
          padding: '36px 12px', maxWidth: '768px', width: '100%', display: 'flex', flexDirection: 'column',
        }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '36px' }}>
            <img src="/Connections.svg" height="36px" width="36px" alt="" />
            <Title level={1} style={{ marginTop: 0, marginBottom: 0, marginLeft: '12px' }}>Connections</Title>
          </div>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh', maxHeight: isMobile() ? '512px' : '1024px',
          }}
          >
            <PlayTodayButton backTo="landing" />

            <Button
              className="button"
              style={{ height: '72px', fontSize: '16px' }}
              onClick={() => {
                navigate('/connections/archive');
              }}
              icon={<BookOutlined />}
            >
              New York Times Archive
            </Button>

            <div style={{
              borderBottom: '1px solid #d9d9d9', marginTop: '36px', marginBottom: '36px', width: '100%',
            }}
            />

            <Button
              className="button with-margin"
              style={{ height: '72px', fontSize: '16px' }}
              onClick={() => {
                navigate('/connections/create');
              }}
              icon={<EditOutlined />}
              type="primary"
            >
              Create a puzzle
            </Button>
            <Button
              className="button with-margin"
              style={{ height: '72px', fontSize: '16px' }}
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
      </div>
    </>
  );
}

export default ConnectionsLanding;
