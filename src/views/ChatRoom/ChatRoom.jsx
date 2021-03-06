import React, { Component } from "react";
import {
  Row,
  Col,
  Panel,
  ListGroup,
  ListGroupItem,
  Image,
  Grid
} from "react-bootstrap";

import './ChatRoom.css';

import 'react-chat-elements/dist/main.css';
import {
  MessageList,
  Input,
  Button,
  Dropdown,
} from 'react-chat-elements';

import FaMenu from 'react-icons/lib/md/more-vert';


const loremIpsum = require('lorem-ipsum');
const Identicon = require('identicon.js')
const moment = require('moment');

class ChatRoom extends Component {


  constructor(props) {
    super(props);

    this.state = {
      show: true,
      messageList: [],
    };
  }

  componentWillMount() {
    // setInterval(this.addMessage.bind(this), 3000);
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  token() {
    return (parseInt(Math.random() * 10 % 6));
  }

  photo(size) {
    return new Identicon(String(Math.random()) + String(Math.random()), {
      margin: 0,
      size: size || 20,
    }).toString()
  }

  random(type) {
    switch (type) {
      case 'message':
        var type = this.token();
        var status = 'waiting';
        switch (type) {
          case 0:
            type = 'photo';
            status = 'sent';
            break;
          case 1:
            type = 'file';
            status = 'sent';
            break;
          case 2:
            type = 'system';
            status = 'received';
            break;
          case 3:
            type = 'location';
            break;
          case 4:
            type = 'spotify';
            break;
          default:
            type = 'text';
            status = 'read';
            break;
        }

        return {
          position: (this.token() >= 1 ? 'right' : 'left'),
          forwarded: true,
          type: type,
          theme: 'white',
          view: 'list',
          title: loremIpsum({ count: 2, units: 'words' }),
          titleColor: this.getRandomColor(),
          text: type === 'spotify' ? 'spotify:track:7wGoVu4Dady5GV0Sv4UIsx' : loremIpsum({ count: 1, units: 'sentences' }),
          data: {
            uri: `data:image/png;base64,${this.photo(150)}`,
            status: {
              click: true,
              loading: .5,
            },
            size: "100MB",
            width: 300,
            height: 300,
            latitude: '37.773972',
            longitude: '-122.431297',
          },
          onLoad: () => {
            console.log('Photo loaded');
          },
          status: status,
          date: new Date(),
          dateString: moment(new Date()).format('HH:mm'),
          avatar: `data:image/png;base64,${this.photo()}`,
        };
      case 'chat':
        return {
          id: String(Math.random()),
          avatar: `data:image/png;base64,${this.photo()}`,
          avatarFlexible: true,
          statusColor: 'lightgreen',
          alt: loremIpsum({ count: 2, units: 'words' }),
          title: loremIpsum({ count: 2, units: 'words' }),
          date: new Date(),
          subtitle: loremIpsum({ count: 1, units: 'sentences' }),
          unread: parseInt(Math.random() * 10 % 3),
          dropdownMenu: (
            <Dropdown
              animationPosition="norteast"
              buttonProps={{
                type: "transparent",
                color: "#cecece",
                icon: {
                  component: <FaMenu />,
                  size: 24,
                }
              }}
              items={[
                'Menu Item1',
                'Menu Item2',
                'Menu Item3',
              ]} />
          ),
          dateString: moment(new Date()).format('HH:mm'),
        };
      default:
        break;
    }
  }

  addMessage() {
    var list = this.state.messageList;
    list.push(this.random('message'));
    this.setState({
      messageList: list,
    });
  }
  render() {
    var arr = [];
    for (var i = 0; i < 5; i++)
      arr.push(i);
    var chatSource = arr.map(x => this.random('chat'));
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md="9">
              <div
                className='right-panel'
              >
                <div 
                  id="message-container"
                >
                  <MessageList
                  className='message-list'
                  lockable={true}
                  downButtonBadge={10}
                  dataSource={this.state.messageList} 
                  />
                </div>
                
                <Input
                  placeholder="Type message"
                  defaultValue=""
                  ref='input'
                  multiline={true}
                  buttonsFloat='left'
                  onKeyPress={(e) => {
                    if (e.shiftKey && e.charCode === 13) {
                      return true;
                    }
                    if (e.charCode === 13) {
                      this.refs.input.clear();
                      this.addMessage();
                      e.preventDefault();
                      return false;
                    }
                  }}
                  leftButtons={
                    <Button
                    color='white'
                    backgroundColor='green'
                    text='Call'/>
                  }
                  rightButtons={
                    <Button
                      text='Send'
                      onClick={this.addMessage.bind(this)} />
                      
                  } />
              </div>
            </Col>
            <Col md="3">
              <Panel>
                <Panel.Heading>Chat list</Panel.Heading>
                <Panel.Body>Control panel</Panel.Body>
                <ListGroup className="chat-list-users">
                  <ListGroupItem>
                    <div className="chatroom-card-user">
                      <div className="user-pic-profile">
                        <Image src="https://picsum.photos/40/40" circle />
                      </div>
                      <div className="user-name">Group 1</div>
                      <i class="fas fa-plus-circle"></i>
                      <div
                        className="user-is-online"
                        style={{
                          "color": "green"
                        }}>Calling</div>
                    </div>
                  </ListGroupItem>
                  <ListGroupItem>
                    <div className="chatroom-card-user">
                      <div className="user-pic-profile">
                        <Image src="https://picsum.photos/40/40" circle />
                      </div>
                      <div className="user-name">Group 1</div>
                     <i class="fas fa-plus-circle"></i>
                      <div
                        style={{
                          "color": "red"
                        }}>offline</div>
                    </div>
                  </ListGroupItem>
                  <ListGroupItem>
                    <div className="chatroom-card-user">
                      <div className="user-pic-profile">
                        <Image src="https://picsum.photos/40/40" circle />
                      </div>
                      <div className="user-name">Group 1</div>
                     <i class="fas fa-plus-circle"></i>
                      <div
                        className="user-is-online"
                        style={{
                          "color": "red"
                        }}>offline</div>
                    </div>
                  </ListGroupItem>
                  <ListGroupItem>
                    <div className="chatroom-card-user">
                      <div className="user-pic-profile">
                        <Image src="https://picsum.photos/40/40" circle />
                      </div>
                      <div className="user-name">Group 1</div>
                     <i class="fas fa-plus-circle"></i>
                      <div
                        className="user-is-online"
                        style={{
                          "color": "green"
                        }}>Calling</div>
                    </div>
                  </ListGroupItem>
                  <ListGroupItem>
                    <div className="chatroom-card-user">
                      <div className="user-pic-profile">
                        <Image src="https://picsum.photos/40/40" circle />
                      </div>
                      <div className="user-name">Group 1</div>
                     <i class="fas fa-plus-circle"></i>
                      <div
                        className="user-is-online"
                        style={{
                          "color": "green"
                        }}>Calling</div>
                    </div>
                  </ListGroupItem>
                  <ListGroupItem>
                    <div className="chatroom-card-user">
                      <div className="user-pic-profile">
                        <Image src="https://picsum.photos/40/40" circle />
                      </div>
                      <div className="user-name">Group 1</div>
                     <i class="fas fa-plus-circle"></i>
                      <div
                        className="user-is-online"
                        style={{
                          "color": "red"
                        }}>offline</div>
                    </div>
                  </ListGroupItem>
                  <ListGroupItem>
                    <div className="chatroom-card-user">
                      <div className="user-pic-profile">
                        <Image src="https://picsum.photos/40/40" circle />
                      </div>
                      <div className="user-name">Group 1</div>
                     <i class="fas fa-plus-circle"></i>
                      <div
                        className="user-is-online"
                        style={{
                          "color": "green"
                        }}>Calling</div>
                    </div>
                  </ListGroupItem>
                  
                </ListGroup>
                <Panel.Body>Some more panel content here.</Panel.Body>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ChatRoom;
