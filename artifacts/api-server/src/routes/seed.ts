import { Router } from "express";
import { pool } from "@workspace/db";

const router = Router();

// One-time production seed route. Protected by SESSION_SECRET query param.
// DELETE THIS FILE after running against production.
router.post("/seed", async (req, res): Promise<void> => {
  const secret = process.env.SESSION_SECRET;
  if (!secret || req.query.key !== secret) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const client = await pool.connect();
  try {
    await client.query(`
      BEGIN;

      DELETE FROM order_items;
      DELETE FROM ratings;
      DELETE FROM menu_items;
      DELETE FROM categories;

      INSERT INTO categories (id, name, description, display_order)
      OVERRIDING SYSTEM VALUE VALUES
        (6,  'Classic Pretzels', NULL, 1),
        (7,  'Sweet Pretzels',   NULL, 2),
        (8,  'Savory Pretzels',  NULL, 3),
        (10, 'Pretzel Dogs',     NULL, 5),
        (11, 'Dips & Sauces', 'House-made dips and sauces for your pretzels', 0);

      SELECT setval('categories_id_seq', 11);

      INSERT INTO menu_items (id, category_id, name, description, price, image_url, available, featured)
      OVERRIDING SYSTEM VALUE VALUES
        (74, 6,  'Traditional Soft Pretzel',       'Hand-twisted Bavarian-style soft pretzel with coarse salt and a warm butter glaze',                                 4.50, '/images/menu/traditional-soft-pretzel.jpg',         true,  true),
        (75, 6,  'Whole Wheat Pretzel',             'Earthy whole wheat dough with extra coarse salt and a deep mahogany crust',                                         4.50, '/images/menu/whole-wheat-pretzel.jpg',               true,  false),
        (76, 6,  'Traditional Bites',               'Twelve bite-sized classic soft pretzel nuggets with coarse salt, served with house cheese dip',                     7.00, '/images/menu/traditional-bites.jpg',                 true,  false),
        (55, 7,  'Sweet Glaze Pretzel',             'Classic soft pretzel finished with a warm, shiny sweet glaze',                                                      5.00, '/images/menu/sweet-glaze-pretzel.jpg',               true,  false),
        (56, 7,  'Cinnamon Sugar Pretzel',          'Soft pretzel rolled in cinnamon sugar and drizzled with icing. Comes with cream cheese dip',                        5.50, '/images/menu/cinnamon-sugar-pretzel.jpg',            true,  true),
        (57, 7,  'Chocolate Pretzel',               'Soft pretzel draped in rich milk chocolate',                                                                        5.50, '/images/menu/chocolate-pretzel.jpg',                 true,  false),
        (58, 7,  'White Chocolate Pretzel',         'Soft pretzel coated in creamy white chocolate',                                                                     5.50, '/images/menu/white-chocolate-pretzel.jpg',           true,  false),
        (59, 7,  'Fudge Pretzel',                   'Thick dark fudge spread over a warm soft pretzel — dense, rich, and dangerously good',                              6.00, '/images/menu/fudge-pretzel.jpg',                     true,  false),
        (60, 7,  'M&Ms Pretzel',                    'Sweet glaze base topped with a generous scatter of colorful M&Ms',                                                  6.00, '/images/menu/mms-pretzel.jpg',                       true,  true),
        (61, 7,  'Caramel Dip Pretzel',             'Classic soft pretzel served with a warm house caramel dipping sauce',                                               5.50, '/images/menu/caramel-dip-pretzel.jpg',               true,  false),
        (62, 7,  'Mint Chip Pretzel',               'White chocolate base with mint chip pieces — cool, sweet, and a little unexpected',                                 6.00, '/images/menu/mint-chip-pretzel.jpg',                 true,  false),
        (63, 7,  'Chocolate Chip Pretzel',          'Sweet glaze topped with a heavy hand of semi-sweet chocolate chips',                                                5.50, '/images/menu/chocolate-chip-pretzel.jpg',            true,  false),
        (64, 7,  'Marshmallow Pretzel',             'Warm pretzel covered in toasted marshmallow fluff',                                                                 5.50, '/images/menu/marshmallow-pretzel.jpg',               true,  false),
        (65, 7,  'Nuts Pretzel',                    'Sweet glaze pretzel topped with a mix of chopped roasted nuts',                                                     5.50, '/images/menu/nuts-pretzel.jpg',                      true,  false),
        (66, 7,  'Toffee Nuts Pretzel',             'Caramel glaze loaded with buttery toffee-coated nuts — sweet, salty, crunchy',                                     6.50, '/images/menu/toffee-nuts-pretzel.jpg',               true,  false),
        (67, 7,  'Coconut Pretzel',                 'Sweet glaze pretzel rolled in toasted shredded coconut',                                                            5.50, '/images/menu/coconut-pretzel.jpg',                   true,  false),
        (68, 7,  'Peanut Butter Drizzle Pretzel',   'Warm soft pretzel drizzled generously with creamy peanut butter',                                                   5.50, '/images/menu/peanut-butter-drizzle-pretzel.jpg',     true,  true),
        (69, 7,  'Sprinkles Pretzel',               'Sweet glaze pretzel buried under a rainbow avalanche of sprinkles',                                                 5.00, '/images/menu/sprinkles-pretzel.jpg',                 true,  false),
        (70, 7,  'Cotton Candy Bits Pretzel',       'White chocolate base topped with fluffy cotton candy bits — act fast before they melt',                             6.00, '/images/menu/cotton-candy-bits-pretzel.jpg',         true,  false),
        (71, 7,  'Oreo Pretzel',                    'Sweet glaze pretzel covered in crushed Oreo pieces',                                                                6.00, '/images/menu/oreo-pretzel.jpg',                      true,  false),
        (72, 7,  'Powdered Sugar Pretzel',          'Soft pretzel dusted generously in classic powdered sugar',                                                          4.50, '/images/menu/powdered-sugar-pretzel.jpg',            true,  false),
        (73, 7,  'The Works Pretzel',               'Every sweet topping we have, all on one pretzel. Not for the faint of heart',                                       9.00, '/images/menu/the-works-pretzel.jpg',                 true,  true),
        (77, 8,  'Garlic Parmesan',                 'Roasted garlic paste and shaved parmesan melted over a classic soft pretzel',                                       5.50, '/images/menu/garlic-parmesan.jpg',                   true,  true),
        (78, 8,  'Everything Pretzel',              'Topped with house everything seasoning — sesame, poppy, onion, garlic, and coarse salt',                            5.00, '/images/menu/everything-pretzel.jpg',                true,  false),
        (79, 8,  'Smoky Ranch',                     'Soft pretzel brushed with smoky ranch butter and finished with a dusting of ranch seasoning',                       5.50, '/images/menu/smoky-ranch.jpg',                       true,  false),
        (80, 8,  'Jalapeño Cheddar',                'Sharp cheddar and pickled jalapeño baked right into the dough. Stanley''s personal favorite',                       6.00, '/images/menu/jalapeno-cheddar.jpg',                  true,  true),
        (81, 8,  'Chili Lime',                      'Zesty chili-lime seasoning on a warm soft pretzel — bright, spicy, and totally addictive',                         5.50, '/images/menu/chili-lime.jpg',                        true,  false),
        (82, 8,  'Sour Cream & Onion',              'Classic sour cream and onion seasoning over a buttered soft pretzel',                                               5.00, '/images/menu/sour-cream-and-onion.jpg',              true,  false),
        (83, 8,  'Cheddar Bacon',                   'Melted cheddar and crispy bacon bits baked on top — the one Kevin orders twice',                                    6.50, '/images/menu/cheddar-bacon.jpg',                     true,  true),
        (84, 8,  'Buffalo Wing',                    'House buffalo sauce and a blue cheese drizzle on a warm soft pretzel. Bring napkins',                               6.00, '/images/menu/buffalo-wing.jpg',                      true,  false),
        (85, 8,  'Spinach & Feta',                  'Wilted spinach and tangy feta folded into every twist',                                                             5.50, '/images/menu/spinach-and-feta.jpg',                  true,  false),
        (86, 8,  'Pepperoni',                       'Loaded with pepperoni and a drizzle of marinara. Pizza night, pretzel style',                                       6.00, '/images/menu/pepperoni.jpg',                         true,  false),
        (87, 10, 'Hot Dog Pretzel',                 'All-beef frank wrapped snugly in soft pretzel dough, baked golden. A Pretzel Day staple',                           7.00, '/images/menu/hot-dog-pretzel.jpg',                   true,  true),
        (88, 10, 'Stadium Bratwurst Pretzel',       'Jumbo bratwurst in a soft pretzel wrap — stadium food, upgraded',                                                   8.50, '/images/menu/stadium-bratwurst-pretzel.jpg',         true,  false),
        (89, 10, 'Cheddar Dog Pretzel',             'All-beef frank stuffed with melted cheddar, wrapped in pretzel dough. Fully loaded',                                8.00, '/images/menu/cheddar-dog-pretzel.jpg',               true,  true),
        (90, 10, 'Cheddar Bratwurst Pretzel',       'Cheddar-stuffed bratwurst in pretzel dough — rich, savory, and worth every bite',                                  9.00, '/images/menu/cheddar-bratwurst-pretzel.jpg',         true,  false),
        (91, 10, 'Regular Bratwurst Pretzel',       'Classic bratwurst in a soft pretzel wrap with whole-grain mustard on the side',                                     8.00, '/images/menu/regular-bratwurst-pretzel.jpg',         true,  false),
        (92, 11, 'Yellow Mustard',                  'Classic yellow mustard. The one. The only.',                                                                        1.50, '/images/menu/yellow-mustard.jpg',                    true,  false),
        (93, 11, 'Honey Mustard',                   'Sweet and tangy house honey mustard — pairs perfectly with any classic or savory pretzel',                          1.50, '/images/menu/honey-mustard.jpg',                     true,  true),
        (94, 11, 'Spicy Brown Mustard',             'A sharper, spicier mustard with some real kick. William''s table staple',                                           1.50, '/images/menu/spicy-brown-mustard.jpg',               true,  false),
        (95, 11, 'House Cheese Sauce',              'Warm, creamy cheddar cheese sauce made fresh daily. The crowd favorite',                                            2.50, '/images/menu/house-cheese-sauce.jpg',                true,  true),
        (96, 11, 'Beer Cheese',                     'House cheese sauce spiked with craft beer — rich, malty, and dangerously good',                                     3.00, '/images/menu/beer-cheese.jpg',                       true,  true),
        (97, 11, 'Cream Cheese Dip',                'Smooth whipped cream cheese with a hint of sea salt. Essential with the cinnamon sugar pretzel',                    2.00, '/images/menu/cream-cheese-dip.jpg',                  true,  false),
        (98, 11, 'Ranch',                           'Cool and herby house ranch dip. Goes with everything, and yes, we mean everything',                                 1.50, '/images/menu/ranch.jpg',                             true,  false),
        (99, 11, 'Caramel Sauce',                   'Warm buttery caramel for dipping sweet pretzels. Also acceptable on the savory ones',                               2.00, '/images/menu/caramel-sauce.jpg',                     true,  false),
        (100,11, 'Marinara',                        'House tomato marinara — bright, herby, and the only right way to eat the pepperoni pretzel',                        1.50, '/images/menu/marinara.jpg',                          true,  false),
        (101,11, 'Buffalo Sauce',                   'House buffalo sauce with a side of blue cheese crumble. Heat level: respectfully serious',                          2.00, '/images/menu/buffalo-sauce.jpg',                     true,  false);

      SELECT setval('menu_items_id_seq', 101);

      COMMIT;
    `);
    res.json({ ok: true, message: "Database seeded with Pretzel Day Bakery data." });
  } catch (err) {
    await client.query("ROLLBACK").catch(() => {});
    console.error("Seed failed:", err);
    res.status(500).json({ error: String(err) });
  } finally {
    client.release();
  }
});

export default router;
