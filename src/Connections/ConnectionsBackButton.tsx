import { useLocation, useNavigate } from 'react-router-dom';
import { CaretLeftOutlined } from '@ant-design/icons';
import { ConnectionsGame, isMobile } from './utils';

function ConnectionsBackButton({ backTo, currentGame }: { backTo?: string, currentGame?: ConnectionsGame }) {
  const location = useLocation();
  const navigate = useNavigate();
  const back = backTo || location.state?.backTo;

  const link = () => {
    switch (back) {
      case 'landing':
        return '/connections';
      case 'archive':
        return '/connections/archive';
      case 'edit':
        return '/connections/create';
      default:
        return '/connections';
    }
  };

  return (
    <CaretLeftOutlined
      className={isMobile() ? 'back-button-mobile' : 'back-button-desktop'}
      onClick={() => navigate(link(), { state: { game: currentGame } })}
    />
  );
}

export default ConnectionsBackButton;
