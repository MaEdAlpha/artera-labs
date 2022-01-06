import "./DashBoardItem.css";

const DashBoardItem = (props) => {
  return (
    <div className="dash-board-content">
      <div className="dash-board-content-vert-align">
        <h3 className="dash-board-item">{props.top}</h3>
        <h1 className="dash-board-item">{props.middle}</h1>
        <h3 className="dash-board-item">{props.bottom}</h3>
      </div>
    </div>
  );
};

export default DashBoardItem;
