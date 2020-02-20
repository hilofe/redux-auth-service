import React from "react";
import {} from "prop-types";

const WaitingComponent = props => {
    return (
        <div
            style={{
                height: `100wh`,
                width: `100%`,
                position: "fixed"
            }}
        >
            Waiting
        </div>
    );
};

WaitingComponent.propTypes = {};

WaitingComponent.defaultProps = {};

export default WaitingComponent;
