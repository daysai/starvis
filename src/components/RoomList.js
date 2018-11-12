import React from 'react';

class RoomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      visible: false,
      tpVisible: false
    };
  }

  onBlur(index, roomType, price) {
    const { onChange } = this.props;
    this.setState({ visible: false, tpVisible: false }, () => onChange(index, roomType, price));
  }

  onKeyUp(keyCode, index, roomType, price) {
    return keyCode === 13 && this.onBlur(index, roomType, price);
  }

  onDoubleClick(index) {
    this.setState({
      tpVisible: false,
      visible: true,
      current: index
    });
  }

  onTPDoubleClick(index) {
    this.setState({
      visible: false,
      tpVisible: true,
      current: index
    });
  }

  render() {
    const { roomsInfo } = this.props;
    const { current, visible, tpVisible } = this.state;

    return (
      <div className="left-main">
        <ul>
          <li key={0} className="clearfix">
            <span className="fl">房型</span>
            <span>门市价</span>
          </li>
          {roomsInfo.map((room, index) => (
            <li key={index + 1} className="clearfix">
              {index === current && tpVisible ? (
                <input
                  type="text"
                  placeholder={`原房型 ${room.roomType}, 请输入修改后的房型`}
                  onBlur={e => this.onBlur(index, e.target.value || room.roomType, room.price)}
                  onKeyUp={e =>
                    this.onKeyUp(e.keyCode, index, e.target.value || room.roomType, room.price)
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
                  onBlur={e => this.onBlur(index, room.roomType, e.target.value || room.price)}
                  onKeyUp={e =>
                    this.onKeyUp(e.keyCode, index, room.roomType, e.target.value || room.price)
                  }
                  autoFocus
                />
              ) : (
                <span onDoubleClick={() => this.onDoubleClick(index)}>{room.price}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default RoomList;
