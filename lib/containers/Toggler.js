import { Component } from 'react';
import PropTypes from "prop-types";

export default class Toggler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggled: props.toggled
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(prevState => ({ toggled: !prevState.toggled }));
    }
    render() {
        const { toggled } = this.state;
        const { render } = this.props;
        return render({ toggled, toggle: this.toggle });
    }
}

Toggler.propTypes = {
    toggled: PropTypes.bool,
    render: PropTypes.func.isRequired
}

Toggler.defaultProps = {
    toggled: false
}
