# ReactJS Container Library
### Reusable container components for common React features/functionalities

## Install
`npm install --save atom-lib`

---

## Usage
```javascript
    import {
    Toggler 
    Async,
    FormContainer, 
    ... 
    } from "atom-lib";
```

---

## Containers

Containers are components that have some sort of reusable functionality. Internal state/methods are exposed mainly via `render props` unless otherwise specified. The `render` function must always return either a React element or a React component.

#### § `<Toggler>`
##### Props
Name | Type | Default Value | Description
--- | --- | --- | ---
`render` *[required]* | `Func` | `N/A` | See below
`toggled` *[optional]* | `Bool` | `false` | Determines initial value of internal state

##### Render Props
Argument | Type  | Description
--- | --- | ---
`toggled` | `Bool` | The value of current state
`toggle` | `Func` | Callback function which adjusts `toggled` value

```javascript
<Toggler toggled render={({toggled, toggle}) => {
    return (
        <div>
            <button onClick={toggle}>Switch</button>
            <div>{toggled ? "ON" : "OFF"}</div>
        </div>
    )
}} />
```

#### § `<Async>`
##### Props
Name | Type | Default Value | Description
--- | --- | --- | ---
`promise` *[required]* | `Promise` | `N/A` | A promise, the status of which is maintained in state 
`resolved` *[required]* | `Func` | `N/A` | Callback which is triggered upon promise resolution
`rejected` *[required]* | `Func` | `N/A` | Callback which is triggered upon promise rejection
`pending` *[required]* | `Func` | `N/A` | Callback which is triggered while promise status is pending

```javascript
function App(props) {
    const flipCoin = new Promise((res, rej) => {
        setTimeout(() => {
            const result = Math.random() < .5;
            result ? res("HEADS!") : rej("TAILS!");
        }, 1500);
    })
    return (
        <div>
            <Async promise={flipCoin}
                resolved={response => (<h3>{response}</h3>)}
                rejected={err => (<h3>{err}</h3>)}
                pending={() => (<div>Call it in the air!</div>)}
            />
        </div>
    )
}
```

#### § `<FormContainer>`
##### Props
Name | Type | Default Value | Description
--- | --- | --- | ---
`reset` *[optional]* | `Bool` | `false` | If true, resets inputs to their original values after submit
`inputs` *[required]* | `Object` | `N/A` | Initial input values
`submit` *[required]* | `Func` | `N/A` | Callback function executed at `onSubmit` listener. Argument object: `{e, inputs, uploader}` 
`render` *[required]* | `Func` | `N/A` | See below

##### Render Props
Argument | Type  | Description
--- | --- | ---
`inputs` | `Object` | Current input values for state-controlled input elements
`handleSubmit` | `Func` | `onSubmit` Event listener
`handleChange` | `Func` | `onChange` Event listener

```javascript
<FormContainer
    reset
    inputs={{ name: "", under18: true }}
    submit={({ e, inputs, uploader }) => alert(e.target, inputs, uploader.files)}
    render={({ inputs, handleSubmit, handleChange, uploader }) => (
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} name="name" value={inputs.name} type="text" />
            <label htmlFor="legal-age">Minor: <input name="under18"id="legal-age"onChange={handleChange}checked={inputs.under18}type="checkbox"/></label>
            {/* For forms with file uploading, use the uploader as a ref on input elements with a 'file' type*/}
            <input ref={uploader} type="file" />
            <button>+</button>
        </form>
        )} />
```


