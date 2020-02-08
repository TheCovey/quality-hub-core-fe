import React  from 'react';
import { Route, Switch } from 'react-router-dom';

import InterviewQContainer from '../../InterviewQ/InterviewQ'


function InterviewQ() {
	return (
			<Switch>
				<Route path='/interviewq' component={InterviewQContainer} />
			</Switch>
	);
}

export default InterviewQ;