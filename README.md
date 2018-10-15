# ReactJS Container Library
### Reusable container components for common React features/functionalities

## Install
`npm install --save atom-lib`

---

## Usage
```javascript
    import {
    Toggler,
    withToggler, 
    SwitchBoard,
    ... 
    } from "atom-lib";
```

---

## Container API Reference

Containers are components that have some sort of reusable functionality. Internal state/methods are exposed mainly via `children props` unless otherwise stated. The `children` function must always return either a React element or a React component. A corresponding HOC is also provided unless otherwise stated.

#### § `<Toggler>`
##### Props
Name | Type | Default | Description
--- | --- | --- | ---
`children` *[required]* | `Func` | `N/A` | **See below**
`on` *[optional]* | `Bool` | `false` | Determines initial value of toggler

##### Children Props
Property | Type  | Description
--- | --- | ---
`on` | `Bool` | The value of current state
`toggle` | `Func` | Callback function which toggles `on` value

```javascript
<Toggler on>
    {({on, toggle}) => (
        <div>
            <button onClick={toggle}>{on ? "ON" : "OFF"}</button>
        </div>
    )}
</Toggler>
```

---

#### § `withToggler`
Will expose the `toggle` and `on` values from above as `props` to the specified component.

>`withToggler(config)(component)`

`config`

Properties | Type | Description
--- | --- | ---
`on` *[optional]* |`Boolean` | Initial value of toggler

```javascript
import {withToggler} from "atom-lib"

function YourComponent({on, toggle}){
    return (
        // ...
    )
}

export default withToggler({on: false})(YourComponent)
```

---

#### § `<Switchboard>`
##### Props
Name | Type | Default | Description
--- | --- | --- | ---
`children` *[required]* | `Func` | `N/A` | **See below**
`exclusive` *[optional]* | `Bool` | `false` | Determines if switchboard values will be mutually exclusive (Any change in one switch value will result in all other switches being set to the opposite value)
`flipped` *[optional]* | `Bool` | `false` | Inverts the `on` values for each switch.
`switches` *[optional]* | `Object` | `{}` | Initial values for the switchboard. Key values must be `boolean`.

##### Children Props
Property | Type  | Description
--- | --- | ---
`toggleExclusive` | `Func` | Toggles the mutually exclusive setting. When set to `false`, changes to individual switch values won't affect others. 
`flipBoard` | `Func` | Inverts the `on` values for each switch.
`exclusive` | `Bool` | Current exclusion state of switchboard.
`flipped` | `Bool` | Current flip state of switchboard.
`switches` | `Object` | Current switch values for switchboard.

```javascript
<Switchboard exclusive>
    {({ flipBoard, toggleExclusive, flipped, exclusive, switches }) => (
      <div>
        <Switch id={"a"}>
          {({ on, toggleSwitch }) => (
            <a style={{
              textDecoration: on ? "underline" :
                "none"
            }} onClick={toggleSwitch}>A</a>
          )}
        </Switch>
        <Switch id={"b"}>
          {({ on, toggleSwitch }) => (
            <a style={{
              textDecoration: on ? "underline" :
                "none"
            }} onClick={toggleSwitch}>B</a>
          )}
          <button onClick={toggleExclusive}>{exclusive ? "Set back to Inclusive" : "Set back to exclusive"}</button>
          <button onClick={flipBoard}>{flipped ? "Reset" : "Invert"}</button>
          <p>Currently, {Object.keys(switches).reduce((total, sw) => sw ? total + 1 : total, 0)} switches are ON</p>
        </Switch>
      </div>
    )}
  </Switchboard>
```

---

#### § `withSwitchboard`
Will expose the `children` prop values from above as `props` to the specified component.

>`withSwitchboard(config)(component)`

`config` accepts the same key-value pairs as the `props` object to `Switchboard` except for `children`.

```javascript
import {withToggler} from "atom-lib"

function YourComponent({on, toggle}){
    return (
        // ...
    )
}

export default withToggler({on: false})(YourComponent)
```

---

#### § `<Switch>`

`Switch` components must be rendered within a `Switchboard` component. They are responsible for toggling and containing a particular switch value.

##### Props
Name | Type | Default | Description
--- | --- | --- | ---
`children` *[required]* | `Func` | `N/A` | **See below**
`id` *[required]* | `String` or `Number` | `N/A` | Identifies the particular switch across the switchboard

##### Children Props
Property | Type  | Description
--- | --- | ---
`on` | `Bool` | The value of current switch state
`toggleSwitch` | `Func` | Callback function which toggles `on` value

```javascript
<Switch id="a">
    {({on, toggleSwitch}) => (
        <div>
            <button onClick={toggleSwitch}>{on ? "ON" : "OFF"}</button>
        </div>
    )}
</Switch>
```

---

#### § `withSwitch`
Will expose the `children` prop values from above as `props` to the specified component. Must be rendered within a `Switchboard` component.

>`withSwitch(config)(component)`

`config`
Properties | Type | Description
--- | --- | ---
`id` *[required]* |`String` or `Number` | Identifies the particular switch across the switchboard


```javascript
const linkComponents = links.map((content, i) => (
    createElement(withSwitch({ id: i })(NavLink), { key: i }, content)
  ))
```

## Changelog

* 10/14 - *Added `Toggler`, `withToggler`, `Switchboard`, and `withSwitchboard`*

---

## Upcoming

* *Loader, Error Handler, SortFilter*
