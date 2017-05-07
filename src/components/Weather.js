import React from 'react';

const weatherArr = [
    100, 101, 102, 103, 104,
    200, 201, 202, 203, 204,
    205, 206, 207, 208, 209,
    210, 300, 301, 302, 303,
    304, 305, 306, 307, 308,
    309, 310, 311, 312, 313,
    400, 401, 402, 404, 405,
    406, 407, 500, 501, 502,
    503, 504, 507, 508
];
const weatherMap = ((weaArr) => {
	let map = {};
	weaArr.forEach((value, index) => {
		map[value] = require('images/' + value + '.png')
	});
	return map;
})(weatherArr);

class Weather extends React.Component {
    render() {
        const { city,  weatherNow, tmpMax, tmpMin } = this.props;
        const { cond, wind, tmp } = weatherNow;
        let tmpRange = tmpMin + '~' + tmpMax + '℃',
        	tmpNow = tmp + '℃',
        	windRange = wind.sc + '级';
        return (
            <div className="left-bottom">
                <div className="bot-box city">
                	<span>{city}</span>
                	<span>天气</span>
                </div>
                <img src={weatherMap[cond['code']]} alt={cond['txt']}/>
                <div className="bot-box temp">
                	<span>{cond['txt']}</span>
                	<span>{tmpRange}</span>
                </div>
                <div className="bot-box temp-now">
                	<span>温度</span>
                	<span>{tmpNow}</span>
                </div>
                <div className="bot-box wind">
                	<span>{wind['dir']}</span>
                	<span>{windRange}</span>
                </div>
            </div>
        );
    }
}

Weather.defaultProps = {};
export default Weather;