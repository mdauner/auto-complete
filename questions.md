**What is the difference between Component and PureComponent? give an
example where it might break my app.**

`PureComponent` implements ```shouldComponentUpdate``` by doing a shallow
comparison of props and state. Complex data structures may produce false
negatives for deeper differences.
    
**Context + ShouldComponentUpdate might be dangerous. Can think of why is
that?**

`shouldComponentUpdate` could block context propagation when it returns
false. This could cause the component to not receive the latest context
value.

**Describe 3 ways to pass information from a component to its PARENT.**

- Callbacks 
- Context 
- Global state (Redux, MobX, etc.)

**Give 2 ways to prevent components from re-rendering.**

- `shouldComponentUpdate`
- `React.memo`

**What is a fragment and why do we need it? Give an example where it might
break my app.**

`Fragment` is a component that does not render any DOM elements. It is
useful for rendering multiple elements without a wrapper element.

**Give 3 examples of the HOC pattern.**

- `connect` from `react-redux`
- `withRouter` from `react-router`
- `withStyles` from `material-ui`

**what's the difference in handling exceptions in promises, callbacks and
async...await.**

- Promises: `catch`
- Callbacks: pass a callback to the function
- Async...await: `try...catch`

**How many arguments does setState take and why is it async.**

`setState` takes two arguments: the first is the state to update, the
second is a callback to run after the state is updated. It is async because
it batches state updates.

**List the steps needed to migrate a Class to Function Component.**

1. Remove the `render` method
2. Move the `render` method body to the function body
3. Remove the `this` keyword
4. Replace state with `useState`
5. Replace lifecycle methods with `useEffect`

**List a few ways styles can be used with components.**

- CSS
- CSS-in-JS
- Styled Components

**How to render an HTML string coming from the server.**

- `dangerouslySetInnerHTML`