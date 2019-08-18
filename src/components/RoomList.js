import React from 'react';

class RoomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      visible: false,
      tpVisible: false,
      vipVisible: false
    };
  }

  onBlur(index, roomType, price, vip) {
    const { onChange } = this.props;
    this.setState({ visible: false, tpVisible: false, vipVisible: false }, () =>
      onChange(index, roomType, price, vip)
    );
  }

  onKeyUp(keyCode, index, roomType, price, vip) {
    return keyCode === 13 && this.onBlur(index, roomType, price, vip);
  }

  onDoubleClick(index) {
    this.setState({
      tpVisible: false,
      visible: true,
      vipVisible: false,
      current: index
    });
  }

  onTPDoubleClick(index) {
    this.setState({
      visible: false,
      tpVisible: true,
      vipVisible: false,
      current: index
    });
  }

  onVipDoubleClick(index) {
    this.setState({
      visible: false,
      tpVisible: false,
      vipVisible: true,
      current: index
    });
  }

  render() {
    const { roomsInfo } = this.props;
    const { current, visible, tpVisible, vipVisible } = this.state;

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
                    this.onBlur(index, e.target.value || room.roomType, room.price, room.vip)
                  }
                  onKeyUp={e =>
                    this.onKeyUp(
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
                <span onDoubleClick={() => this.onTPDoubleClick(index)} className="fl">
                  {room.roomType}
                </span>
              )}
              {index === current && visible ? (
                <input
                  type="text"
                  placeholder={`原价${room.price}, 请输入修改后的价格`}
                  onBlur={e =>
                    this.onBlur(index, room.roomType, e.target.value || room.price, room.vip)
                  }
                  onKeyUp={e =>
                    this.onKeyUp(
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
                <span onDoubleClick={() => this.onDoubleClick(index)}>{room.price}</span>
              )}
              {index === current && vipVisible ? (
                <input
                  type="text"
                  placeholder={`原价${room.vip}, 请输入修改后的价格`}
                  onBlur={e =>
                    this.onBlur(index, room.roomType, room.price, e.target.value || room.vip)
                  }
                  onKeyUp={e =>
                    this.onKeyUp(
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
                <span onDoubleClick={() => this.onVipDoubleClick(index)}>{room.vip}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default RoomList;
