<?php
/**
 * Template Name: Interior Page
 * Description: A Page Template for interior pages.
 */

// Code to display Page goes here...
$context = Timber::get_context();

// WP_Query arguments
$args = array(
    'post_type' => 'the_speakers',
    'posts_per_page' => -1,
);

$post = new TimberPost();
$context['post'] = $post;
$context['speakers'] = Timber::get_posts($args);
Timber::render( array( 'interior.twig' ), $context );
