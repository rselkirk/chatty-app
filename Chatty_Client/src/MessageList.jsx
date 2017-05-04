import React, { Component } from 'react';
import Message from './Message.jsx'


class MessageList extends Component {
  render() {
    return (
      <div>
      {
        this.props.messages.map(message => <Message
            key={ message.id }
            username={ message.username }
            content={ message.content }
          />)
      }
      </div>
    );
  }
};
export default MessageList;
