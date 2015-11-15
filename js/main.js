

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
				"new": "new",
				"edit/:objectId": "edit",
				"update/:objectId": "update",
        "detail/:objectId": "detail",
        "": "index"
      }
    });

var router = new Router();

router.on('route:detail', function(objectId) {
			var detailData = {"detail": photos.get(objectId).toJSON()};
			console.log(detailData);
				//Mustache render image to left side

			var detailWordsTemplate =	$('detail-words').text();
			console.log(detailWordsTemplate);
			var detailWordsHTML = Mustache.render(detailWordsTemplate, detailData);
			console.log(detailWordsHTML);
			$('#detail-text').html(detailWordsHTML);

			// var detailImageTemplate = $('#detail-image').text();
			// var detailImageHTML = Mustache.render(detailImageTemplate, detailData);
			// $('#detail-photo').html(detailImageHTML);
				//Mustache render text to right side



			$('#photo-grid').hide();
			$('#single-detail').show();
		});

router.on('route:edit', function(objectId) {
			console.log(objectId);
			var editData = {'edit': photos.get(objectId).toJSON()};
			console.log(editData);
			var editTemplate = $('#edit').text();
			var editHTML = Mustache.render(editTemplate, editData);
			$('#detail-text').html(editHTML);
			$('#stats').hide();
			$('#edit-stats').show();
});

router.on('route:update' , function(objectId) {


});

router.on('route:index', function () {
	$('#photo-grid').show();
	$('#single-detail').hide();
	});
});
