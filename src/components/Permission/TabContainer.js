import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

class TabContainer extends Component {
    render() {
        const { children } = this.props;
        return (
            <Typography component="div" style={{ padding: 8 * 3 }}>
                {children}
            </Typography>
        );
    }
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TabContainer;