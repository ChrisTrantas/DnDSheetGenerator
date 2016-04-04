var mongoose = require("mongoose");
var _ = require("underscore");
var CharacterModel;
var setName = function(name){return _.escape(name).trim();};

var CharacterSchema = new mongoose.Schema(
{
	name: 
	{
		type: String,
		required: true,
		trim: true,
		set: setName
	},
	
	age: 
	{
		type: Number,
		min: 0,
		required: true
	},
	
	color:
	{
		type: String,
		required: true,
		trim: false,				
	},
	
	owner:
	{
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: "Account"
	},
	
	createdData:
	{
		type: Date,
		default: Date.now
	}
});

CharacterSchema.methods.toAPI = function()
{
	return {
		name: this.name,
		age: this.age,
		color: this.color
	};
};

CharacterSchema.statics.findByOwner = function(ownerId, callback)
{
	var search = {owner: mongoose.Types.ObjectId(ownerId)};
	
	return CharacterModel.find(search).select("name age color").exec(callback);
};

CharacterSchema.statics.findAll = function(ownerId, callback)
{	
	return CharacterModel.find().select("name age color").exec(callback);
};

CharacterModel = mongoose.model("Character", CharacterSchema);

module.exports.CharacterModel = CharacterModel;
module.exports.CharacterSchema = CharacterSchema;