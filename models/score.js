const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const ScoreSchema = new Schema({
	gb1: {
		type: Number,
		required: [true, 'gb1 field is required.']
	},
	gb2: {
		type: Number,
		required: [true, 'gb2 field is required.']
	},
	gb3: {
		type: Number,
		required: [true, 'gb3 field is required.']
	},
	gb4: {
		type: Number,
		required: [true, 'gb4 field is required.']
	},
	op1: {
		type: Number,
		required: [true, 'op1 field is required.']
	},
	op2: {
		type: Number,
		required: [true, 'op2 field is required.']
	},
	op3: {
		type: Number,
		required: [true, 'op3 field is required.']
	},
	op4: {
		type: Number,
		required: [true, 'op4 field is required.']
	},
	now: {
		type: Number,
		required: [true, 'now field is required.']
	}
})

// Creating a table within database with the defined schema
const Score = mongoose.model('score', ScoreSchema)

// Exporting table for querying and mutating
module.exports = Score
