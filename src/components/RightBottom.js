import React from 'react';

class RightBottom extends React.Component {

    render() {
    	const t = new Date();
    	let year = t.getFullYear(),
    		month = t.getMonth(),
    		date = t.getDate(),
    		dateInfo = '';
    	month = month > 10 ? month : '0' + month;
    	date = date > 10 ? date : '0' + date;
    	dateInfo = year + '-' + month + '-' + date;
        return (
        	<div className="right-bottom">
	            <span className="date">{dateInfo}</span>
	            <span className="call">订房热线：82622268</span>
        	</div>
        );
    }
}

RightBottom.defaultProps = {};
export default RightBottom;