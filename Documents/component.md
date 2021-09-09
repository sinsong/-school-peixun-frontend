类组件

```jsx
class ...
```

函数式组件

```jsx
const xxx = () => {
    return (
        <App />
    )
}
```

## hook

hook 是 16.8 的新特性

用来不使用类组件也能使用副作用等特性的东西

数据获取，设置订阅，更高 React 组件中的 DOM 属于副作用

可以看成 `componentDidMount` `componentDidUpdate` `componentWillUnmount`

