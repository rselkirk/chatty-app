import React, { Component } from 'react';
import Message from './Message.jsx'


class MessageList extends Component {
  render() { 

    function setClassName (username) {
      let classname = "message";
      if (username === null) {
        classname += " system";
      }
      console.log('classname', classname);
      return classname;
    }

    const messages = this.props.messages.map((message, i) => {
      return (
        <Message
          cls={setClassName(message.username)}
          key={ i }
          username={ message.username || ''}
          content={ message.content } 
          />
        )
    });
    
    return (
      <main className="messages">
      { messages }
      </main>
    );
  }
};
export default MessageList;
