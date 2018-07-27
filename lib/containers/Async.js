import { Component } from 'react';
import PropTypes from "prop-types";

export default class Async extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPending: true,
            isResolved: false,
            response: null,
            err: null
        }
    }
    componentDidMount() {
        this.props.promise
            .then(response => {
                this.setState({ isPending: false, isResolved: true, response })
            })
            .catch(err => this.setState({ isPending: false, isResolved: false, err }))
    }
    render() {
        const { isPending, isResolved, response, err } = this.state;
        const { resolved, rejected, pending } = this.props;
        return isPending ? pending() :
            isResolved ? resolved(response) :
                rejected(err);

    }
}

Async.propTypes = {
    promise: PropTypes.object.isRequired,
    resolved: PropTypes.func.isRequired,
    rejected: PropTypes.func.isRequired,
    pending: PropTypes.func.isRequired
}
