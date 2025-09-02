import TopBarLeft from './TopBarLeft';
import TopBarRight from './TopBarRight';

const TopBar = () => {
  return (
    <div className="navbar-custom">
      <div className="topbar container-fluid">
        <TopBarLeft />
        <TopBarRight />
      </div>
    </div>
  );
};

export default TopBar;
