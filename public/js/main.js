$(document).ready(function(){
	window.views.app = new Todotasks.Views.App( $('body') );
	window.collections.tasks = new Todotasks.Collections.Tasks();
	window.collections.tasks.on('add', function (model){
		var view = new Todotasks.Views.Task({model: model});
		view.render();
		view.$el.data('id', model.toJSON().id);
		view.$el.appendTo("#"+model.toJSON().status);

		$(".drag").draggable({
			cursor: 'move',
			revert : 'invalid'
		});
	});

	window.collections.tasks.fetch();

	$(".drop")
		.droppable({
			accept: ".drag",
			drop: function (ev, ui){
				$(this).removeClass("over");
				$(ui.draggable).detach().css({top: 0,left: 0}).appendTo($(this));
			},
			over: function (ev, ui){
				$(this).addClass("over");
			},
			out: function (ev, ui){
				$(this).removeClass("over");
			}
		});
});