var controllers = require("./controllers");
var mid = require("./middleware");
var router = function(app)
{
	app.get("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
	app.post("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
	app.get("/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
	app.post("/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
	app.get("/logout", mid.requiresLogin, controllers.Account.logout);
	app.get("/maker", mid.requiresLogin, controllers.Character.makerPage);
	app.post("/maker", mid.requiresLogin, controllers.Character.make);
	app.get("/", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
	app.get("/view", mid.requiresLogin, controllers.Character.viewPage);
	app.get("/editor", mid.requiresLogin, controllers.Character.editor);
	app.post("/editor", mid.requiresLogin, controllers.Character.edit);
};

module.exports = router;