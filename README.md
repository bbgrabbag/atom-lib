# ReactJS Container Library
### Reusable container components for common React features/functionalities

## Install
`npm install --save atom-lib`

---

## Usage
```javascript
    import {
    Toggler 
    SwitchBoard,
    Loader,
    Catch,
    ... 
    } from "atom-lib";
```

---

## Containers

Containers are components that have some sort of reusable functionality. Internal state/methods are exposed mainly via `children props` unless otherwise stated. The `children` function must always return either a React element or a React component. A corresponding HOC is also provided unless otherwise stated.

#### § `<Toggler>`
##### Props
Name | Type | Default | Description
--- | --- | --- | ---
`children` *[required]* | `Func` | `N/A` | See below
`on` *[optional]* | `Bool` | `false` | Determines initial value of toggler

##### Children Props
Property | Type  | Description
--- | --- | ---
`on` | `Bool` | The value of current state
`toggle` | `Func` | Callback function which adjusts `toggled` value

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

`config` *[optional]*

Properties | Type | Default | Description
--- | --- | --- | ---
`on` *[optional]* | `Boolean` | `false` | Initial value of toggler

```javascript
import {withToggler} from "atom-lib"

function YourComponent({on, toggle}){
    return (
        // ...
    )
}

export default withToggler({on: false})(YourComponent)
```


