import React, { Component } from 'react';
import PropTypes from "prop-types";

export class Toggler extends Component {
    constructor(props) {
        super(props);
        this.state = { on: Boolean(this.props.on) }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(({ on }) => ({ on: !on }))
    }
    render() {
        const props = { ...this.state, toggle: this.toggle }
        return (
            this.props.children(props)
        )
    }
}

export const withToggler = (config = { on: false }) => C => props => (
    <Toggler on={config.on}>
        {({ on, toggle }) => <C on={on} toggle={toggle} {...props} />}
    </Toggler>
)

Toggler.propTypes = {
    on: PropTypes.bool,
    children: PropTypes.func.isRequired
}

Toggler.defaultProps = {
    on: false
}
