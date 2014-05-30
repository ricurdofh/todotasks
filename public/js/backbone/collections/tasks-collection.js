Todotasks.Collections.Tasks = Backbone.Collection.extend({
	model: Todotasks.Models.Task,
	url:'/tasks/',
	name:'tasks'
});