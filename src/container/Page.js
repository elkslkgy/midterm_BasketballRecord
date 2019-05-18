import React, { Component } from 'react'

import './Page.css'
import Player from '../component/Player.js'
import Button from '../component/Button.js'
import Point from '../component/Point.js'
import Section from '../component/Section.js'
import Score from '../component/Score.js'

class Page extends Component {
    constructor(props) {
    super(props);
    this.state = {data: [],
                  opponent: {name: "",
                             twoPointMade: 0,
                             twoPointFail: 0,
                             threePointMade: 0,
                             threePointFail: 0,
                             freeThrowMade: 0,
                             freeThrowFail: 0,
                             defensive: 0,
                             offensive: 0,
                             steals: 0,
                             assists: 0,
                             blocks: 0,
                             fouls: 0,
                             turnovers: 0,
                             scores: 0},
                  quarter: {own: [0, 0, 0, 0],
                            other: [0, 0, 0, 0]},
                  now: 0};
    }

    componentDidMount() {
        let dataForScore, dataForRecord, dataForOpponent;

        if (this.props.socket) {
            console.log("success connect");
        }
        this.props.socket.on('init_all', data => {
            if (data.length === 3) {
                for (let x = 0; x < 3; x++) {
                    if (data[x].length) {
                        if (data[x][0].gb1 !== undefined) {
                            dataForScore = data[x][0];
                            console.log("have dataForScore");
                        }
                        else if (data[x][0].num !== undefined) {
                            dataForRecord = data[x];
                            console.log("have dataForRecord");
                        }
                        else {
                            dataForOpponent = data[x][0];
                            console.log("have dataForOpponent");
                        }
                    }
                    else {
                        dataForRecord = data[x];
                    }
                }
                this.init_all(dataForScore, dataForRecord, dataForOpponent);
            }
        })
        this.props.socket.on("updatePlayer", data => {
            this.updatePlayer(data);
        });
        this.props.socket.on("updateRecord", data => {
            this.updateRecord(data);
        });
        this.props.socket.on("updateScore", data => {
            this.updateScore(data);
        });
        this.props.socket.on("updateRecordforOpponent", data => {
            this.updateRecordforOpponent(data);
        });
        this.props.socket.on('changeStage', data => {
            this.changeStage(data);
        })
    }

    init_all = (dataForScore, dataForRecord, dataForOpponent) => {
        this.state.data.length = 0;
        this.setState( state => {
            state.opponent.name = dataForOpponent.name;
            state.opponent.twoPointMade = dataForOpponent.twoPointMade;
            state.opponent.twoPointFail = dataForOpponent.twoPointFail;
            state.opponent.threePointMade = dataForOpponent.threePointMade;
            state.opponent.threePointFail = dataForOpponent.threePointFail;
            state.opponent.freeThrowMade = dataForOpponent.freeThrowMade;
            state.opponent.freeThrowFail = dataForOpponent.freeThrowFail;
            state.opponent.defensive = dataForOpponent.defensive;
            state.opponent.offensive = dataForOpponent.offensive;
            state.opponent.steals = dataForOpponent.steals;
            state.opponent.assists = dataForOpponent.assists;
            state.opponent.blocks = dataForOpponent.blocks;
            state.opponent.fouls = dataForOpponent.fouls;
            state.opponent.turnovers = dataForOpponent.turnovers;
            state.opponent.scores = dataForOpponent.scores;

            state.quarter.own[0] = dataForScore.gb1;
            state.quarter.own[1] = dataForScore.gb2;
            state.quarter.own[2] = dataForScore.gb3;
            state.quarter.own[3] = dataForScore.gb4;
            state.quarter.other[0] = dataForScore.op1;
            state.quarter.other[1] = dataForScore.op2;
            state.quarter.other[2] = dataForScore.op3;
            state.quarter.other[3] = dataForScore.op4;
            state.now = dataForScore.now;

            for (let x = 0; x < dataForRecord.length; x++)
                state.data.push(dataForRecord[x]);

            return {state};
        })
    }

