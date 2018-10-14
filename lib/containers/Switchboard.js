import React, { Component, createContext } from 'react';
import PropTypes from "prop-types";

const { Consumer, Provider } = createContext();

export class Switchboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      switches: props.switches || {},
      flipped: Boolean(props.flipped)
    }
    this.toggle = this.toggle.bind(this);
    this.flipBoard = this.flipBoard.bind(this);
  }
  _handleExclusive(id) {
    return prevState => {
      const switches = Object.keys(prevState.switches).reduce((acc, k) => {
        if (k !== String(id)) acc[k] = false
        return acc
      }, { [id]: true})
      return { switches }
    }
  }
  _handleInclusive(id) {
    return ({ switches }) => ({ switches: { ...switches, [id]: !switches[id] } })
  }
  flipBoard() {
    this.setState(({ flipped }) => ({ flipped: !flipped }))
  }

  toggle(id) {
    return () => {
      if (this.props.exclusive) {
        this.setState(this._handleExclusive(id))
      } else {
        this.setState(this._handleInclusive(id))
      }
    }
  }

  render() {
    const props = {
      ...this.state,
      toggle: this.toggle
    }
    return (
      <Provider value={props}>
        {this.props.children({ flipBoard: this.flipBoard, flipped: this.state.flipped })}
      </Provider>
    )
  }
}

export const withSwitchboard = (config = { exclusive: false }) => C => props => (
  <Switchboard exclusive={config.exclusive}>
    {switchBoardProps => (
      <C {...switchBoardProps}{...props} />
    )}
  </Switchboard>
)

const SwitchConsumer = ({ children }) => (
  <Consumer>
    {props => {
      if (!props) throw new Error("<Switch /> components must be rendered within a Switchboard component")
      return children(props)
    }}
  </Consumer>
)

export const Switch = ({ children, id }) => (
  <SwitchConsumer>
    {({ toggle, switches, flipped }) => (
      children({ toggle: toggle(id), on: flipped ? !switches[id] : switches[id] })
    )}
  </SwitchConsumer>
)

export const withSwitch = ({ id }) => C => props => (
  <Switch id={id}>
    {switchProps => <C {...switchProps}{...props} />}
  </Switch>
)

// ADD PROP TYPES