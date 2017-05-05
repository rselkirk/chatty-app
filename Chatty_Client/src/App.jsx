import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

let data = {
      currentUser: {name: "Anonymous"},
      messages: [],
      users: '0' 
    }

class App extends Component {

  constructor(props) {
    super(props);
    this.state = data;
  }

  componentDidMount () {
      this.webSocket = new WebSocket("ws://localhost:3001/");
      
      this.webSocket.onopen = (event) => {
        console.log("Connected to Server");
    };

    this.webSocket.onmessage = (event) => {
      const incomingData = JSON.parse(event.data);
      if (incomingData.type === 'incomingMessage') {
        console.log('there is an incoming message');
        this.setState ({
          messages: this.state.messages.concat(incomingData)
        });
      } 
       if (incomingData.type === 'incomingNotificaton') {
        console.log('there is an incoming notification');
        this.setState({
          messages: this.state.messages.concat(incomingData)
        });
      }
      if (incomingData.type === 'updateUsers') {
        console.log('there is an incoming new user count');
        this.setState({
          users: incomingData.users
        })
      }
    }
  }

  makeMessage(content) {
    const username = this.state.currentUser.name;
    return {
      type: 'postMessage',
      username,
      content
    };
  }

  onNewMessage = (content) => {
    const newMessage = this.makeMessage(content);
    this.webSocket.send(JSON.stringify(newMessage));
  }
  
  makeUserChange(newName, oldUsername) {
    return {
      type: 'postNotification',
      content: `${oldUsername} has changed their name to ${newName}`
    };
  }

  onNewUsername = (username) => {
    const oldUsername = this.state.currentUser.name;
    // set the username so it's ready for the message function
    if (!username){
      username = "Anonymous"
    }
    console.log("app setting username to", username)
    this.setState({currentUser: {name: username}})
    // trigger the notification that a username has changed
    const changedUsername = this.makeUserChange(username, oldUsername);
    
    this.webSocket.send(JSON.stringify(changedUsername));
    }
  
  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <div className="userCount">{this.state.users} users online</div>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.username} onNewUsername={this.onNewUsername} onNewMessage={this.onNewMessage}/>
      </div>
    );
  }
}


export default App;


