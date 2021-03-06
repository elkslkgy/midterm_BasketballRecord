import React, { Component } from 'react'

import './Login.css'

class Login extends Component {
    constructor(props) {
    super(props);
    this.state = {};
    }

    FillTheForm = e => {
        this.props.socket.emit("FillTheForm", {
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            opponent: document.getElementById("opponent").value,
            court: document.getElementById("court").value});
    }

    render() {
        return (
        <form onSubmit={this.FillTheForm}>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">日期：</label>
                <input type="text" className="col-sm-10 form-control" id="date" placeholder="日期"/>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">時間：</label>
                <input type="text" className="col-sm-10 form-control" id="time" placeholder="時間"/>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">對手：</label>
                <input type="text" className="col-sm-10 form-control" id="opponent" placeholder="對手"/>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">場地：</label>
                <input type="text" className="col-sm-10 form-control" id="court" placeholder="場地"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        );
    }
        
}

export default Login;
