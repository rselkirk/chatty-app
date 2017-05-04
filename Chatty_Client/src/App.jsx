import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

let data = {
      messages: []  
    }

class App extends Component {

  constructor(props) {
    super(props);
    this.state = data;
    this.id = 3;
  }

  get newId() {
    return this.id++;
  }

  componentDidMount () {
      this.webSocket = new WebSocket("ws://localhost:3001/");
      this.webSocket.onopen = (event) => {
        console.log("Connected to Server");
    };
  }

  makeMessage(content) {
    const username = this.state.currentUser.name;
    return {
      username,
      content
    };
  }

  onNewMessage = (content) => {
    const newMessage = this.makeMessage(content);
    console.log('content', newMessage);
    this.webSocket.send(JSON.stringify(newMessage));
    
    this.webSocket.onmessage = (event) => {
      const incomingData = JSON.parse(event.data);
      if (incomingData.type === 'incomingMessage') {
        console.log('there is an incoming message');
        this.setState({
          messages: this.state.messages.concat(incomingData)
        });
      } else if (incomingData.type === 'incomingNotification') {
        console.log('there is an incoming notification');
      }
    }
  }
  
  onNewUsername = (username) => {
    if (!username){
      username = "anonymous"
    }
    //this.webSocket.send(JSON.stringify(username));
    console.log("app setting username to", username)
    this.setState({currentUser: {name: username}})
  }
  
  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.username} onNewUsername={this.onNewUsername} onNewMessage={this.onNewMessage}/>
      </div>
    );
  }
}

export default App;


