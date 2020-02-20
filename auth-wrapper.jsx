import React, { useEffect, useMemo, useState, useCallback } from "react";
import { func, string, bool, node } from "prop-types";
import { Redirect } from "react-router-dom";

const AuthWrapper = Component => ({
    waitingComponent,
    mountHandler,
    redirectPath,
    renderCondition,
    waitingCondition,
    allowRedirectBack,
    redirectBackCondition,
    ...props
}) => {
    const ComponentSuspense = useMemo(() => waitingComponent, [waitingComponent]);
    const redirectedFrom = useMemo(
        () =>
            (allowRedirectBack && props.location.pathname) ||
            (props.location.state && props.location.state.redirectedFrom),
        [allowRedirectBack, props.location.pathname, props.location.state]
    );

    if (waitingCondition) {
        return <ComponentSuspense {...props} />;
    } else if (renderCondition) {
        return <Component {...props} />;
    } else if (redirectBackCondition) {
        return <Redirect to={props.location.state.redirectedFrom} />;
    } else {
        return (
            <Redirect
                to={{
                    pathname: redirectPath,
                    state: {
                        redirectedFrom
                    }
                }}
            />
        );
    }
};

AuthWrapper.propTypes = {
    redirectBackCondition: bool,
    mountHandler: func,
    redirectPath: string,
    allowRedirectBack: bool,
    redirectCondition: bool,
    waitingCondition: bool,
    waitingComponent: node
};

AuthWrapper.defaultProps = {
    redirectBackCondition: false,
    mountHandler: () => {},
    redirectPath: "/",
    allowRedirectBack: false,
    redirectCondition: false,
    waitingCondition: false,
    waitingComponent: <div />
};

export default AuthWrapper;