    addPlayer = () => {
        let num = document.getElementById("numInput").value;
        let name = document.getElementById("nameInput").value;
        if (num !== "" && name !== "") {
            const newPlayer = {
                num: num,
                name: name,
                twoPointMade: 0,
                twoPointFail: 0,
                threePointMade: 0,
                threePointFail: 0,
                freeThrowMade: 0,
                freeThrowFail: 0,
                defensive: 0,
                offensive: 0,
                steals: 0,
                assists: 0,
                blocks: 0,
                fouls: 0,
                turnovers: 0,
                scores: 0
            }

            this.setState(state => {
              state.data.push(newPlayer);
              return {state};
            });

            this.props.socket.emit("addPlayer", {
                num: num,
                name: name,
                twoPointMade: 0,
                twoPointFail: 0,
                threePointMade: 0,
                threePointFail: 0,
                freeThrowMade: 0,
                freeThrowFail: 0,
                defensive: 0,
                offensive: 0,
                steals: 0,
                assists: 0,
                blocks: 0,
                fouls: 0,
                turnovers: 0,
                scores: 0
            });
            document.getElementById("numInput").value = "";
            document.getElementById("nameInput").value = "";
        }
    }

    updatePlayer = data => {
        console.log("updatePlayer");
        if (data) {
            this.setState(state => {
                state.data.push(data);
                return {state};
            })
        }
    }

    updateRecord = e => {
        console.log("updateRecord");
        this.setState(state => {
            for (let x = 0; x < state.data.length; x++) {
                if (state.data[x].name === e.name) {
                    switch (e.ID) {
                        case "twoPointMade":
                        state.data[x].twoPointMade = e.changeValue;
                        state.data[x].scores = e.changeScore;
                        break;
                        
                        case "twoPointFail":
                        state.data[x].twoPointFail = e.changeValue;
                        break;
                        
                        case "threePointMade":
                        state.data[x].threePointMade = e.changeValue;
                        state.data[x].scores = e.changeScore;
                        break;
                        
                        case "threePointFail":
                        state.data[x].threePointFail = e.changeValue;
                        break;
                        
                        case "freeThrowMade":
                        state.data[x].freeThrowMade = e.changeValue;
                        state.data[x].scores = e.changeScore;
                        break;
                        
                        case "freeThrowFail":
                        state.data[x].freeThrowFail = e.changeValue;
                        break;
                        
                        case "defensive":
                        state.data[x].defensive = e.changeValue;
                        break;
                        
                        case "offensive":
                        state.data[x].offensive = e.changeValue;
                        break;
                        
                        case "steals":
                        state.data[x].steals = e.changeValue;
                        break;
                        
                        case "assists":
                        state.data[x].assists = e.changeValue;
                        break;
                        
                        case "blocks":
                        state.data[x].blocks = e.changeValue;
                        break;
                        
                        case "fouls":
                        state.data[x].fouls = e.changeValue;
                        break;
                        
                        default:
                        state.data[x].turnovers = e.changeValue;
                        break;
                    }
                }
                break;
            }
            return {state}
        })
    }

    updateScore = data => {
        console.log("updateScore");
        this.setState(state => {
            if (data.name === "own") {
                state.quarter.own[data.now] = data.changeScore;
            }
            else {
                state.quarter.other[data.now] = data.changeScore;
            }
            return {state};
        })
    }

