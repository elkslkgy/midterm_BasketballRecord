const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const MessageSchema = new Schema({
	num: {
		type: Number,
		required: [true, 'Number field is required.']
	},
	name: {
		type: String,
		required: [true, 'Name field is required.']
	},
	twoPointMade: {
		type: Number,
		required: [true, 'TwoPointMade field is required.']
	},
	twoPointFail: {
		type: Number,
		required: [true, 'TwoPointFail field is required.']
	},
    threePointMade: {
		type: Number,
		required: [true, 'ThreePointMade field is required.']
	},
	threePointFail: {
		type: Number,
		required: [true, 'ThreePointFail field is required.']
	},
    freeThrowMade: {
		type: Number,
		required: [true, 'freeThrowMade field is required.']
	},
    freeThrowFail: {
		type: Number,
		required: [true, 'freeThrowFail field is required.']
	},
    defensive: {
		type: Number,
		required: [true, 'defensive field is required.']
	},
    offensive: {
		type: Number,
		required: [true, 'offensive field is required.']
	},
    steals: {
		type: Number,
		required: [true, 'Steals field is required.']
	},
    assists: {
		type: Number,
		required: [true, 'Assists field is required.']
	},
    blocks: {
		type: Number,
		required: [true, 'Blocks field is required.']
	},
    fouls: {
		type: Number,
		required: [true, 'Fouls field is required.']
	},
    turnovers: {
		type: Number,
		required: [true, 'Turnovers field is required.']
	},
    scores: {
		type: Number,
		required: [true, 'Scores field is required.']
	}
})

// Creating a table within database with the defined schema
const Message = mongoose.model('message', MessageSchema)

// Exporting table for querying and mutating
module.exports = Message
