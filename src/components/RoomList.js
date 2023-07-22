import { useState } from 'react';
import { RoomsInfoName, DefaultRoomsInfo } from '../constants';
import './RoomList.css';

let oldRoomsInfo = [];
try {
  const info = window.localStorage.getItem(RoomsInfoName);
  oldRoomsInfo = info ? JSON.parse(info) : DefaultRoomsInfo;
} catch (e) {
  console.error(e);
  oldRoomsInfo = DefaultRoomsInfo;
}


function RoomList() {
  const [roomsInfo, setRoomsInfo] = useState(oldRoomsInfo);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [tpVisible, setTpVisible] = useState(false);
  const [vipVisible, setVipVisible] = useState(false);
  function onBlur(index, roomType, price, vip) {
    setVisible(false);
    setTpVisible(false);
    setVipVisible(false);
    onChange(index, roomType, price, vip);
  };
  function onKeyUp(keyCode, index, roomType, price, vip) {
    return keyCode === 13 && onBlur(index, roomType, price, vip);
  };
  function onDoubleClick(index) {
    setVisible(true);
    setTpVisible(false);
    setVipVisible(false);
    setCurrent(index);
  };
  function onTPDoubleClick(index) {
    setVisible(false);
    setTpVisible(true);
    setVipVisible(false);
    setCurrent(index);
  };
  function onVipDoubleClick(index) {
    setVisible(false);
    setTpVisible(false);
    setVipVisible(true);
    setCurrent(index);
  };
  function onChange(index, roomType, price, vip) {
    const newRoomsInfo = [...roomsInfo];
    newRoomsInfo[index] = {
      roomType,
      price,
      vip
    };
    setRoomsInfo(newRoomsInfo);
    window.localStorage.setItem(RoomsInfoName, JSON.stringify(newRoomsInfo));
  }
  return (
    <div className="left-main">
        <ul>
          <li key={0} className="clearfix">
            <span className="fl">房型</span>
            <span>门市价</span>
            <span>会员价</span>
          </li>
          {roomsInfo.map((room, index) => (
            <li key={index + 1} className="clearfix">
              {index === current && tpVisible ? (
                <input
                  type="text"
                  placeholder={`原房型 ${room.roomType}, 请输入修改后的房型`}
                  onBlur={e =>
                    onBlur(index, e.target.value || room.roomType, room.price, room.vip)
                  }
                  onKeyUp={e =>
                    onKeyUp(
                      e.keyCode,
                      index,
                      e.target.value || room.roomType,
                      room.price,
                      room.vip
                    )
                  }
                  autoFocus
                />
              ) : (
                <span onDoubleClick={() => onTPDoubleClick(index)} className="fl">
                  {room.roomType}
                </span>
              )}
              {index === current && visible ? (
                <input
                  type="text"
                  placeholder={`原价${room.price}, 请输入修改后的价格`}
                  onBlur={e =>
                    onBlur(index, room.roomType, e.target.value || room.price, room.vip)
                  }
                  onKeyUp={e =>
                    onKeyUp(
                      e.keyCode,
                      index,
                      room.roomType,
                      e.target.value || room.price,
                      room.vip
                    )
                  }
                  autoFocus
                />
              ) : (
                <span onDoubleClick={() => onDoubleClick(index)}>{room.price}</span>
              )}
              {index === current && vipVisible ? (
                <input
                  type="text"
                  placeholder={`原价${room.vip}, 请输入修改后的价格`}
                  onBlur={e =>
                    onBlur(index, room.roomType, room.price, e.target.value || room.vip)
                  }
                  onKeyUp={e =>
                    onKeyUp(
                      e.keyCode,
                      index,
                      room.roomType,
                      room.price,
                      e.target.value || room.vip
                    )
                  }
                  autoFocus
                />
              ) : (
                <span onDoubleClick={() => onVipDoubleClick(index)}>{room.vip}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
  );
}
export default RoomList;
