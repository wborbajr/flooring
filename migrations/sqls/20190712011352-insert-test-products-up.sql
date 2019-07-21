INSERT INTO public.category (id, "name") VALUES (1, 'wood'), (2, 'marble'), (3, 'granite'), (4, 'unused-category');

INSERT INTO public.product (id, product_code, "name", texturemap_albedo, texturemap_normal, texturemap_ao, width, height, "description", colour_groups) VALUES
(1, 1010145, 'Agrestic Slate', 'ArgesticSlate_albedo.png', 'ArgesticSlate_normal.png', 'ArgesticSlate_ao.png', 150, 75, 'test description', '{"#32CD32", "#008000"}'), /* first product */
(2, 1014916, 'Washed Granite', 'WashedGranite_albedo.png', 'WashedGranite_normal.png', 'WashedGranitee_ao.png', 175, 90, 'test description', '{"#82HC52", "#01JI63"}'), /* second product */
(3, 1012718, 'Gorilla Slate', 'GorillaSlate_albedo.png', 'GorillaSlate_normal.png', 'GorillaSlate_ao.png', 175, 90, 'test description', '{"#92HE52", "#01HI64"}'); /* third product */

INSERT INTO public.product_category (product_id, category_id) VALUES
(1, 1), (1, 2), /* first product - wood, marble */
(2, 3), /* second product - granite */
(3, 1), (3, 2); /* third product - wood, marble */