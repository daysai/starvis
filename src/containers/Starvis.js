import React from 'react';
import { connect } from 'react-redux';
import Logo from '../components/Logo';
import RoomList from '../components/RoomList';
import Weather from '../components/Weather';
import ImgList from '../components/ImgList';
import RightBottom from '../components/RightBottom';
import { modifyRoomInfo } from '../actions/restActions';
import './starvis.css';

class Starvis extends React.Component {
  render() {
    const { cityInfo, roomsInfo, imgsInfo, onChange } = this.props;
    return (
      <div className="body-box">
        <div className="left">
          <div className="left-top">
            <Logo />
            <span>星迈主题酒店</span>
          </div>
          <RoomList roomsInfo={roomsInfo} onChange={onChange} />
          <Weather
            city={cityInfo.city}
            weatherNow={cityInfo.now}
            tmpMax={cityInfo.dailyTmp.max}
            tmpMin={cityInfo.dailyTmp.min}
          />
        </div>
        <div className="right">
          <ImgList currentImg={imgsInfo.currentImg} />
          <RightBottom />
        </div>
      </div>
    );
  }
}
Starvis.defaultProps = {};

const mapStatetoProps = state => state;
const mapDispatchToProps = dispatch => ({
  onChange: (index, price) => {
    dispatch(modifyRoomInfo(index, price));
  }
});
export default connect(mapStatetoProps, mapDispatchToProps)(Starvis);
