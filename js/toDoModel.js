define(['backbone'], function(Backbone){
	'use strict';

	var toDoModel = Backbone.Model.extend({

		/*Root url which will be used for CRUD actions - Create, Update and Delete. If an existing item is being updated 
		or deleted, corresponding id will be appended to the url in the /:id format */

		urlRoot : 'http://private-anon-d06d53393a-todoapp10.apiary-mock.com/to-do',

		/* Default properties of a ToDo list item */
		defaults : {
			'text' : '',
			'id' : '',
			'created_at' : '',
			'completed_at' : '',
			'status' : ''
		}
	});

	return {
		toDoModel : toDoModel,
	}
	
});