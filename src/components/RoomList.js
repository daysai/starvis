import React from 'react';

class RoomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      visible: false
    };
  }

  onBlur(index, value) {
    const { onChange } = this.props;
    this.setState({ visible: false }, () => onChange(index, value));
  }

  onKeyUp(keyCode, index, value) {
    return keyCode === 13 && this.onBlur(index, value);
  }

  onDoubleClick(index) {
    this.setState({
      visible: true,
      current: index
    });
  }

  render() {
    const { roomsInfo } = this.props;
    const { current, visible } = this.state;

    return (
      <div className="left-main">
        <ul>
          <li key={0} className="clearfix">
            <span className="fl">房型</span>
            <span>门市价</span>
          </li>
          {roomsInfo.map((room, index) => (
            <li key={index + 1} className="clearfix">
              <span className="fl">{room.roomType}</span>
              {index === current && visible ? (
                <input
                  type="text"
                  placeholder={`原价${room.price}, 请输入修改后的价格`}
                  onBlur={e => this.onBlur(index, e.target.value || room.price)}
                  onKeyUp={e => this.onKeyUp(e.keyCode, index, e.target.value || room.price)}
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
