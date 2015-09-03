'use strict';
var fs			= require('fs');
var yeoman		= require('yeoman-generator');
var string		= require('underscore.string');
var chalk		= require('chalk');
var zip			= null;
var now			= new Date();
var date		= now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate();
var framework	= null;

module.exports = yeoman.generators.Base.extend({
	
	prompting: function () {
		var done = this.async();

		var prompts = [{
			type: 'input',
			name: 'tpl_name',
			message: 'The name of your template?',
			default: 'joomla-template'
		},{
			type: 'text',
			name: 'tpl_description',
			message: 'The description of your template?',
			default: 'A basic Joomla Template.'
		},{
			type: 'text',
			name: 'tpl_version',
			message: 'The version of your template?',
			default: '0.0.1'
		},{
			type: 'text',
			name: 'tpl_license',
			message: 'The license of your template?'
		},{
			type: 'text',
			name: 'tpl_author',
			message: 'What\'s your name?'
		},{
			type: 'text',
			name: 'tpl_author_email',
			message: 'What\'s your e-mail address?'
		},{
			type: 'text',
			name: 'tpl_homepage',
			message: 'What\'s the URL of your website?'
		},{
			type: 'list',
			name: 'tpl_framework',
			message: 'Which framework would you like to use?',
			choices: [{
				name: 'Bootstrap',
				value: 'bootstrap'
			},{
				name: 'Foundation',
				value: 'foundation'
			}]
		},{
			type: 'checkbox',
			name: 'tpl_libraries',
			message: 'Which Library would you like to use?',
			choices: [{
				name: 'Modernizr',
				value: 'modernizr'
			},{
				name: 'Respond',
				value: 'respond'
			}]
		},{
			type: 'confirm',
			name: 'tpl_zip',
			message: 'Do you want to zip the template to install it?',
			default: true
		}];

		this.prompt(prompts, function (props) {
			this.props = props;
			zip = props.tpl_zip;
			// To access props later use this.props.someOption;

			done();
		}.bind(this));
	},

	writing: {
		
		app: function () {
			
			var i				= 0,
				file			= '',
				files			= [],
				variables		= [],
				fileList		= [],
				fileString		= []
				framework		= this.props.tpl_framework;

			this.destinationRoot( this.props.tpl_name );
			
			fileList = [
				{type: 'folder',	name: 'css'},
				{type: 'folder',	name: 'fonts'},
				{type: 'folder',	name: 'html'},
				{type: 'folder',	name: 'images'},
				{type: 'folder',	name: 'js'},
				{type: 'folder',	name: 'language'},
				{type: 'filename',	name: 'component.php'},
				{type: 'filename',	name: 'error.php'},
				{type: 'filename',	name: 'favicon.ico'},
				{type: 'filename',	name: 'index.html'},
				{type: 'filename',	name: 'index.php'},
				{type: 'filename',	name: 'offline.php'},
				{type: 'filename',	name: 'template_preview.png'},
				{type: 'filename',	name: 'template_thumbnail.png'},
				{type: 'filename',	name: 'templateDetails.xml'}
			];
			
			fileList.forEach(function(file) {
				fileString += '\n\t\t<' + file.type + '>' + file.name + '</' + file.type + '>';
			});
			
			fileString += '\n\t';
			
			variables = {
				tpl_name:			this.props.tpl_name,
				tpl_version:		this.props.tpl_version,
				tpl_date:			date,
				tpl_description:	this.props.tpl_description,
				tpl_author:			this.props.tpl_author,
				tpl_author_email:	this.props.tpl_author_email,
				tpl_homepage:		this.props.tpl_homepage,
				tpl_license:		this.props.tpl_license,
				tpl_name_human:		string.humanize(this.props.tpl_name),
				tpl_name_upper:		string.underscored(this.props.tpl_name).toUpperCase(),
				tpl_files:			fileString,
			};
			
			console.log('Create files...');
			
			this.fs.copyTpl(
				this.templatePath('_bower.json'),
				this.destinationPath('bower.json'),
				variables
			);
		
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'),
				variables
			);
			
			this.fs.copyTpl(
				this.templatePath('_templateDetails.xml'),
				this.destinationPath('templateDetails.xml'),
				variables
			);
			
			this.fs.copyTpl(
				this.templatePath('_index.php'),
				this.destinationPath('index.php'),
				variables
			);
			
			this.fs.copyTpl(
				this.templatePath('_index.html'),
				this.destinationPath('language/index.html'),
				variables
			);
			
			this.fs.copyTpl(
				this.templatePath('_index.html'),
				this.destinationPath('language/en-GB/index.html'),
				variables
			);
			
			this.fs.copyTpl(
				this.templatePath('_language/en-GB/en-GB.tpl_tpl_name.ini'),
				this.destinationPath('language/en-GB/en-GB.tpl_' + variables.tpl_name + '.ini'),
				variables
			);
			
			this.fs.copyTpl(
				this.templatePath('_language/en-GB/en-GB.tpl_tpl_name.sys.ini'),
				this.destinationPath('language/en-GB/en-GB.tpl_' + variables.tpl_name + '.sys.ini'),
				variables
			);
			
			files = [
				'css',
				'fonts',
				'helpers',
				'html',
				'images',
				'js',
				'source',
				'.bowerrc',
				'component.php',
				'error.php',
				'favicon.ico',
				'Gruntfile.js',
				'index.html',
				'offline.php',
				'template_preview.png',
				'template_thumbnail.png'
			];
			
			for(; i < files.length; i++) {
				file = files[i];
				this.fs.copy(
					this.templatePath('_' + file),
					this.destinationPath(file)
				);
			}
		
		},
	
	},

	install: function () {
		
		var THIS = this;
		
		THIS.installDependencies({
			callback: function(){
				if( zip ) {
					THIS.spawnCommand('grunt', ['zip']);
				} else {
					THIS.spawnCommand('grunt');
				}				
			}
		});
		
	}
	
});
