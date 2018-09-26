<?php

if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
	});

	add_filter('template_include', function($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});

	return;
}

Timber::$dirname = array('templates', 'views');

class StarterSite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
		add_action( 'init', array( $this, 'register_menus' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_image_size( 'x-large', 1400, false );
		parent::__construct();
	}

	function register_post_types() {
		//this is where you can register custom post types
	}

	function register_taxonomies() {
		//this is where you can register custom taxonomies
	}

	function register_menus() {
		register_nav_menu( 'mobile-menu', __( 'Mobile Menu', 'linc2019' ) );
		register_nav_menu( 'large-menu', __( 'Large Menu', 'linc2019' ) );
		register_nav_menu( 'slide-menu', __( 'Slide Menu', 'linc2019' ) );
	}

	function add_to_context( $context ) {
		$context['foo'] = 'bar';
		$context['stuff'] = 'I am a value set in your functions.php file';
		$context['notes'] = 'These values are available everytime you call Timber::get_context();';
		$context['mobile_menu'] = new TimberMenu('mobile-menu');
		$context['large_menu'] = new TimberMenu('large-menu');
		$context['slide_menu'] = new TimberMenu('slide-menu');
		$context['site'] = $this;

		$url = urldecode('http://demo.tda.bozellhosting.com/agendaapi/GetHubbAgenda?EventCode=20190206A');
		$agenda = json_decode(file_get_contents($url));
		$context['agenda'] = $agenda;

		// $context['agenda'] = TimberHelper::transient( 'agenda', function(){
		// 	// $url = urldecode('http://national.tda.bozellhosting.com/agendaapi/GetHubbAgenda?EventCode=20190206A');
		// 	$url = urldecode('https://wwws.tdameritradeconferences.com/agendaapi/GetHubbAgenda?EventCode=20190206A');
		// 	$agenda = json_decode(file_get_contents($url));
		// 	return $agenda;
		// }, 600 );

		return $context;
	}

	function myfoo( $text ) {
		$text .= ' bar!';
		return $text;
	}

	function add_to_twig( $twig ) {
		/* this is where you can add your own functions to twig */
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter('myfoo', new Twig_SimpleFilter('myfoo', array($this, 'myfoo')));
		return $twig;
	}

}

new StarterSite();
