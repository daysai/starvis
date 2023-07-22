import { Fragment } from 'react';
import logo from './images/logo.png';
import RoomList from './components/RoomList';
import Weather from './components/Weather';
import ImgList from './components/ImgList';
import RightBottom from './components/RightBottom';
import './App.css';

function App() {
  return (
    <Fragment>
      <div className="left">
        <div className="left-top">
          <img src={logo} alt="星迈" />
          <span>星迈主题酒店</span>
        </div>
        <RoomList />
        <Weather />
      </div>
      <div className="right">
        <ImgList />
        <RightBottom />
      </div>
    </Fragment>
  );
}

export default App;
