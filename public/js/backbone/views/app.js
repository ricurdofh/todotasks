Todotasks.Views.App = Backbone.View.extend({
	initialize : function ($el) {
		this.$el = $el;
	},
	events : {
		"click #save" : "save",
		"click img" : "show_delete",
		"click #delete" : "delete",
		"click .cancel_del" : "cancel_del",
		"DOMNodeInserted .drop" : "update_status"
	},
	save : function (ev) {
		ev.preventDefault();

		var task = $('input[name=task]').val();
		var status = "todo";
		var data = {			
			"task"		:	task,
			"status"	: 	status
		};
		var model = new Todotasks.Models.Task(data);

		model.save();

		window.collections.tasks.fetch();

		$('#basicModal').modal('hide')
	},
	update_status : function(ev){
		window.collections.tasks.each(function (model) {
			// console.log($(ev.target).data('id'))
			if (model.id === $(ev.target).data('id')){
				model.attributes.status = ev.currentTarget.id;
				model.save();
			}
		});
	},
	show_delete : function (ev){
		window.collections.tasks.each(function (model) {
			views.app.elem = $(ev.target.offsetParent);
			if (model.id === views.app.elem.data('id')){
				views.app.del = model;
				$('#confirm-delete').modal('show');
			}
		});
	},
	delete : function (ev){
		$('#confirm-delete').modal('hide');
		views.app.elem.remove();
		this.del.destroy();
		this.del = "";
	},
	cancel_del : function (ev){
		this.del = "";
	}
});