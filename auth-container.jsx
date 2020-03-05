import React, { useMemo, memo } from "react";
import { func, string, bool, node, oneOfType } from "prop-types";
import { Redirect, withRouter } from "react-router-dom";

const AuthContainer = memo(
    ({ redirectPath, renderCondition, allowRedirectBack, redirectBackCondition, renderComponent, ...props }) => {
        const redirectedFrom = useMemo(
            () =>
                (allowRedirectBack && props.location.pathname) ||
                (props.location.state && props.location.state.redirectedFrom),
            [allowRedirectBack, props.location.pathname, props.location.state]
        );

        if (renderCondition) {
            return renderComponent();
        } else if (redirectBackCondition && props.location.state) {
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
    }
);

AuthContainer.propTypes = {
    renderComponent: func.isRequired,
    renderCondition: bool,
    redirectBackCondition: bool,
    redirectPath: string,
    allowRedirectBack: bool
};

AuthContainer.defaultProps = {
    renderCondition: true,
    redirectPath: "/",
    redirectBackCondition: false,
    allowRedirectBack: false,
    stopWaitCondition: false
};

export default withRouter(AuthContainer);
