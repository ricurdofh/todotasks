Todotasks.Views.Task = Backbone.View.extend({
	className : "drag",
	initialize : function(){
		this.template = _.template( $('#task-template').html() );
	},
	render : function(){
		var data = this.model.toJSON();
		var html = this.template(data);

		this.$el.html(html);

	}
});