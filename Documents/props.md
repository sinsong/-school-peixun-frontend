```js
const A = () => {
    const [number, setNumber] = useState(0)
    const handleClick = () => {
        setNumber(number + 1)
    }
    return (
        <button onClick={handleClick}>add</button>
        <B number={number} />
    )
}
```

```js
const B = (props) => {
    return (
        <C number={props.number} />
    )
}
```

## context

```js
const context = React.createContext()
const A = () => {
    const [number, setNumber] = useState(0)
    const handleClick = () => {
        setNumber(number + 1)
    }
    return (
        <h1>{number}</h1>
        <Button onClick={handleClick}>
        <context.Provider value={number}>
            <B />
        </context.Provider>
    )
}

cosnt D = () => {
    const value = useContext(context)
    return (
    <>
        <h4> {value} </h4>
        <button onClick={handleClick}>add+1</button>
    </>
    )
}
```
