<?php
/**
 * Template Name: Interior Page
 * Description: A Page Template for interior pages.
 */

// Code to display Page goes here...

$url = urldecode('http://national.tda.bozellhosting.com/agendaapi/GetHubbAgenda?EventCode=20190206A');
$agenda = json_decode(file_get_contents($url));

$context = Timber::get_context();

// WP_Query arguments
$args = array(
    'post_type' => 'the_speakers',
    'posts_per_page' => -1
);

$post = new TimberPost();
$context['post'] = $post;
$context['speakers'] = Timber::get_posts($args);
$context['agenda'] = $agenda;
Timber::render( array( 'interior.twig' ), $context );
