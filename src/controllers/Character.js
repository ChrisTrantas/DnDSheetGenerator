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
	if(!req.body.name || !req.body.age || !req.body.race || !req.body.profession)
	{
		return res.status(400).json({error: "Name, age, race, and class are required"});
	}
	
	// character class = profession
	var characterData = 
	{
		name: req.body.name,
		age: req.body.age,
		race: req.body.race,
		profession: req.body.profession,
		owner: req.session.account._id
	};
	
	var query = 
	{
		name: req.body.name,
		owner: req.session.account._id
	};
	
	Character.CharacterModel.findOne(query, function(err, docs)
	{
		if(err)
		{
			console.log(err);
			return res.status(400).json({error: "An error occured"});
		}	
		if(docs == null)
		{
				
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
		}
		else
		{
			return res.status(400).json({error: "You have already used that name"});
		}
	});
};

var changeCharacter = function(req, res)
{
	if(!req.body.name || !req.body.age || !req.body.race || !req.body.profession)
	{
		return res.status(400).json({error: "Name, age, race, and class are required"});
	}
	
	// character class = profession
	var characterData = 
	{
		name: req.body.name,
		age: req.body.age,
		race: req.body.race,
		profession: req.body.profession,
<<<<<<< HEAD
		owner: req.session.account._id
	};
	
	var query = { name: req.body.name, owner: req.session.account._id };
=======
		id: req.body.id,
		owner: req.session.account._id
	};
	
	var query = { id: req.body.id, owner: req.session.account._id };
>>>>>>> origin/master
	Character.CharacterModel.findOneAndUpdate(query, characterData, function(err, docs)
	{
		if(err)
		{
			console.log(err);
			return res.status(400).json({error: "An error occured"});
		}		
		res.json({redirect: '/editor'});
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

var editor = function(req, res)
{
	Character.CharacterModel.findByOwner(req.session.account._id, function(err, docs)
	{
		if(err)
		{
			console.log(err);
			return res.status(400).json({error: "An error occured"});
		}		
		res.render('editor',{characters: docs});
	});
};

module.exports.makerPage = makerPage;
module.exports.make = makeCharacter;
module.exports.viewPage = viewPage;
module.exports.editor = editor;
module.exports.edit = changeCharacter;