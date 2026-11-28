<?php
/**
 * SEO: document titles, meta description, social previews, structured data.
 * Edit the copy in sergiosn_seo_pages() below.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const SERGIOSN_NAME = 'Sergio Santamaria Nora';

/**
 * Per-page copy, keyed by page slug. 'home' is the front page.
 * Keep titles under about 60 characters and descriptions under about 160.
 */
function sergiosn_seo_pages() {
	return array(
		'home'         => array(
			'title'       => 'Sergio Santamaria Nora | Full-Stack Software Engineer, London',
			'description' => 'Sergio Santamaria Nora is a London-based full-stack software engineer working with Laravel, React, TypeScript and C++. See case studies, code and CV.',
		),
		'case-studies' => array(
			'title'       => 'Case Studies | Sergio Santamaria Nora',
			'description' => 'Case studies by Sergio Santamaria Nora: a casting platform with AI review, a C++ game engine, a RAG pipeline and commercial Laravel work.',
		),
		'experiences'  => array(
			'title'       => 'Experience | Sergio Santamaria Nora',
			'description' => 'Work history, education and certifications of Sergio Santamaria Nora, full-stack software engineer in London.',
		),
	);
}

/** Copy for the current request, or null when the page has none (404, search, etc.). */
function sergiosn_seo_current() {
	$pages = sergiosn_seo_pages();
	if ( is_front_page() ) {
		return $pages['home'];
	}
	if ( is_page() ) {
		$slug = get_post_field( 'post_name', get_queried_object_id() );
		if ( isset( $pages[ $slug ] ) ) {
			return $pages[ $slug ];
		}
	}
	return null;
}

function sergiosn_seo_title( $title ) {
	$page = sergiosn_seo_current();
	return $page ? $page['title'] : $title;
}
add_filter( 'pre_get_document_title', 'sergiosn_seo_title' );

function sergiosn_seo_head() {
	$page = sergiosn_seo_current();
	if ( ! $page ) {
		return;
	}

	$url   = is_front_page() ? home_url( '/' ) : get_permalink( get_queried_object_id() );
	$image = get_theme_file_uri( 'assets/images/og-image.png' );

	printf( "<meta name=\"description\" content=\"%s\" />\n", esc_attr( $page['description'] ) );

	$og = array(
		'og:type'         => 'website',
		'og:site_name'    => SERGIOSN_NAME,
		'og:locale'       => 'en_GB',
		'og:title'        => $page['title'],
		'og:description'  => $page['description'],
		'og:url'          => $url,
		'og:image'        => $image,
		'og:image:width'  => '1200',
		'og:image:height' => '630',
		'og:image:alt'    => SERGIOSN_NAME . ', full-stack software engineer',
	);
	foreach ( $og as $property => $content ) {
		printf( "<meta property=\"%s\" content=\"%s\" />\n", esc_attr( $property ), esc_attr( $content ) );
	}

	$twitter = array(
		'twitter:card'        => 'summary_large_image',
		'twitter:title'       => $page['title'],
		'twitter:description' => $page['description'],
		'twitter:image'       => $image,
	);
	foreach ( $twitter as $name => $content ) {
		printf( "<meta name=\"%s\" content=\"%s\" />\n", esc_attr( $name ), esc_attr( $content ) );
	}

	if ( is_front_page() ) {
		$schema = array(
			'@context'  => 'https://schema.org',
			'@type'     => 'Person',
			'name'      => SERGIOSN_NAME,
			'url'       => home_url( '/' ),
			'jobTitle'  => 'Full-Stack Software Engineer',
			'image'     => $image,
			'address'   => array(
				'@type'           => 'PostalAddress',
				'addressLocality' => 'London',
				'addressCountry'  => 'GB',
			),
			'knowsAbout' => array( 'Laravel', 'PHP', 'React', 'TypeScript', 'C++', 'Python', 'PostgreSQL', 'Docker' ),
			'sameAs'    => array(
				'https://github.com/SergioSNW',
				'https://www.linkedin.com/in/sergio-santamaria-nora/',
			),
		);
		echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . "</script>\n";
	}
}
add_action( 'wp_head', 'sergiosn_seo_head', 5 );

// Do not advertise the WordPress version.
remove_action( 'wp_head', 'wp_generator' );
add_filter( 'the_generator', '__return_empty_string' );
