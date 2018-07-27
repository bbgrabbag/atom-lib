# ReactJS Component Library
## Built using atomic design principles: 

#### Atoms, Molecules, Containers
---

## Install
`npm install --save atom-lib`

---

## Containers

Containers are components that have some sort of reusable functionality. Their internal state/methods are exposed mainly via `render props`. The `render` function must always return either a React element or React component.

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

<!-- NEXT: FormContainer, FileUploader --> 


