define([], function() {
	
	var toDoList =  {
		'listItems':
		    [{
		        'id': 0,
		        'text': 'Get milk - 1',
		        'created_at': '2015-08-05T08:40:51.620Z',
		        'completed_at': '',
		        'status':'incomplete'
		    }, {
		        'id': 1, 
		        'text': 'Get eggs - 2',
		        'created_at': '2015-08-06T08:40:51.620Z',
		        'completed_at': '',
		        'status':'incomplete'
		    },{
		        'id': 2,
		        'text': 'Get bread - 3',
		        'created_at': '2015-08-08T08:40:51.620Z',
		        'completed_at': '',
		        'status':'incomplete'
		    },{
		        'id': 3,
		        'text': 'Get soda - 4',
		        'created_at': '2015-08-10T08:40:51.620Z',
		        'completed_at': '',
		        'status': 'incomplete'
		    },{
		        'id': 4,
		        'text': 'Get cookies - 5',
		        'created_at': '2015-08-12T08:40:51.620Z',
		        'completed_at': 'August 1st 2016, 2:30:25 pm',
		        'status':'complete'
		    },
		    {
		        'id': 5,
		        'text': 'Get butter - 6',
		        'created_at': '2015-08-14T08:40:51.620Z',
		        'completed_at': 'August 1st 2016, 2:30:25 pm',
		        'status': 'complete'
		    }
		    ,{
		        'id': 6,
		        'text': 'Strength training - 7',
		        'created_at': '2015-08-14T08:40:51.620Z',
		        'completed_at': '',
		        'status': 'incomplete'
		    }
		    ,{
		        'id': 7,
		        'text': 'Meditation - 8',
		        'created_at': '2015-08-14T08:40:51.620Z',
		        'completed_at': '',
		        'status': 'incomplete'
		    }
		    ,{
		        'id': 8,
		        'text': 'Laugh a lot - 9',
		        'created_at': '2015-08-14T08:40:51.620Z',
		        'completed_at': '',
		        'status': 'incomplete'
		    }
		    ,{
		        'id': 9,
		        'text': 'Play Tennis - 10',
		        'created_at': '2015-08-14T08:40:51.620Z',
		        'completed_at': '',
		        'status': 'incomplete'
		    }]
    	};

    	var maxRecordsPerPage = 5;
	return {
		toDoList : toDoList,
		maxRecordsPerPage : maxRecordsPerPage
	}
});