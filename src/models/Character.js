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
	
	race:
	{
		type: String,
		required: true,
		trim: false,				
	},
	
	profession:
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
		race: this.race,
		profession: this.profession,
		age: this.age
	};
};

CharacterSchema.statics.findByOwner = function(ownerId, callback)
{
	var search = {owner: mongoose.Types.ObjectId(ownerId)};
	
	return CharacterModel.find(search).select("name age race profession").exec(callback);
};

CharacterSchema.statics.findAll = function(ownerId, callback)
{	
	return CharacterModel.find().select("name age race profession").exec(callback);
};

CharacterModel = mongoose.model("Character", CharacterSchema);

module.exports.CharacterModel = CharacterModel;
module.exports.CharacterSchema = CharacterSchema;