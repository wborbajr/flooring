CREATE TABLE public.product(
    id SERIAL PRIMARY KEY,
    product_code INT UNIQUE NOT NULL,
    "name" VARCHAR (255) UNIQUE NOT NULL,
    texturemap_albedo VARCHAR (255) NOT NULL,
    texturemap_normal VARCHAR (255) NOT NULL,
    texturemap_ao VARCHAR (255) NOT NULL,
    width SMALLINT NOT NULL,
    height SMALLINT NOT NULL,
    "description" VARCHAR (255) NOT NULL,
    colour_groups VARCHAR (10)[] NOT NULL
);