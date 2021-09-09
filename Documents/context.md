## 传统

用 props 一层层手动的往子组件传递数据

## context

使用 createContext 创建上下文环境，
向子组件透传(每个子组件都被传递)到数据

## children

```jsx
<XXX.Provider children={children} />
```

等价于

```jsx
<XXX.Provider>
    <children />
</XXX.Provider>
```

## provider

```jsx
cosnt Provider = ({children, ...props}) => {
    return <XXX.Provider children={children} {..props} />
}
```
