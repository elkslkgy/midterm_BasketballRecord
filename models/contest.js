const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const ContestSchema = new Schema({
	date: {
		type: String,
		required: [true, 'Date field is required.']
	},
	time: {
		type: String,
		required: [true, 'Time field is required.']
	},
	opponent: {
		type: String,
		required: [true, 'Opponent field is required.']
	},
	court: {
		type: String,
		required: [true, 'Court field is required.']
	}
})

// Creating a table within database with the defined schema
const Contest = mongoose.model('contest', ContestSchema)

// Exporting table for querying and mutating
module.exports = Contest
