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
	
	strength:
	{
		type: Number,
		min: 0,
		required: true				
	},
	
	dexterity:
	{
		type: Number,
		min: 0,
		required: true				
	},
	
	constitution:
	{
		type: Number,
		min: 0,
		required: true				
	},
	
	intelligence:
	{
		type: Number,
		min: 0,
		required: true				
	},
	
	wisdom:
	{
		type: Number,
		min: 0,
		required: true				
	},
	
	charisma:
	{
		type: Number,
		min: 0,
		required: true				
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
		age: this.age,
		strength: this.strength,
		dexterity: this.dexterity,
		constitution: this.constitution,
		intelligence: this.intelligence,
		wisdom: this.wisdom,
		charisma: this.charisma,
	};
};

CharacterSchema.statics.findByOwner = function(ownerId, callback)
{
	var search = {owner: mongoose.Types.ObjectId(ownerId)};
	
	return CharacterModel.find(search).select("name age race profession strength dexterity constitution intelligence wisdom charisma").exec(callback);
};

CharacterSchema.statics.findAll = function(ownerId, callback)
{	
	return CharacterModel.find().select("name age race profession strength dexterity constitution intelligence wisdom charisma").exec(callback);
};

CharacterModel = mongoose.model("Character", CharacterSchema);

module.exports.CharacterModel = CharacterModel;
module.exports.CharacterSchema = CharacterSchema;