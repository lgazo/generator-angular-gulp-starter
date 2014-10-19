var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
	prepare: function() {
		this.mkdir('.settings');

		this.context = this.config.get('context');
	},
	installingGulpStarter : function() {
		this.src.copy('.settings/_.jsdtscope', '.settings/.jsdtscope');
		
		this.template('_.project', '.project', this.context);
	}	
});
