const express = require('express')
const mongoose = require('mongoose')

const Message = require('./models/message')
const Contest = require('./models/contest')
const Score = require('./models/score')
const Opponent = require('./models/opponent')

// Create server to serve index.html
const app = express()
const http = require('http').Server(app)
const port = process.env.PORT || 3001

// Routing
// app.use(express.static('public'))

// Socket.io serverSocket
const io = require('socket.io')(http)

// Start server listening process.
http.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
})

// Connect to mongo
mongoose.connect('MongoDB_URL', {
    useNewUrlParser: true
})
db = mongoose.connection

db.on('error', error => {
    console.log(error)
})

db.once('open', () => {
    console.log('MongoDB connected!')
    //監聽 Server 連線後的所有事件，並捕捉事件 socket 執行
    io.on('connection', socket => {
        //經過連線後在 console 中印出訊息
        console.log('success connect!')

        // First time running
        var allRes = [];
        Message.find()
            .limit(100)
            .sort({ _id: 1 })
            .exec((err, res) => {
                if (err) throw err
                // io.emit('init', res)
                console.log("init");
                allRes.push(res);
                io.emit('init_all', allRes);
                // console.log(allRes);
            })
        Opponent.find()
            .limit(100)
            .sort({ _id: 1 })
            .exec((err, res) => {
                if (err) throw err
                // io.emit('init_opponent', res)
                console.log("init_opponent");
                allRes.push(res);
                io.emit('init_all', allRes);
                // console.log(allRes);
            })
        Contest.find()
            .limit(100)
            .sort({ _id: 1 })
            .exec((err, res) => {
                if (err) throw err
                console.log("init_contest");
                io.emit('init_contest', res)
                // console.log(allRes);
            })
        Score.find()
            .limit(100)
            .sort({ _id: 1 })
            .exec((err, res) => {
                if (err) throw err
                // io.emit('init_score', res)
                console.log("init_score");
                allRes.push(res);
                io.emit('init_all', allRes);
                // console.log(allRes);
            })

        socket.on('addPlayer', data => {
            let num = data.num;
            let name = data.name;
            let twoPointMade = 0;
            let twoPointFail = 0;
            let threePointMade = 0;
            let threePointFail = 0;
            let freeThrowMade = 0;
            let freeThrowFail = 0;
            let defensive = 0;
            let offensive = 0;
            let steals = 0;
            let assists = 0;
            let blocks = 0;
            let fouls = 0;
            let turnovers = 0;
            let scores = 0;

            // Insert message
            const message = new Message({ num, name, twoPointMade, twoPointFail, threePointMade, threePointFail, freeThrowMade, freeThrowFail, defensive, offensive, steals, assists, blocks, fouls, turnovers, scores })
            message.save((err) => {
                if (err) console.error(err)
                socket.broadcast.emit('updatePlayer', data);
                console.log("add a player");
            })
        })

        socket.on('clearAll', () => {
            console.log("clear player");
            // Remove all chats from collection
            Message.deleteMany({}, () => {})
            Opponent.deleteMany({}, () => {})
            Score.deleteMany({}, () => {})
            Contest.deleteMany({}, () => {
                io.emit('AlreadyclearAll')
            })
        })

        socket.on('writeRecord', data => {
            console.log("writeRecord");
            switch (data.ID) {
                case "twoPointMade":
                Message.updateOne( { name: data.name },
                    { twoPointMade: data.changeValue, scores: data.changeScore },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update success!");
                    }
                );break;
                
                case "twoPointFail":
                Message.updateOne( { name: data.name },
                    { twoPointFail: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update success!");
                    }
                );break;
                
                case "threePointMade":
                Message.updateOne( { name: data.name },
                    { threePointMade: data.changeValue, scores: data.changeScore },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update success!");
                    }
                );break;
                
                case "threePointFail":
                Message.updateOne( { name: data.name },
                    { threePointFail: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update success!");
                    }
                );break;
                
                case "freeThrowMade":
                Message.updateOne( { name: data.name },
                    { freeThrowMade: data.changeValue, scores: data.changeScore },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update success!");
                    }
                );break;
                
                case "freeThrowFail":
                Message.updateOne( { name: data.name },
                    { freeThrowFail: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update success!");
                    }
                );break;
                
                case "defensive":
                Message.updateOne( { name: data.name },
                    { defensive: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update success!");
                    }
                );break;
                
                case "offensive":
                Message.updateOne( { name: data.name },
                    { offensive: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update success!");
                    }
                );break;
                
                case "steals":
                Message.updateOne( { name: data.name },
                    { steals: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update success!");
                    }
                );break;
                
                case "assists":
                Message.updateOne( { name: data.name },
                    { assists: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update success!");
                    }
                );break;
                
                case "blocks":
                Message.updateOne( { name: data.name },
                    { blocks: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update success!");
                    }
                );break;
                
                case "fouls":
                Message.updateOne( { name: data.name },
                    { fouls: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update success!");
                    }
                );break;
                
                case "turnovers":
                Message.updateOne( { name: data.name },
                    { turnovers: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update success!");
                    }
                );break;
            }
            socket.broadcast.emit('updateRecord', data);
            
        })

        socket.on('writeRecordforOpponent', data => {
            console.log("writeRecordforOpponent");
            switch (data.ID) {
                case "twoPointMade":
                Opponent.updateOne( { name: data.name },
                    { twoPointMade: data.changeValue, scores: data.changeScore },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update opponent's record success!");
                    }
                );break;
                
                case "twoPointFail":
                Opponent.updateOne( { name: data.name },
                    { twoPointFail: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update opponent's record success!");
                    }
                );break;
                
                case "threePointMade":
                Opponent.updateOne( { name: data.name },
                    { threePointMade: data.changeValue, scores: data.changeScore },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update opponent's record success!");
                    }
                );break;
                
                case "threePointFail":
                Opponent.updateOne( { name: data.name },
                    { threePointFail: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update opponent's record success!");
                    }
                );break;
                
                case "freeThrowMade":
                Opponent.updateOne( { name: data.name },
                    { freeThrowMade: data.changeValue, scores: data.changeScore },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update opponent's record success!");
                    }
                );break;
                
                case "freeThrowFail":
                Opponent.updateOne( { name: data.name },
                    { freeThrowFail: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update opponent's record success!");
                    }
                );break;
                
                case "defensive":
                Opponent.updateOne( { name: data.name },
                    { defensive: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update opponent's record success!");
                    }
                );break;
                
                case "offensive":
                Opponent.updateOne( { name: data.name },
                    { offensive: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update opponent's record success!");
                    }
                );break;
                
                case "steals":
                Opponent.updateOne( { name: data.name },
                    { steals: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update opponent's record success!");
                    }
                );break;
                
                case "assists":
                Opponent.updateOne( { name: data.name },
                    { assists: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update opponent's record success!");
                    }
                );break;
                
                case "blocks":
                Opponent.updateOne( { name: data.name },
                    { blocks: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update opponent's record success!");
                    }
                );break;
                
                case "fouls":
                Opponent.updateOne( { name: data.name },
                    { fouls: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update opponent's record success!");
                    }
                );break;
                
                case "turnovers":
                Opponent.updateOne( { name: data.name },
                    { turnovers: data.changeValue },
                    function(error) {
                        if (error) console.log(error);
                        else console.log("Update opponent's record success!");
                    }
                );break;
            }
            socket.broadcast.emit('updateRecordforOpponent', data);
        })

        socket.on('writeScore', data => {
            console.log("writeScore");
            if (data.name === "own") {
                // console.log(parseInt(data.now));
                switch (parseInt(data.now)) {
                    case 0:
                    Score.updateOne( { now: data.now },
                        { gb1: data.changeScore },
                        function(error) {
                            if (error) console.log(error);
                            else console.log("Score update success!");
                        }
                    );break;
                    
                    case 1:
                    Score.updateOne( { now: data.now },
                        { gb2: data.changeScore },
                        function(error) {
                            if (error) console.log(error);
                            else console.log("Score update success!");
                        }
                    );break;
                    
                    case 2:
                    Score.updateOne( { now: data.now },
                        { gb3: data.changeScore },
                        function(error) {
                            if (error) console.log(error);
                            else console.log("Score update success!");
                        }
                    );break;
                    
                    case 3:
                    Score.updateOne( { now: data.now },
                        { gb4: data.changeScore },
                        function(error) {
                            if (error) console.log(error);
                            else console.log("Score update success!");
                        }
                    );break;
                }
            }
            else {
                switch (parseInt(data.now)) {
                    case 0:
                    // console.log(data.now);
                    Score.updateOne( { now: data.now },
                        { op1: data.changeScore },
                        function(error) {
                            if (error) console.log(error);
                            else console.log("Score update success!");
                        }
                    );break;
                    
                    case 1:
                    Score.updateOne( { now: data.now },
                        { op2: data.changeScore },
                        function(error) {
                            if (error) console.log(error);
                            else console.log("Score update success!");
                        }
                    );break;
                    
                    case 2:
                    Score.updateOne( { now: data.now },
                        { op3: data.changeScore },
                        function(error) {
                            if (error) console.log(error);
                            else console.log("Score update success!");
                        }
                    );break;
                    
                    case 3:
                    Score.updateOne( { now: data.now },
                        { op4: data.changeScore },
                        function(error) {
                            if (error) console.log(error);
                            else console.log("Score update success!");
                        }
                    );break;
                }
            }
            socket.broadcast.emit('updateScore', data);
        })

        socket.on('FillTheForm', data => {
            let date = data.date;
            let time = data.time;
            let opponent = data.opponent;
            let court = data.court;

            // Insert message
            if (date !== "" && time !== "" && opponent !== "" && court !== "") {
                const contest = new Contest({ date, time, opponent, court })
                contest.save((err) => {
                    if (err) console.error(err)
                    console.log("fill the form");
                })
            }

            let gb1 = 0;
            let gb2 = 0;
            let gb3 = 0;
            let gb4 = 0;
            let op1 = 0;
            let op2 = 0;
            let op3 = 0;
            let op4 = 0;
            let now = 0;

            // Insert message
            const score = new Score({ gb1, gb2, gb3, gb4, op1, op2, op3, op4, now })
            score.save((err) => {
                if (err) console.error(err)
                console.log("upload score");
            })

            let name = data.opponent;
            let twoPointMade = 0;
            let twoPointFail = 0;
            let threePointMade = 0;
            let threePointFail = 0;
            let freeThrowMade = 0;
            let freeThrowFail = 0;
            let defensive = 0;
            let offensive = 0;
            let steals = 0;
            let assists = 0;
            let blocks = 0;
            let fouls = 0;
            let turnovers = 0;
            let scores = 0;

            // Insert message
            const rival = new Opponent({ name, twoPointMade, twoPointFail, threePointMade, threePointFail, freeThrowMade, freeThrowFail, defensive, offensive, steals, assists, blocks, fouls, turnovers, scores })
            rival.save((err) => {
                if (err) console.error(err)
                console.log("have an opponent");
            })
        })

        socket.on('change', stage => {
            console.log("changeStage");
            Score.updateOne( { now: stage.original },
                { now: stage.now },
                  function(error) {
                      if (error) console.log(error);
                      else console.log("change stage success!");
                  }
            );
            socket.broadcast.emit('changeStage', stage);
        })
    })

})

