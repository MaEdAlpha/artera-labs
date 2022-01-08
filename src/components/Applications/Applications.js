import { Fragment } from "react";
import SectionTitle from "../UI/SectionTitle/SectionTitle";
import "./Appications.css";

const Applications = () =>{
    const topText = "PLAY&";
    const bottomText = "EARN";

    return(
        <Fragment>
            <SectionTitle
              className="section__governance"
              header={topText}
              descriptor={bottomText}>

            </SectionTitle>
            <section className="application__content">
                <h1>COMING SOON</h1>
            </section>
        </ Fragment>
    )
}

export default Applications;