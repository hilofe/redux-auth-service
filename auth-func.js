import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import WaitingComponent from './waiting-component';
import AuthWrapper from './auth-wrapper';

const authWrapper = ({
	pathRedirecting = () => '/',
	renderSelector = () => true,
	mountHandler = () => {},
	redirectBackSelector = () => false,
	allowRedirectBack = false,
	waitSelector = () => false,
	waitingComponent = WaitingComponent,
	redirectBack = false,
} = {}) => Component =>
	connect(
		state => {
			const redirectPath = pathRedirecting(state);
			const renderCondition = renderSelector(state);
			const waitCondition = waitSelector(state);
			const redirectBackCondition = redirectBackSelector(state);

			return {
				allowRedirectBack,
				redirectPath,
				renderCondition,
				waitCondition,
				waitingComponent,
				redirectBack,
				redirectBackCondition,
			};
		},
		dispatch => ({
			mountHandler: () => dispatch(mountHandler()),
		}),
	)(withRouter(AuthWrapper(Component)));

export default authWrapper;
