import './RightBottom.css';

function RightBottom() {
  const t = new Date();
  const year = t.getFullYear();
  let month = t.getMonth() + 1;
  let date = t.getDate();
  let dateInfo = '';
  month = month > 10 ? month : `0${month}`;
  date = date > 10 ? date : `0${date}`;
  dateInfo = `${year}-${month}-${date}`;
  return (
    <div className="right-bottom">
      <span className="date">{dateInfo}</span>
      <span className="call">订房热线：82622268</span>
    </div>
  );
}
export default RightBottom;
