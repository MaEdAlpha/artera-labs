import './ProgressBar.css';

const ProgressBar = (props) => {
    
    let barHeight = Math.round(props.numerator/props.denominator * 100) + '%';

    return(
        <div className='bar'>
            <div className='bar__total'>
                <span className='bar__title'>{props.isProposal ? 'YES' : 'FUNDED'}</span>
                <div className='bar__fill' style={{width:barHeight}}></div>
                <span className='bar__percent'>{props.isProposal? 'NO' : barHeight}</span>
            </div>
        </div>
               
    )
}

export default ProgressBar;