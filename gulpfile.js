'use strict';

var gulp = require( 'gulp' );
var server = require( 'browser-sync' ).create();
var plumber = require( 'gulp-plumber' );
var concat = require( 'gulp-concat' );
var imagemin = require( 'gulp-imagemin' );
var newer = require( 'gulp-newer' );
var run = require( 'run-sequence' );
var del = require( 'del' );

gulp.task( 'html', function ()
{
	var htmlmin = require( 'gulp-htmlmin' );

	return gulp.src( 'source/**/*.html' )
	.pipe( plumber() )
	.pipe( htmlmin(
	{
		removeStyleLinkTypeAttributes: true,
		removeScriptTypeAttributes: true,
		collapseWhitespace: true,
		removeComments: true
	}
	) )
	.pipe( gulp.dest( 'build' ) )
	.pipe( server.stream() );
}
);

gulp.task( 'css', function ()
{
	var postcss = require( 'gulp-postcss' );
	var less = require( 'gulp-less' );
	var mqpacker = require( 'css-mqpacker' );
	var autoprefixer = require( 'autoprefixer' );
	var cssmin = require( 'gulp-csso' );

	return gulp.src( 'source/less/style.less' )
	.pipe( plumber() )
	.pipe( less() )
	.pipe( postcss(
		[
			mqpacker(),
			autoprefixer()
		]
		) )
	.pipe( cssmin() )
	.pipe( gulp.dest( 'build/css' ) )
	.pipe( server.stream() );
}
);

gulp.task( 'js', function ()
{
	var uglify = require( 'gulp-uglify' );

	return gulp.src(
		[
			'source/js/scaffolding.js',
			'source/js/modules/*.js'
		]
		)
	.pipe( plumber() )
	.pipe( concat( 'script.js' ) )
	.pipe( uglify(
	{
		compress: false
	}
	) )
	.pipe( gulp.dest( 'build/js' ) )
	.pipe( server.stream() );
}
)
;


gulp.task( 'img', function ()
{
	var jpegoptim = require( 'imagemin-jpegoptim' );

	return gulp.src(
		[
			'source/img/**/*.{png,jpg}',
			'source/img/*.svg'
		]
		)
	.pipe( newer( 'build/img' ) )
	.pipe( imagemin(
		[
			imagemin.svgo(),
			imagemin.optipng(),
			jpegoptim(
			{
				max: 70,
				progressive: true
			}
			)
		]
		) )
	.pipe( gulp.dest( 'build/img' ) );
}
);

gulp.task( 'webp', function ()
{
	var webp = require( 'gulp-webp' );

	return gulp.src( 'source/img/**/*.{png,jpg}' )
	.pipe( webp(
	{
		quality: 90
	}
	) )
	.pipe( gulp.dest( 'build/img' ) );
}
);

gulp.task( 'sprite', function ()
{
	var sprite = require( 'gulp-svg-sprites' );

	return gulp.src( 'source/img/bg/*.svg' )
	.pipe( plumber() )
	.pipe( imagemin(
		[
			imagemin.svgo()
		]
		) )
	.pipe( gulp.dest( 'tmp' ) )
	.pipe( sprite(
	{
		baseSize: 1,
		padding: 50,
		preview:
		{
			sprite: ''
		},
		svg:
		{
			sprite: '../build/img/bg/icons.svg'
		},
		cssFile: 'icons.css',
	}
	 ) )
	.pipe( gulp.dest( 'tmp' ) )
	.pipe( server.stream() );
}
);

gulp.task( 'copy', function ()
{
	return gulp.src(
		[
			'source/fonts/**/*.{woff,woff2}'
		],
		{
			base: 'source'
		}
	)
	.pipe( gulp.dest( 'build' ) );
}
);

gulp.task( 'build:prepare', function ()
{
	return del( 'build' );
}
);

gulp.task( 'build', function ( done )
{
	return run(
		'build:prepare',
		[
			'html',
			'css',
			'js',
			'img',
			'webp',
			'sprite',
			'copy'
		],
		done
	);
}
);

gulp.task( 'build:clean', function ()
{
	return del( 'tmp' );
}
);

gulp.task( 'default', function ()
{
	server.init(
	{
		server: 'build',
		notify: false,
		open: true,
		cors: true,
		ui: false
	}
	);

	gulp.watch( 'source/**/*.html', ['html'] );
	gulp.watch( 'source/less/**/*.less', ['css'] );
	gulp.watch( 'source/js/**/*.js', ['js'] );
	gulp.watch( 'source/img/*.svg', ['img'] );
}
);
