import React, { Component, createContext } from 'react';
import PropTypes from "prop-types";

const { Consumer, Provider } = createContext();

export class Switchboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      switches: props.switches,
      flipped: props.flipped,
      exclusive: props.exclusive
    }
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.toggleExclusive = this.toggleExclusive.bind(this);
    this.flipBoard = this.flipBoard.bind(this);
  }

  _handleExclusive(id) {
    return prevState => {
      const switches = Object.keys(prevState.switches).reduce((acc, k) => {
        if (k !== String(id)) acc[k] = false
        return acc
      }, { [id]: true })
      return { switches }
    }
  }

  _handleInclusive(id) {
    return ({ switches }) => ({ switches: { ...switches, [id]: !switches[id] } })
  }

  flipBoard() {
    this.setState(({ flipped }) => ({ flipped: !flipped }))
  }

  toggleExclusive() {
    this.setState(({ exclusive }) => ({ exclusive: !exclusive }))
  }

  toggleSwitch(id) {
    return () => {
      if (this.state.exclusive) {
        this.setState(this._handleExclusive(id))
      } else {
        this.setState(this._handleInclusive(id))
      }
    }
  }

  render() {
    const props = {
      ...this.state,
      toggleSwitch: this.toggleSwitch,
    }
    return (
      <Provider value={props}>
        {this.props.children({
          toggleExclusive: this.toggleExclusive,
          flipBoard: this.flipBoard,
          ...this.state
        })}
      </Provider>
    )
  }
}

export const withSwitchboard = (config = {}) => C => props => (
    <Switchboard {...config}>
      {switchboardProps => (
        <C {...switchboardProps}{...props} />
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
    {({ toggleSwitch, switches, flipped }) => (
      children({ toggleSwitch: toggleSwitch(id), on: Boolean(flipped) ? !switches[id] : switches[id] })
    )}
  </SwitchConsumer>
)

export const withSwitch = (config = {}) => C => props => (
  <Switch id={config.id}>
    {switchProps => <C {...switchProps}{...props} />}
  </Switch>
)

Switchboard.propTypes = {
  switches: PropTypes.objectOf(PropTypes.number),
  exclusive: PropTypes.bool,
  flipped: PropTypes.bool,
  children: PropTypes.func.isRequired
}

Switchboard.defaultProps = {
  switches: {},
  exclusive: false,
  flipped: false
}

Switch.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.func.isRequired
}