import './LaunchPadProject.css';

const LaunchPadProject = (props) => {
    return(
        <div className='project__wrapper'>
            <div className='project__img'>
                <img src={props.project.imgSrc} alt={props.project.artiste}></img>
            </div>
            <div className='project__artiste'>
                <h1>{props.project.artiste.toUpperCase()}</h1>
            </div>
            <div className='project__content'>
                <p>{props.project.info}</p>
            </div>
            <div>
                <p> Funds Bar</p>
            </div>
            <div className="project__buttons">
              <button className='button__support'>SUPPORT</button><button className='button__read-more'>READ MORE</button>
            </div>
        </div>
    );
}

export default LaunchPadProject;