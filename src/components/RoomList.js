import React from 'react';

class RoomList extends React.Component {

    render() {
        const { roomsInfo } = this.props;

        return (
            <div className="left-main">
                <ul>
                    <li key={0}>
                        <span>房型</span>
                        <span>门市价</span>
                    </li>
                    {roomsInfo.map((room, index) => (
                            <li key={index + 1}>
                                <span>{room.roomType}</span>
                                <span>{room.price}</span>
                            </li>
                        )
                    )}
                </ul>
            </div>
        );
    }
}

RoomList.defaultProps = {};
export default RoomList;