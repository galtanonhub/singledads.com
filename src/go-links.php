<?php
/**
 * SingleDads.com — affiliate link lookup table.
 *
 * The ONE place to assign where a /go/<slug> link points. Edit this file directly
 * on the server (cPanel File Manager) to change a destination — no rebuild needed.
 *
 *   'slug' => 'https://full-affiliate-url...'   → live, redirects there
 *   'slug' => ''                                 → inert, bounces to the meals page
 *
 * Keep slugs lowercase letters/numbers/hyphens only (must match go.php's filter).
 */

return [
    // Meal-kit & food affiliates (paste real affiliate URLs when accounts are ready)
    'hellofresh' => '',
    'everyplate' => '',
    'homechef'   => '',
    'thrive'     => '',
    'emergency'  => '',

    // Childcare / babysitter affiliates
    'carecom'    => '',
    'sittercity' => '',
    'urbansitter' => '',

    // Book affiliates (Amazon Associates) — Reading › Books
    'book-moms-house-dads-house'         => '',
    'book-coparenting-101'               => '',
    'book-joint-custody-with-a-jerk'     => '',
    'book-how-to-talk-so-kids-will-listen' => '',
    'book-the-whole-brain-child'         => '',
    'book-positive-discipline'           => '',
    'book-single-dads-survival-guide'    => '',
    'book-the-dads-edge'                 => '',
    'book-no-more-mr-nice-guy'           => '',
    'book-the-body-keeps-the-score'      => '',
    'book-total-money-makeover'          => '',
    'book-i-will-teach-you-to-be-rich'   => '',

    // Travel affiliates — Travel section
    'expedia'      => '',
    'booking'      => '',
    'vrbo'         => '',
    'viator'       => '',
    'getyourguide' => '',
    'going'        => '',  // flight-deal alerts (formerly Scott's Cheap Flights)
    'koa'          => '',  // camping / road-trip lodging
    'travel-insurance' => '',

    // Dating affiliates — Dating › App & Site Picks
    // (Hinge & Bumble omitted — no public affiliate program; linked directly on the page.)
    'match'            => '',
    'singleparentmeet' => '',
    'eharmony'         => '',
    'ourtime'          => '',

    // Legal services affiliates — Legal › Finding Legal Help
    'rocket-lawyer' => '',
    'legalzoom'     => '',

    // Budgeting / money tools — Financial › Budgeting
    'rocket-money' => '',
    'simplifi'     => '',
];
