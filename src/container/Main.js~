import React, { Component } from 'react'
import webSocket from 'socket.io-client'


import Page from './Page';
import Login from './Login';

var Goto;

class Main extends Component {
    constructor(props) {
    super(props);
    this.state = {socket: webSocket('http://localhost:3001'),
                  date: "",
                  time: "",
                  opponent: "",
                  court: ""};
    }
    componentWillMount() {
        if (this.state.socket) {
            console.log("success connect");
        }
        this.state.socket.on('init_contest', data => {
            if (data.length) this.startContest(data);
        })
        this.state.socket.on('AlreadyclearAll', () => {
            this.setState( state => {
                state.date = "";
                state.time = "";
                state.opponent = "";
                state.court = "";
                return {state};
            });
        })
    }

    startContest = data => {
        console.log("startContest");
        data.map( e => {
            this.setState( state => {
                state.date = e.date;
                state.time = e.time;
                state.opponent = e.opponent;
                state.court = e.court;
                return {state};
            });
	    return 0;})
    }

    render() {
        if (this.state.date !== "" && this.state.time !== "" && this.state.opponent !== "" && this.state.court !== "") {
            Goto = <Page socket={this.state.socket} date={this.state.date} time={this.state.time} opponent={this.state.opponent} court={this.state.court}/>;
        } else {
            Goto = <Login socket={this.state.socket}/>;
        }
        return (
        <div>
            {Goto}
        </div>
        );
    }
        
}

export default Main;