    updateRecordforOpponent = e => {
        console.log("updateRecordforOpponent");
        this.setState(state => {
            switch (e.ID) {
                case "twoPointMade":
                state.opponent.twoPointMade = e.changeValue;
                state.opponent.scores = e.changeScore;
                break;
                
                case "twoPointFail":
                state.opponent.twoPointFail = e.changeValue;
                break;
                
                case "threePointMade":
                state.opponent.threePointMade = e.changeValue;
                state.opponent.scores = e.changeScore;
                break;
                
                case "threePointFail":
                state.opponent.threePointFail = e.changeValue;
                break;
                
                case "freeThrowMade":
                state.opponent.freeThrowMade = e.changeValue;
                state.opponent.scores = e.changeScore;
                break;
                
                case "freeThrowFail":
                state.opponent.freeThrowFail = e.changeValue;
                break;
                
                case "defensive":
                state.opponent.defensive = e.changeValue;
                break;
                
                case "offensive":
                state.opponent.offensive = e.changeValue;
                break;
                
                case "steals":
                state.opponent.steals = e.changeValue;
                break;
                
                case "assists":
                state.opponent.assists = e.changeValue;
                break;
                
                case "blocks":
                state.opponent.blocks = e.changeValue;
                break;
                
                case "fouls":
                state.opponent.fouls = e.changeValue;
                break;
                
                default:
                state.opponent.turnovers = e.changeValue;
                break;
            }
            return {state};
        })
    }

    clearAll = e => {
        this.props.socket.emit("clearAll");
    }

