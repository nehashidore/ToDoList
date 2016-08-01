define(['jquery',
	    'backbone',
	    '../vendor/text!templates/todoItem.html',
	    '../vendor/text!templates/listParent.html',
	    'toDoModel',
	    'toDoCollection',
	    'common',
	    'moment'
	    ], function($,Backbone, toDoTmpl, listParentTmpl, toDoItem, toDoList, data, moment){
	
	'use strict';
	var mainView = Backbone.View.extend({
		el : $('#parentWrapper'),
		template : _.template(listParentTmpl),
		events: {
			'click .status' : 'filterItems',
			'keypress #typeToDoItem' : 'addItem',
			'click .pagination li' : 'paginate'
		},
		initialize : function() {
			this.start = 0;
			this.end = data.maxRecordsPerPage;
			this.filter = 'all';
			this.listItems = [];
			this.collection = toDoList.toDoCollection;
			this.createPages();
			this.createListItemViews();
		},

		createPages : function() {
			var arr = [];
			var numofPages = this.collection.length / this.end;
			$(".pagination").empty();
			for(var i = 0; i < numofPages; i++) {
				var pageNum = i+1;
				arr.push('<li data-num=' + pageNum + '><a href="javascript:void(0)">' + pageNum + '</a></li>');
			}
			$(".pagination").append(arr.join(''));
		},

		/** This function loops through the list collection and creates a view for each list item and appends it to the list.
		    This function is called when a pagination item is clicked 
		    **/

		createListItemViews : function() {
			var that = this;
			this.filterCollection = this.collection;

			/** Check for the filter **/
			if(this.filter == 'complete' || this.filter == "incomplete")
				this.filterCollection = this.collection.where({'status' : this.filter});
			this.paginateCollection = this.filterCollection.slice(this.start, this.end);
			_.each(this.paginateCollection, function(mdl){
				var eachItemView = new listItemView({model : mdl, collection: that.collection});
				that.listItems.push(eachItemView);
				$('#listItemsList').append(eachItemView.$el);
			});
		},

		paginate : function(evt) {
			var currTarget = evt.currentTarget,
			pageNum = $(currTarget).attr('data-num');
			this.start = (parseInt(pageNum)-1)*data.maxRecordsPerPage;
			this.end = this.start + data.maxRecordsPerPage;
			$("#listItemsList").empty();
			/** Removes all the views on the previous page **/
			_.each(this.listItems, function(view){
				view.remove();
			});
			this.createListItemViews();
		},


		/** Adds a new todo Item. Saves the new model to the backend (model.save) and adds the new item to the end of the current page **/
		addItem : function(evt) {
			var newMdl, newMdlView;
			if(evt.charCode == 13){
				console.log('Item Added');
				var newItemObj = {
					'text' : $("#typeToDoItem").val(),
					'id': '',
					'status' : 'incomplete',
					'created_at' :'',
					'completed_at' : ''
				};
				$("#typeToDoItem").val('');
				newMdl = new toDoItem.toDoModel(newItemObj),
				newMdlView = new listItemView({model : newMdl});
				$('#listItemsList').prepend(newMdlView.$el);

				/* Adds the newly created todo item to the toDoList collection */
				this.collection.add(newMdl, {at:0});
				
				/* Saving the newly created item to the backend */
				newMdl.save();
				//this.paginate();
				this.createPages();
			}
		},

		render : function() {
			this.$el.html(this.template());
		},

		/** Filter items **/
		filterItems : function(evt){
			var listItems = $("#listItemsList li"),
			currTarget = evt.currentTarget;
			this.filter = $(currTarget).attr('data-status');
			
			$("#listItemsList").empty();
			/** Removes all the views on the previous page **/
			_.each(this.listItems, function(view){
				view.remove();
			});
			this.createListItemViews();
		}
	});

	var listItemView = Backbone.View.extend({
		template : _.template(toDoTmpl),
		events : {
			'click .toggle' : 'changeStatus',
			'mouseover .view' : 'displayTrash',
			'mouseout .view' : 'hideTrash',
			'keydown .edit' : 'revertEdit',
			'click .fa-trash' : 'deleteToDo',
			'keypress .inputText' : 'updateToDo',
			'dblclick .view' : 'editListItem'
		},
		initialize : function() {
			this.render();
		},

		render : function() {
			this.$el.html(this.template(this.model.toJSON()));
		},

		changeStatus : function(evt) {
			var dt = moment().format('MMMM Do YYYY, h:mm:ss a'),
			currTarget = evt.currentTarget,
			parent = $(currTarget).parent();
			if($(currTarget).is(':checked')) {
				this.model.set({'completed_at':dt});
				this.model.set({'status':'complete'});
				$(parent).addClass('complete');
				$(parent).find('.dateFormat').text(dt);
			}else {
				this.model.set({'completed_at':''});
				$(parent).removeClass('complete');
				$(parent).find('.dateFormat').text('');
			}
			/* Saves the changes to the toDoItem to the backend */
			this.model.save();
		},

		/** Displays the trask icon when the user hovers over the todo item **/
		displayTrash : function(evt) {
			var currTarget = evt.currentTarget;
			$(currTarget).find(".fa-trash").show();
			$(currTarget).find(".dateFormat").show();
		},

		/** Hides the trash icon and completedDate on mouse out **/
		hideTrash : function(evt) {
			var currTarget = evt.currentTarget;
			$(currTarget).find(".fa-trash").hide();
			$(currTarget).find(".dateFormat").hide();
		},

		/** Deletes a ToDo item **/
		deleteToDo : function(evt) {
			/** This method makes API call with the Item ID to be deleted at the backend **/
			this.model.destroy();
			this.remove();
		},

		editListItem : function() {
			$(this.$el).find(".edit").removeClass("hidden");
			$(this.$el).find(".view").addClass("hidden");
		},

		/** Updates the todo item with a new name **/
		updateToDo : function(evt) {
			var currTarget = evt.currentTarget;
			console.log(evt.charCode);
			if(evt.charCode == 13) {
				var newText = $(currTarget).val();
				/** This saves(updates) the model by making API call to the backend with the menuitem ID **/
				this.model.save("text",newText, {
					success: function(response){
						$(this.$el).find(".edit").addClass("hidden");
						$(this.$el).find(".view").removeClass("hidden");
					}.bind(this),
					error: function(e){
						var newName = $(".edit").val();
						$(this.$el).find(".edit").addClass("hidden");
						$(this.$el).find(".view").removeClass("hidden");
						$(this.$el).find(".view").find('.toDoItemName').text(newName);
					}.bind(this)
				});
			}
		},

		/** Reverts edit when clicked on escape button **/
		revertEdit : function(evt) {
			//console.log(evt.which);
			if(evt.which == 27) {
				//alert("escape pressed");
				$(this.$el).find(".edit").addClass("hidden");
				$(this.$el).find(".view").removeClass("hidden");
			}
		}
	});

	return mainView;

});