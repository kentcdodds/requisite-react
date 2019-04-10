import React from 'react'
let ui

// basic example
ui = <div id="root">Hello world</div>
ui = React.createElement('div', {id: 'root'}, 'Hello world')

// the createElement API
function createElement(elementType, props, ...children) {}

// createElement returns an object
// console.log(<div id="root">Hello world</div>)
console.log(React.createElement('div', {id: 'root'}, 'Hello world'))
// {
//   type: 'div',
//   key: null,
//   ref: null,
//   props: {id: 'root', children: 'Hello world'},
//   _owner: null,
//   _store: {},
// }

// children is a regular prop
ui = <div id="root">Hello world</div>
ui = <div id="root" children="Hello world" />
ui = React.createElement('div', {id: 'root', children: 'Hello world'})

// children can be an array
ui = (
  <div>
    <span>Hello</span> <span>World</span>
  </div>
)
ui = React.createElement('div', {
  children: [
    React.createElement('span', null, 'Hello'),
    ' ',
    React.createElement('span', null, 'World'),
  ],
})
// Note: babel uses the third argument for children:
ui = React.createElement(
  'div', // type
  null, // props
  // children are the rest:
  React.createElement('span', null, 'Hello'),
  ' ',
  React.createElement('span', null, 'World'),
)

// interpolation basically tells Babel to "do nothing with this text" and
// JavaScript uses the variable
ui = <div>Hello {subject}</div>
ui = React.createElement('div', null, 'Hello ', subject)

// multiple children (spaces are children!)
ui = (
  <div>
    {greeting} {subject}
  </div>
)
ui = React.createElement('div', null, greeting, ' ', subject)

// attribute interpolation works the same as children interpolation
ui = <button onClick={() => {}}>click me</button>
ui = React.createElement('button', {onClick: () => {}}, 'click me')

// which is how render props work
ui = <Downshift>{render}</Downshift>
ui = React.createElement(Downshift, null, render)
// Oh, and by the way, here's how babel determines whether the JSX Element is a
// custom component or a composite component:
// - <Captialized />: React.createElement(Captialized)
// - <property.access />: React.createElement(property.access)
// - <Property.Access />: React.createElement(Property.Access)
// - <Property['Access'] />: SyntaxError
// - <lowercase />: React.createElement('lowercase')
// - <kebab-case />: React.createElement('kebab-case')
// - <Upper-Kebab-Case />: React.createElement('Upper-Kebab-Case')
// - <Upper_Snake_Case />: React.createElement(Upper_Snake_Case)
// - <lower_snake_case />: React.createElement('lower_snake_case')

ui = <div>{error ? <span>{error}</span> : <span>good to go</span>}</div>
ui = React.createElement(
  'div',
  null,
  error
    ? React.createElement('span', null, error)
    : React.createElement('span', null, 'good to go'),
)

// JavaScript array map like this turns an array of items and converts
// each item in the array to a React element:
ui = (
  <div>
    {items.map(i => (
      <span key={i.id}>{i.content}</span>
    ))}
  </div>
)
ui = React.createElement(
  'div',
  null,
  items.map(i => React.createElement('span', {key: i.id}, i.content)),
)

// spreading props uses object spread...
const myProps = {prop1: 'value1'}
ui = <MyComponent prop0="value0" {...myProps} prop2="value2" />
ui = React.createElement(MyComponent, {
  prop0: 'value0',
  ...myProps,
  prop2: 'value2',
})
