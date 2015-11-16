

$(document).ready(function(){

	$("body").on('click', "a", function(e){
  e.preventDefault();
  var href = $(this).attr('href');
	console.log(href);
  // href = href.substr(1);
  router.navigate(href, {trigger:true});
	});


var Photo = Backbone.Model.extend({
	initialize: function(){

	},
	defaults: {
		name: null,
		url: null,
		description: null,
		username: null
	},
	_parse_class_name: "Photo"

});

var PhotoCollection = Backbone.Collection.extend({
	model: Photo,
	_parse_class_name: "Photo"
});

var photos = new PhotoCollection();

photos.fetch({
      success: function(resp) {
			var photosData = {"photo": resp.toJSON()};
			console.log(photosData);
			//Mustache render to template index;
      var photosTemplate = $('#photos').text();
      var photosHTML = Mustache.render(photosTemplate, photosData);
      $('#photo-grid').html(photosHTML);

      }, error: function (err) {
        console.log("error: ", err);
      }
    });

var Router = Backbone.Router.extend({
      initialize: function () {
        Backbone.history.start({pushState: true});
      },
      routes: {
				"add": "add",
				"edit/:objectId": "edit",
        "detail/:objectId": "detail",
        "": "index"
      }
    });

var router = new Router();

router.on('route:detail', function(objectId) {
		var detailData = {"detail": photos.get(objectId).toJSON()};
		var detailTemplate = $('#detail').text();
		var detailHTML = Mustache.render(detailTemplate, detailData);
		$('#single-detail').html(detailHTML);
		$('#photo-grid').hide();
		$('#single-detail').show();
	});

router.on('route:edit', function(objectId){
		var updateData = photos.get(objectId);
		var editData = {"edit": photos.get(objectId).toJSON()};
		var editTemplate = $('#edit').text();
		var editHTML = Mustache.render(editTemplate, editData);
		$('#single-detail').html(editHTML);
			$('#single-detail').on('click', 'a', function(e){
				e.preventDefault();
				var newName = $('#edit-name').val();
				var newDesc = $('#edit-description').val();
				var href = $(this).attr('href');
				updateData.set({name: newName, description: newDesc});
				updateData.save({},{
						success: function(){console.log("saved");},
						error: function(err){console.log(err);}
				});
				router.navigate(href, {trigger:true});
			});
	});

	// router.on('route:add', function(){
	// 		var photo = new Photo();
	// 		var addData = {"add":{
	// 				"url": "",
	// 				"name": "",
	// 				"description": "",
	// 				"username": ""
	// 			}
	// 		};
	// 		var addTemplate = $('#add').text();
	// 		var addHTML = Mustache.render(addTemplate, addData);
	// 		$('#single-detail').html(addHTML);
	// 			$('#single-detail').on('click', 'a', function(e){
	// 				e.preventDefault();
	// 				var addName = $('#edit-name').val();
	// 				var addDesc = $('#edit-description').val();
	// 				var href = $(this).attr('href');
	// 				photo.set({url: addURL, name: addName, description: addDesc});
	// 				photo.save({},{
	// 						success: function(){console.log("saved");},
	// 						error: function(err){console.log(err);}
	// 				});
	// 				router.navigate(href, {trigger:true});
	// 			});
	// 	});


router.on('route:index', function () {
		$('#photo-grid').show();
		$('#single-detail').hide();
	});

});
