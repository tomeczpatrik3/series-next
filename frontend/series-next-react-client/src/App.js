import React, { Component } from 'react';

class ExampleComponent extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  incState() {
    const messages = this.props.messages;
    this.setState({ current: (this.state+1)%messages.length});
  }
  
  render() {
    const messages = this.props.messages; //--> a komponensnek atadott adat
    console.log('Rendering...');
    //{ messages.map(m => (<span> {m} </span>))}
    return(<div className="bela">
      <span onClick={() => {
        this.incState();
      }}>{messages[this.state]}</span>
      { this.props.children } 
    </div>)
  }
}

class App extends Component {
/*  render() {
    //return (<div>Hello World!</div>);
    //return (React.createElement('div', null, ['Hello World!']));
    const messages = ['Hello World!', 'Hello világ!'];
    //return (<div>
    //  {messages}
    //</div>)
    return (<div>
      { messages.map(m => (<p>{ m }</p>))}
    </div>);
  }*/

  render() {
    //return (<ExampleComponent messages={['Hello World!']} />)
    return (<ExampleComponent messages={['Hello World!', 'Helló világ!']}>
      <div>Made by Tibi</div>
    </ExampleComponent>)
  }
}

export default App;
