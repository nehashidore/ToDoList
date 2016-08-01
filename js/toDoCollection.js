define(['toDoModel', 'common'], function(toDoMdl, data){
	
	'use strict';
	var listData = data.toDoList['listItems'];

	var toDoCollection = Backbone.Collection.extend({
		model : toDoMdl.toDoModel,
		initialize : function() {
			console.log('ToDoCollection Initialized', this);
		}
	});
	var toDoList = new toDoCollection(listData);
	
	return {
		toDoCollection : toDoList
	}
});