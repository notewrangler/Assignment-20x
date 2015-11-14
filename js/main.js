

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
      console.log(resp.toJSON());
			var photosData = {"photo": resp.toJSON()};
			console.log(photosData);
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
				"edit": "edit",
        "detail/:objectID": "detail",
        "": "index"
      }
    });

var router = new Router();

router.on('route:detail', function(objectId) {
				console.log(objectId);
				var detailData = {"detail": photos.get(objectId).toJSON()};
				console.log(detailData);
				var detailTemplate = $('#detail').text();
				var detailHTML = Mustache.render(detailTemplate, detailData);
				$('#single-detail').html(detailHTML);
				$('#photo-grid').hide();
				$('#single-detail').show();



		});

	router.on('route:index', function () {
		$('#photo-grid').show();
		$('#single-detail').hide();
		});
});
