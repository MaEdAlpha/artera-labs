import "./TagDropDown.css";
import Card from "../UI/Card/Card";

const TagDropDown = (props) => {

    const goToExchange = () => {
        alert("Add link");
    }


    return(
        <div className="card__tag-drop-down-wrapper">
            <Card className="card__tag-drop-down"><button onClick={props.addTokenHandler}> add $artsy to MetaMask</button></Card>
            <Card className="card__tag-drop-down"><button onClick={goToExchange}> buy $artsy on exchange</button></Card>
            <Card className="card__tag-drop-down"><button className="tag__remove-wallet" onClick={props.onDisconnect}>Disconnect</button></Card>
        </div>
    )
}

export default TagDropDown;
