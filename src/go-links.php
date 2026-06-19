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
];
