requirejs.config({
	paths : {
		'jquery' : '../vendor/jquery-3.1.0.min',
		'bootstrap' : '../vendor/bootstrap.min',
		'underscore' : '../vendor/underscore-min',
		'backbone' : '../vendor/backbone-min',
		'moment' : '../vendor/moment'
	},

	shim: {
        "underscore": {
            exports: "_"
        }
    }
});

requirejs(['jquery',
		   'backbone',
		   'router'], 
	function($, Backbone,Router){
		new Router();
		Backbone.history.start();
});
