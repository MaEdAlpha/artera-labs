import { Fragment } from 'react';
import './DashBoardItem.css';



const DashBoardItem = (props) => {
    return(
        <Fragment>
            <h3 className="dash-board-item">{props.top}</h3>
            <h1 className="dash-board-item">{props.middle}</h1>
            <h3 className="dash-board-item">{props.bottom}</h3>
        </Fragment>
    );
}

export default DashBoardItem;
