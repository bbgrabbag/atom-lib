import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = props.inputs;
        this.uploader = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value, type, checked } = e.target;
        this.setState({
            [name]: type === "checkbox" ? checked : value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.submit({ e, inputs: this.state, uploader: this.uploader.current });
        this.props.reset && this.setState(this.props.inputs);
    }
    render() {
        const props = {
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit,
            inputs: this.state,
            uploader: this.uploader
        };
        return this.props.render(props)
    }
}

FormContainer.propTypes = {
    inputs: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired,
    reset: PropTypes.bool,
    render: PropTypes.func.isRequired
}

FormContainer.defaultProps = {
    reset: false
}
