import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { func, string, bool, node } from 'prop-types';
import { Redirect } from 'react-router-dom';

const AuthWrapper = Component => ({
	waitingComponent,
	mountHandler,
	waitCondition,
	redirectPath,
	renderCondition,
	allowRedirectBack,
	redirectBackCondition,
	...props
}) => {
	useEffect(() => {
		mountHandler();
	}, []);

	const RenderComponent = useCallback(() => <Component {...props} />, [props]);
	const ComponentSuspense = useMemo(() => waitingComponent, [waitingComponent]);

	if (waitCondition) {
		return <ComponentSuspense />;
	} else {
		return (
			<AuthContainer
				redirectPath={redirectPath}
				renderCondition={renderCondition}
				allowRedirectBack={allowRedirectBack}
				redirectBackCondition={redirectBackCondition}
				renderComponent={RenderComponent}
			/>
		);
	}
};

AuthWrapper.propTypes = {
	redirectBackCondition: bool,
	mountHandler: oneOfType([func]),
	redirectPath: string,
	allowRedirectBack: bool,
	redirectCondition: bool,
	stopWaitCondition: bool,
	waitingComponent: node,
};

AuthWrapper.defaultProps = {
	mountHandler: null,
	redirectPath: '/',
	redirectBackCondition: false,
	allowRedirectBack: false,
	stopWaitCondition: false,
	redirectCondition: false,
	waitingComponent: <div />,
};

export default AuthWrapper;