    calculate = e => {
        const ID = e.target.id;
        const person = e.target.parentNode.parentNode.id
        const operator = e.target.textContent;
        if (person === "opponent") {
            switch (ID) {
                case "twoPointMade":
                this.setState(state => {
                    if (operator === "-") {
                        if (state.opponent.twoPointMade > 0) {
                            this.props.socket.emit("writeRecordforOpponent",
                                {name: state.opponent.name, ID: ID,
                                 changeValue: state.opponent.twoPointMade -= 1 ,
                                 changeScore: state.opponent.scores -= 2});
                            this.props.socket.emit("writeScore",
                                {name: "other", now: state.now,
                                 changeScore: state.quarter.other[state.now] -= 2});
                        }
                    } else {
                        this.props.socket.emit("writeRecordforOpponent",
                            {name: state.opponent.name, ID: ID,
                             changeValue: state.opponent.twoPointMade += 1,
                             changeScore: state.opponent.scores += 2});
                        this.props.socket.emit("writeScore",
                                {name: "other", now: state.now,
                                 changeScore: state.quarter.other[state.now] += 2});
                    }
                    return {state};
                });break;
                        
                case "twoPointFail":
                this.setState(state => {
                    if (operator === "-") {
                        if (state.opponent.twoPointFail > 0) {
                            this.props.socket.emit("writeRecordforOpponent",
                                {name: state.opponent.name, ID: ID,
                                 changeValue: state.opponent.twoPointFail -= 1,
                                 changeScore: state.opponent.scores});
                        }
                    } else {
                        this.props.socket.emit("writeRecordforOpponent",
                            {name: state.opponent.name, ID: ID,
                             changeValue: state.opponent.twoPointFail += 1,
                             changeScore: state.opponent.scores});
                    }
                    return {state};
                });break;
                        
                case "threePointMade":
                this.setState(state => {
                    if (operator === "-") {
                        if (state.opponent.threePointMade > 0) {
                            this.props.socket.emit("writeRecordforOpponent",
                                {name: state.opponent.name, ID: ID,
                                 changeValue: state.opponent.threePointMade -= 1,
                                 changeScore: state.opponent.scores -= 3});
                            this.props.socket.emit("writeScore",
                                {name: "other", now: state.now,
                                 changeScore: state.quarter.other[state.now] -= 3});
                        }
                    } else {
                        this.props.socket.emit("writeRecordforOpponent",
                            {name: state.opponent.name, ID: ID,
                             changeValue: state.opponent.threePointMade += 1,
                             changeScore: state.opponent.scores += 3});
                        this.props.socket.emit("writeScore",
                                {name: "other", now: state.now,
                                 changeScore: state.quarter.other[state.now] += 3});
                    }
                    return {state};
                });break;
                        
                case "threePointFail":
                this.setState(state => {
                    if (operator === "-") {
                        if (state.opponent.threePointFail > 0) {
                            this.props.socket.emit("writeRecordforOpponent",
                                {name: state.opponent.name, ID: ID,
                                 changeValue: state.opponent.threePointFail -= 1,
                                 changeScore: state.opponent.scores});
                        }
                    } else {
                        this.props.socket.emit("writeRecordforOpponent",
                            {name: state.opponent.name, ID: ID,
                             changeValue: state.opponent.threePointFail += 1,
                             changeScore: state.opponent.scores});
                    }
                    return {state};
                });break;
                        
                case "freeThrowMade":
                this.setState(state => {
                    if (operator === "-") {
                        if (state.opponent.freeThrowMade > 0) {
                            this.props.socket.emit("writeRecordforOpponent",
                                {name: state.opponent.name, ID: ID,
                                 changeValue: state.opponent.freeThrowMade -= 1,
                                 changeScore: state.opponent.scores -= 1});
                            state.quarter.other[state.now] -= 1;
                            this.props.socket.emit("writeScore",
                                {name: "other", now: state.now,
                                 changeScore: state.quarter.other[state.now] -= 1});
                        }
                    }
                    else {
                        this.props.socket.emit("writeRecordforOpponent",
                            {name: state.opponent.name, ID: ID,
                             changeValue: state.opponent.freeThrowMade += 1,
                             changeScore: state.opponent.scores += 1});
                        this.props.socket.emit("writeScore",
                                {name: "other", now: state.now,
                                 changeScore: state.quarter.other[state.now] += 1});
                    }
                    return {state};
                });break;
                        
                case "freeThrowFail":
                this.setState(state => {
                    if (operator === "-") {
                        if (state.opponent.freeThrowFail > 0) {
                            this.props.socket.emit("writeRecordforOpponent",
                                {name: state.opponent.name, ID: ID,
                                 changeValue: state.opponent.freeThrowFail -= 1,
                                 changeScore: state.opponent.scores});
                        }
                    } else {
                        this.props.socket.emit("writeRecordforOpponent",
                            {name: state.opponent.name, ID: ID,
                             changeValue: state.opponent.freeThrowFail += 1,
                             changeScore: state.opponent.scores});
                    }
                    return {state};
                });break;
                        
                case "defensive":
                this.setState(state => {
                    if (operator === "-") {
                        if (state.opponent.defensive > 0) {
                            this.props.socket.emit("writeRecordforOpponent",
                                {name: state.opponent.name, ID: ID,
                                 changeValue: state.opponent.defensive -= 1,
                                 changeScore: state.opponent.scores});
                        }
                    } else {
                        this.props.socket.emit("writeRecordforOpponent",
                            {name: state.opponent.name, ID: ID,
                             changeValue: state.opponent.defensive += 1,
                             changeScore: state.opponent.scores});
                    }
                    return {state};
                });break;
                        
                case "offensive":
                this.setState(state => {
                    if (operator === "-") {
                        if (state.opponent.offensive > 0) {
                            this.props.socket.emit("writeRecordforOpponent",
                                {name: state.opponent.name, ID: ID,
                                 changeValue: state.opponent.offensive -= 1,
                                 changeScore: state.opponent.scores});
                        }
                    } else {
                        this.props.socket.emit("writeRecordforOpponent",
                            {name: state.opponent.name, ID: ID,
                             changeValue: state.opponent.offensive += 1,
                             changeScore: state.opponent.scores});
                    }
                    return {state};
                });break;
                        
                case "steals":
                this.setState(state => {
                    if (operator === "-") {
                        if (state.opponent.steals > 0) {
                            this.props.socket.emit("writeRecordforOpponent",
                                {name: state.opponent.name, ID: ID,
                                 changeValue: state.opponent.steals -= 1,
                                 changeScore: state.opponent.scores});
                        }
                    } else {
                        this.props.socket.emit("writeRecordforOpponent",
                            {name: state.opponent.name, ID: ID,
                             changeValue: state.opponent.steals += 1,
                             changeScore: state.opponent.scores});
                    }
                    return {state};
                });break;
                        
                case "assists":
                this.setState(state => {
                    if (operator === "-") {
                        if (state.opponent.assists > 0) {
                            this.props.socket.emit("writeRecordforOpponent",
                                {name: state.opponent.name, ID: ID,
                                 changeValue: state.opponent.assists -= 1,
                                 changeScore: state.opponent.scores});
                        }
                    } else {
                        this.props.socket.emit("writeRecordforOpponent",
                            {name: state.opponent.name, ID: ID,
                             changeValue: state.opponent.assists += 1,
                             changeScore: state.opponent.scores});
                    }
                    return {state};
                });break;
                        
                case "blocks":
                this.setState(state => {
                    if (operator === "-") {
                        if (state.opponent.blocks > 0) {
                            this.props.socket.emit("writeRecordforOpponent",
                                {name: state.opponent.name, ID: ID,
                                 changeValue: state.opponent.blocks -= 1,
                                 changeScore: state.opponent.scores});
                        }
                    } else {
                        this.props.socket.emit("writeRecordforOpponent",
                            {name: state.opponent.name, ID: ID,
                             changeValue: state.opponent.blocks += 1,
                             changeScore: state.opponent.scores});
                    }
                    return {state};
                });break;
                        
                case "fouls":
                this.setState(state => {
                    if (operator === "-") {
                        if (state.opponent.fouls > 0) {
                            this.props.socket.emit("writeRecordforOpponent",
                                {name: state.opponent.name, ID: ID,
                                 changeValue: state.opponent.fouls -= 1,
                                 changeScore: state.opponent.scores});
                        }
                    } else {
                        this.props.socket.emit("writeRecordforOpponent",
                            {name: state.opponent.name, ID: ID,
                             changeValue: state.opponent.fouls += 1,
                             changeScore: state.opponent.scores});
                    }
                    return {state};
                });break;
                        
                default:
                this.setState(state => {
                    if (operator === "-") {
                        if (state.opponent.turnovers > 0) {
                            this.props.socket.emit("writeRecordforOpponent",
                                {name: state.opponent.name, ID: ID,
                                 changeValue: state.opponent.turnovers -= 1,
                                 changeScore: state.opponent.scores});
                        }
                    } else {
                        this.props.socket.emit("writeRecordforOpponent",
                            {name: state.opponent.name, ID: ID,
                             changeValue: state.opponent.turnovers += 1,
                             changeScore: state.opponent.scores});
                    }
                    return {state};
                });break;
            }
        }
        else {
            for (let x = 0; x < this.state.data.length; x++) {
                if (person === this.state.data[x].name) {
                    switch (ID) {
                        case "twoPointMade":
                        this.setState(state => {
                            if (operator === "-") {
                                if (state.data[x].twoPointMade > 0) {
                                    this.props.socket.emit("writeRecord",
                                        {name: person, ID: ID,
                                         changeValue: state.data[x].twoPointMade -= 1,
                                         changeScore: state.data[x].scores -= 2});
                                    this.props.socket.emit("writeScore",
                                        {name: "own", now: state.now,
                                         changeScore: state.quarter.own[state.now] -= 2});
                                }
                            }    
                            else {
                                this.props.socket.emit("writeRecord",
                                    {name: person, ID: ID,
                                     changeValue: state.data[x].twoPointMade += 1,
                                     changeScore: state.data[x].scores += 2});
                                this.props.socket.emit("writeScore",
                                        {name: "own", now: state.now,
                                         changeScore: state.quarter.own[state.now] += 2});
                            }
                            return {state};
                        });break;
                        
                        case "twoPointFail":
                        this.setState(state => {
                            if (operator === "-") {
                                if (state.data[x].twoPointFail > 0) {
                                    this.props.socket.emit("writeRecord",
                                        {name: person, ID: ID,
                                         changeValue: state.data[x].twoPointFail -= 1,
                                         changeScore: state.data[x].scores});
                                }
                            }
                            else {
                                this.props.socket.emit("writeRecord",
                                    {name: person, ID: ID,
                                     changeValue: state.data[x].twoPointFail += 1,
                                     changeScore: state.data[x].scores});
                            }
                            return {state};
                        });break;
                        
                        case "threePointMade":
                        this.setState(state => {
                            if (operator === "-") {
                                if (state.data[x].threePointMade > 0) {
                                    this.props.socket.emit("writeRecord",
                                        {name: person, ID: ID,
                                         changeValue: state.data[x].threePointMade -= 1,
                                         changeScore: state.data[x].scores -= 3});
                                    this.props.socket.emit("writeScore",
                                        {name: "own", now: state.now,
                                         changeScore: state.quarter.own[state.now] -= 3});
                                }
                            }
                            else {
                                this.props.socket.emit("writeRecord",
                                    {name: person, ID: ID,
                                     changeValue: state.data[x].threePointMade += 1,
                                     changeScore: state.data[x].scores += 3});
                                this.props.socket.emit("writeScore",
                                        {name: "own", now: state.now,
                                         changeScore: state.quarter.own[state.now] += 3});
                            }
                            return {state};
                        });break;
                        
                        case "threePointFail":
                        this.setState(state => {
                            if (operator === "-") {
                                if (state.data[x].threePointFail > 0) {
                                    this.props.socket.emit("writeRecord",
                                        {name: person, ID: ID,
                                         changeValue: state.data[x].threePointFail -= 1,
                                         changeScore: state.data[x].scores});
                                }
                            }
                            else {
                                this.props.socket.emit("writeRecord",
                                    {name: person, ID: ID,
                                     changeValue: state.data[x].threePointFail += 1,
                                     changeScore: state.data[x].scores});
                            }
                            return {state};
                        });break;
                        
                        case "freeThrowMade":
                        this.setState(state => {
                            if (operator === "-") {
                                if (state.data[x].freeThrowMade > 0) {
                                    this.props.socket.emit("writeRecord",
                                        {name: person, ID: ID,
                                         changeValue: state.data[x].freeThrowMade -= 1,
                                         changeScore: state.data[x].scores -= 1});
                                    this.props.socket.emit("writeScore",
                                        {name: "own", now: state.now,
                                         changeScore: state.quarter.own[state.now] -= 1});
                                }
                            }
                            else {
                                this.props.socket.emit("writeRecord",
                                    {name: person, ID: ID,
                                     changeValue: state.data[x].freeThrowMade += 1,
                                     changeScore: state.data[x].scores += 1});
                                this.props.socket.emit("writeScore",
                                        {name: "own", now: state.now,
                                         changeScore: state.quarter.own[state.now] += 1});
                            }
                            return {state};
                        });break;
                        
                        case "freeThrowFail":
                        this.setState(state => {
                            if (operator === "-") {
                                if (state.data[x].freeThrowFail > 0) {
                                    this.props.socket.emit("writeRecord",
                                        {name: person, ID: ID,
                                         changeValue: state.data[x].freeThrowFail -= 1,
                                         changeScore: state.data[x].scores});
                                }
                            }
                            else {
                                this.props.socket.emit("writeRecord",
                                    {name: person, ID: ID,
                                     changeValue: state.data[x].freeThrowFail += 1,
                                     changeScore: state.data[x].scores});
                            }
                            return {state};
                        });break;
                        
                        case "defensive":
                        this.setState(state => {
                            if (operator === "-") {
                                if (state.data[x].defensive > 0) {
                                    this.props.socket.emit("writeRecord",
                                        {name: person, ID: ID,
                                         changeValue: state.data[x].defensive -= 1,
                                         changeScore: state.data[x].scores});
                                }
                            }
                            else {
                                this.props.socket.emit("writeRecord",
                                    {name: person, ID: ID,
                                     changeValue: state.data[x].defensive += 1,
                                     changeScore: state.data[x].scores});
                            }
                            return {state};
                        });break;
                        
                        case "offensive":
                        this.setState(state => {
                            if (operator === "-") {
                                if (state.data[x].offensive > 0) {
                                    this.props.socket.emit("writeRecord",
                                        {name: person, ID: ID,
                                         changeValue: state.data[x].offensive -= 1,
                                         changeScore: state.data[x].scores});
                                }
                            }
                            else {
                                this.props.socket.emit("writeRecord",
                                    {name: person, ID: ID,
                                     changeValue: state.data[x].offensive += 1,
                                     changeScore: state.data[x].scores});
                            }
                            return {state};
                        });break;
                        
                        case "steals":
                        this.setState(state => {
                            if (operator === "-") {
                                if (state.data[x].steals > 0) {
                                    this.props.socket.emit("writeRecord",
                                        {name: person, ID: ID,
                                         changeValue: state.data[x].steals -= 1,
                                         changeScore: state.data[x].scores});
                                }
                            }
                            else {
                                this.props.socket.emit("writeRecord",
                                    {name: person, ID: ID,
                                     changeValue: state.data[x].steals += 1,
                                     changeScore: state.data[x].scores});
                            }
                            return {state};
                        });break;
                        
                        case "assists":
                        this.setState(state => {
                            if (operator === "-") {
                                if (state.data[x].assists > 0) {
                                    this.props.socket.emit("writeRecord",
                                        {name: person, ID: ID,
                                         changeValue: state.data[x].assists -= 1,
                                         changeScore: state.data[x].scores});
                                }
                            }
                            else {
                                this.props.socket.emit("writeRecord",
                                    {name: person, ID: ID,
                                     changeValue: state.data[x].assists += 1,
                                     changeScore: state.data[x].scores});
                            }
                            return {state};
                        });break;
                        
                        case "blocks":
                        this.setState(state => {
                            if (operator === "-") {
                                if (state.data[x].blocks > 0) {
                                    this.props.socket.emit("writeRecord",
                                        {name: person, ID: ID,
                                         changeValue: state.data[x].blocks -= 1,
                                         changeScore: state.data[x].scores});
                                }
                            }
                            else {
                                this.props.socket.emit("writeRecord",
                                    {name: person, ID: ID,
                                     changeValue: state.data[x].blocks += 1,
                                     changeScore: state.data[x].scores});
                            }
                            return {state};
                        });break;
                        
                        case "fouls":
                        this.setState(state => {
                            if (operator === "-") {
                                if (state.data[x].fouls > 0) {
                                    this.props.socket.emit("writeRecord",
                                        {name: person, ID: ID,
                                         changeValue: state.data[x].fouls -= 1,
                                         changeScore: state.data[x].scores});
                                }
                            }
                            else {
                                this.props.socket.emit("writeRecord",
                                    {name: person, ID: ID,
                                     changeValue: state.data[x].fouls += 1,
                                     changeScore: state.data[x].scores});
                            }
                            return {state};
                        });break;
                        
                        default:
                        this.setState(state => {
                            if (operator === "-") {
                                if (state.data[x].turnovers > 0) {
                                    this.props.socket.emit("writeRecord",
                                        {name: person, ID: ID,
                                         changeValue: state.data[x].turnovers -= 1,
                                         changeScore: state.data[x].scores});
                                }
                            }
                            else {
                                this.props.socket.emit("writeRecord",
                                    {name: person, ID: ID,
                                     changeValue: state.data[x].turnovers += 1,
                                     changeScore: state.data[x].scores});
                            }
                            return {state};
                        });break;
                    }
                    break;
                }
            }  
        }
    }

