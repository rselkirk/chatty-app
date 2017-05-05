import React, {PropTypes, Component} from 'react';

class ChatBar extends Component {
  
  static propTypes = {
    onNewMessage: PropTypes.func.isRequired,
    //username: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      username: props.username,
      messages: []
    }
  }

  onMessageChanged = (e) => {
    this.setState({ message: e.target.value });
  }

  onMessageKeypress = (e) => {
    if(e.key === 'Enter') {
      this.props.onNewMessage(this.state.message)
      this.setState({ message: '' });
    }
  }

  onUserChanged = (e) => {
    this.setState({ username: e.target.value });
  }

  submitUsername = (e) => {
    console.log("Chatbar submitUsername", this.state.username)
      this.props.onNewUsername(this.state.username)
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" 
          placeholder="Your Name (Optional)" 
          defaultValue={this.state.username} 
          onChange={this.onUserChanged} 
          onBlur={this.submitUsername}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.message} onChange={this.onMessageChanged} onKeyPress={this.onMessageKeypress}/>
      </footer>
    );
  }
}
export default ChatBar;

