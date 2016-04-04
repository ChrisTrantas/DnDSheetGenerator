var _ = require("underscore");
var models = require("../models");
var Character = models.Character;
var makerPage = function(req, res)
{
	Character.CharacterModel.findByOwner(req.session.account._id, function(err, docs)
	{
		if(err)
		{
			console.log(err);
			return res.status(400).json({error: "An error occured"});
		}		
		res.render('app', {characters: docs});
	});
};

var makeCharacter = function(req, res)
{
	if(!req.body.name || !req.body.age)
	{
		return res.status(400).json({error: "Both name and age are required"});
	}
	
	var characterData = 
	{
		name: req.body.name,
		age: req.body.age,
		color: req.body.color,
		owner: req.session.account._id
	};
	
	var newCharacter = new Character.CharacterModel(characterData);
	
	newCharacter.save(function(err)
	{
		if(err)
		{
			console.log(err);
			return res.status(400).json({error: "An error occured"});
		}		
		res.json({redirect: '/maker'});
	});
};


var viewPage = function(req, res)
{
	Character.CharacterModel.findAll(req.session.account._id, function(err, docs)
	{
		if(err)
		{
			console.log(err);
			return res.status(400).json({error: "An error occured"});
		}		
		res.render('view',{characters: docs});
	});
};

module.exports.makerPage = makerPage;
module.exports.make = makeCharacter;
module.exports.viewPage = viewPage;