    change = e => {
        var original = this.state.now;
        var now = e.target.id;
        this.setState(state => {
            state.now = now;
            return {state}
        })
        this.props.socket.emit("change", {original: original, now: now});
    }

    changeStage = e => {
        console.log("changeStage");
        this.setState(state => {
            state.now = e.now;
            return {state};
        })
    }

    render() {
        return (
        <div className="content" id="content">
            <table className="top">
                <tbody>
                    <Section content={this.props.date} change={this.change}/>
                    <tr>
                        <th className="title">時間</th>
                        <td>{this.props.time}</td>
                    </tr>
                    <Score content={this.props.opponent} own={this.state.quarter.own} other={this.state.quarter.other}/>
                    <tr>
                        <th className="title">球場</th>
                        <td>{this.props.court}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <table id="record">
                <tbody>
                    <tr>
                        <th className="num" rowSpan="2">背號</th>
                        <th className="name" rowSpan="2">名字</th>
                        <th colSpan="4">2分</th>
                        <th colSpan="4">3分</th>
                        <th colSpan="4">罰球</th>
                        <th colSpan="4">籃板</th>
                        <th className="twoHalf" rowSpan="2" colSpan="2">抄截</th>
                        <th className="twoHalf" rowSpan="2" colSpan="2">助攻</th>
                        <th className="twoHalf" rowSpan="2" colSpan="2">火鍋</th>
                        <th className="twoHalf" rowSpan="2" colSpan="2">犯規</th>
                        <th className="twoHalf" rowSpan="2" colSpan="2">失誤</th>
                        <th rowSpan="2" colSpan="2">得分</th>
                    </tr>
                    <Point/>
                </tbody>
                {
                    this.state.data.map(
                        e => <tbody id={this.state.data.indexOf(e)}>
                                <Player id={e.name}
                                        num={e.num}
                                        name={e.name}
                                        twoPointMade={e.twoPointMade}
                                        twoPointFail={e.twoPointFail}
                                        threePointMade={e.threePointMade}
                                        threePointFail={e.threePointFail}
                                        freeThrowMade={e.freeThrowMade}
                                        freeThrowFail={e.freeThrowFail}
                                        defensive={e.defensive}
                                        offensive={e.offensive}
                                        steals={e.steals}
                                        assists={e.assists}
                                        blocks={e.blocks}
                                        fouls={e.fouls}
                                        turnovers={e.turnovers}
                                        scores={e.scores}/>
                                <Button id={e.name} calculate={this.calculate}/>
                             </tbody>
                    )
                }
                <tbody>
                    <tr id="opponent">
                        <td className="opponent" rowSpan="2" colSpan="2">{this.props.opponent}</td>
                        <td id="twoPointMade" colSpan="2">{this.state.opponent.twoPointMade}</td>
                        <td id="twoPointFail" colSpan="2">{this.state.opponent.twoPointFail}</td>
                        <td id="threePointMade" colSpan="2">{this.state.opponent.threePointMade}</td>
                        <td id="threePointFail" colSpan="2">{this.state.opponent.threePointFail}</td>
                        <td id="freeThrowMade" colSpan="2">{this.state.opponent.freeThrowMade}</td>
                        <td id="freeThrowFail" colSpan="2">{this.state.opponent.freeThrowFail}</td>
                        <td id="defensive" colSpan="2">{this.state.opponent.defensive}</td>
                        <td id="offensive" colSpan="2">{this.state.opponent.offensive}</td>
                        <td id="steals" colSpan="2">{this.state.opponent.steals}</td>
                        <td id="assists" colSpan="2">{this.state.opponent.assists}</td>
                        <td id="blocks" colSpan="2">{this.state.opponent.blocks}</td>
                        <td id="fouls" colSpan="2">{this.state.opponent.fouls}</td>
                        <td id="turnovers" colSpan="2">{this.state.opponent.turnovers}</td>
                        <td id="scores"rowSpan="2" colSpan="2">{this.state.opponent.scores}</td>
                    </tr>
                    <Button id="opponent" calculate={this.calculate}/>
                </tbody>
            </table>
            <div>
                <p>背號：<input id="numInput" type="text" placeholder="請輸入#"/></p>
                <p>姓名：<input id="nameInput" type="text" placeholder="請輸入..."/></p>
                <button id="add" onClick={this.addPlayer}>新增球員</button><br/>
                <button id="clear" onClick={this.clearAll}>比賽結束</button>
            </div>
        </div>
        );
    }
        
}

export default Page;
