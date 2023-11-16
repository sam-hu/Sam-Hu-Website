import { useLocation, useNavigate } from 'react-router-dom';
import { CaretLeftOutlined } from '@ant-design/icons';
import { isMobile } from './utils';

function ConnectionsBackButton({ backTo }: { backTo?: string }) {
  const location = useLocation();
  const navigate = useNavigate();
  const back = backTo || location.state?.backTo;

  const link = () => {
    switch (back) {
      case 'landing':
        return (
          '/connections'
        );
      case 'archive':
        return (
          '/connections/archive'
        );
      case 'edit':
        return (
          '/connections/create'
        );
      default:
        return (
          '/connections'
        );
    }
  };

  return (
    <CaretLeftOutlined
      width="1000px"
      className={isMobile() ? 'back-button-mobile' : 'back-button-desktop'}
      onClick={() => navigate(link())}
    />
  );
}

export default ConnectionsBackButton;
