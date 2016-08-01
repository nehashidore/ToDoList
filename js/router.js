
define([
	'jquery',
	'backbone',
	'main'
], function ($, Backbone, home) {
	var ToDoRouter = Backbone.Router.extend({
		routes : {
			'' : 'home',
			 '/user/:id' : 'user'
		},

		home : function() {
			new home();
		}
	});

	//var newRouter = new ToDoRouter();
	//Backbone.history.start();

	return ToDoRouter;
});
