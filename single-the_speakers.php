<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */
$context = Timber::get_context();

$args = array(
    'post_type' => 'the_speakers',
    'posts_per_page' => -1,
);


$post = Timber::query_post();
$context['post'] = $post;
$context['speakers'] = Timber::get_posts($args);
Timber::render( array( 'single-the_speakers.twig' ), $context );
