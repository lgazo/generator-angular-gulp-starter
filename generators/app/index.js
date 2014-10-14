var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
	promptTask : function() {
		var done = this.async();
		this.context = {};
		
		this.prompt([ 
		{
			type : 'input',
			name : 'name',
			message : 'Your project name',
			'default' : this.appname
		},
		{
			type : 'input',
			name : 'version',
			message : 'Your project version',
			'default' : '1.0.0'
		},
		{
			type : 'input',
			name : 'author',
			message : 'Author of the project',
			'default' : 'John Smith <john@seges.com>'
		},
		{
			type : 'input',
			name : 'license',
			message : 'Your project license',
			'default' : 'MIT'
		},
		{
			type: 'checkbox',
			name: 'js_frameworks',
			message: 'JavaScript framework libraries to include',
			'default': ['angular', 'angular-animate', 'angular-route', 'angular-resource', 'jquery'],
			choices: ['angular', 'angular-animate', 'angular-route', 'angular-resource', 'jquery']
		},
		{
			type: 'checkbox',
			name: 'css_frameworks',
			message: 'CSS frameworks to include',
			'default': ['foundation', 'angular-foundation', 'animate.css', 'fontawesome'],
			choices: ['foundation', 'angular-foundation', 'animate.css', 'fontawesome']
		}
		], function(answers) {
			this.context.app_name = answers.name;
			this.context.version = answers.version;
			this.context.author = answers.author;
			this.context.license = answers.license;
			this.context.bower_dependencies = [];
			this.context.bower_dependencies.push.apply(this.context.bower_dependencies, answers.js_frameworks);
			this.context.bower_dependencies.push.apply(this.context.bower_dependencies, answers.css_frameworks);
			
			done();
		}.bind(this));
	},
	prepareProject: function() {
		this.mkdir('src');
		this.mkdir('src/images');
		this.mkdir('src/javascript');
		this.mkdir('src/partials');
		this.mkdir('src/sass');
	},
	installingGulpStarter : function() {
		
		
		this.src.copy('_gulpfile.js', 'gulpfile.js');
		
		this.template('_package.json', 'package.json', this.context);
		
//		this.npmInstall([ '/usr/local/lib/node_modules/gulp-starter' ], {
//			'saveDev' : true
//		}, done);
		
		this.on('end', function() {
			var done = this.async();
			this.npmInstall([], {}, done);
		});
	},
	prepareBower: function() {
		this.src.copy('_.bowerrc', '.bowerrc');
		
		this.template('_bower.json', 'bower.json', this.context);
	},
	installBowerDependencies : function() {
		this.on('end', function() {
			var done = this.async();
			this.bowerInstall(this.context.bower_dependencies, { save: true }, done);
		});
	},
	prepareGit: function() {
		this.src.copy('_.gitignore','.gitignore');
	},
	prepareAngularProject: function() {
		this.template('src/_index.html', 'src/index.html', this.context);
		
		this.template('src/javascript/_module.js', 'src/javascript/module.js', this.context);
		this.template('src/javascript/_MainConfig.js', 'src/javascript/MainConfig.js', this.context);
		this.template('src/javascript/dashboard/_module.js', 'src/javascript/dashboard/module.js', this.context);
		this.template('src/javascript/dashboard/_DashboardController.js', 'src/javascript/dashboard/DashboardController.js', this.context);
		
		this.template('src/partials/dashboard/_index.html', 'src/partials/dashboard/index.html', this.context);
		
		this.template('src/sass/_app.sass', 'src/sass/app.sass', this.context);
	}
	
});
