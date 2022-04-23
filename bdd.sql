
drop table if exists Entree cascade;
drop table if exists Boisson cascade;
drop table if exists Pizza cascade;
drop table if exists Ingredient cascade;
drop table if exists Sauce cascade;
drop table if exists Composition cascade;


create table Entree (nom text primary key, photo text);
create table Sauce (nom text primary key, prix int, photo text);
create table Boisson (nom text primary key, taille int, prix int, photo text);
create table Pizza (nom text primary key, prix integer, photo text);
create table Ingredient (nom text primary key, prix int, photo text);
create table Composition (nomPizza text, nomIngredient text,
                          FOREIGN KEY (nomPizza) REFERENCES Pizza(nom),
                          FOREIGN KEY (nomIngredient) REFERENCES Ingredient(nom));
create table Menu (nom text primary key, nb_pizza integer, nb_boisson integer, max_boisson integer, nb_entree integer);

insert into menu values
  ('Extra', 2, 2, 2, 2),
  ('Mega', 3, 2, 2, 2),
  ('Giga', 4, 3, 2, 2);

insert into pizza values 
  ('MARGdHERITA', 20, 'MARGHERITA.webp'),
  ('BEreLLACHO', 20, 'BELLACHO.webp'),
  ('MARGghHERITA1', 20, 'MARGHERITA.webp'),
  ('MARGrHERIT2', 20, 'MARGHERITA.webp'),
  ('BELLgACHO2', 20, 'BELLACHO.webp'),
  ('MARGrHERITA14', 20, 'MARGHERITA.webp'),
  ('MARGHERIT25', 20, 'MARGHERITA.webp'),
  ('BELLgfACHO6', 20, 'BELLACHO.webp'),
  ('MARGHERITA17', 20, 'MARGHERITA.webp'),
  ('MARGHrERIT28', 20, 'MARGHERITA.webp'),
  ('BELLfgACHO9', 20, 'BELLACHO.webp'),
  ('MARGHgfdERITA110', 20, 'MARGHERITA.webp'),
  ('MARGHEgfRIT212', 20, 'MARGHERITA.webp'),
  ('BELLACfgHO14', 20, 'BELLACHO.webp'),
  ('MARGHERITA171', 20, 'MARGHERITA.webp'),
  ('MARGHE4RIT2', 20, 'MARGHERITA.webp'),
  ('BELLA4CHO', 20, 'BELLACHO.webp'),
  ('MARGHERITA1', 20, 'MARGHERITA.webp'),
  ('MARGH87ERIT2', 20, 'MARGHERITA.webp'),
  ('BE46LgLACHO', 20, 'BELLACHO.webp'),
  ('MARG5g6HERITA1', 20, 'MARGHERITA.webp'),
  ('MARGHgf6ERIT2', 20, 'MARGHERITA.webp'),
  ('BELLA6CHO', 20, 'BELLACHO.webp'),
  ('MARGHE897RITA1', 20, 'MARGHERITA.webp'),
  ('MARG233gHERIT2', 20, 'MARGHERITA.webp'),
  ('BELLA34CHO', 20, 'BELLACHO.webp'),
  ('MARG777HERITA1', 20, 'MARGHERITA.webp'),
  ('MARGgfHER433IT2', 20, 'MARGHERITA.webp'),
  ('MARgfGH88ERITA3', 20, 'MARGHERITA.webp');