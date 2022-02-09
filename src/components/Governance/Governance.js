import './Governance.css';
import React, { Fragment } from 'react';
import SectionTitle from '../UI/SectionTitle/SectionTitle';
import ProposalItem from './ProposalItem';
import Card from '../UI/Card/Card';

const Governance = (props) =>{
    const topText = "DECIDE&";
    const bottomText = "GOVERN";

    //Load array of proposals and generate them 
    const PROPOSALS = props.proposals;

    const userHasVoted = (site) => {
      const hasSupported = props.supported.filter( (user) => { return user.prop === site.proposal; });
      return hasSupported.length > 0;
    }
    
    return (
      <Fragment>
        <SectionTitle
          className="section__governance"
          header={topText}
          descriptor={bottomText}
        />
        <section className='governance__content'>
          <div className='governance__horizontal'>
            { PROPOSALS.map(
              (proposal) =>{
                return(
                  <Card className='card__govern-proposal' key={proposal.propTag}>
                    <ProposalItem propTitle={proposal.proposal} propContent={proposal.content} percentYes={(proposal.yesVoteStrength/proposal.totalVoteStrength)} arteranVoteStrength={props.arteranVoteStrength} walletAddr={props.walletAddr} hasSupported={userHasVoted(proposal)} /> 
                  </Card>
                )
              }
            )
            }
          </div>
        </section>
      </Fragment>
    );
}

export default Governance;