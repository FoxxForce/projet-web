
drop table if exists Entree cascade;
drop table if exists Boisson cascade;
drop table if exists Pizza cascade;
drop table if exists Ingredient cascade;
drop table if exists Sauce cascade;
drop table if exists Composition cascade;
drop table if exists Menu cascade;
drop table if exists commande cascade;

create table Entree (nom text primary key, prix integer, photo text);
create table Sauce (nom text primary key, prix int, photo text);
create table Boisson (nom text primary key, taille int, prix int, photo text);
create table Pizza (nom text primary key, prix integer, photo text);
create table Ingredient (nom text primary key, prix int, photo text);
create table Composition (nomPizza text, nomIngredient text,
                          FOREIGN KEY (nomPizza) REFERENCES Pizza(nom),
                          FOREIGN KEY (nomIngredient) REFERENCES Ingredient(nom));
create table Menu (nom text primary key, prix integer, nb_pizza integer, nb_boisson integer, max_boisson integer, nb_entree integer);
create table commande (id serial primary key , nom text, prenom text, adresse text, code_postale varchar(5), ville text, supp text, tel text, email text, heure time);
drop user if exists useradmin;
create user useradmin with password 'mypass';
grant all privileges on all tables in schema public to useradmin;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO useradmin;


insert into menu values
  ('Extra', 20, 2, 2, 2, 2),
  ('Mega', 40, 3, 2, 2, 2),
  ('Giga', 60, 4, 3, 2, 2);

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
  ('BE46LgLACHO', 20, 'BELLACHO.webp');
insert into entree values
  ('SALADE1', 20, 'MARGHERITA.webp'),
  ('SALADE2', 20, 'MARGHERITA.webp'),
  ('SALADE3', 20, 'BELLACHO.webp'),
  ('SALADE4', 20, 'MARGHERITA.webp');
insert into boisson values
  ('BOISSON1', 1, 20, 'MARGHERITA.webp'),
  ('BOISSON2', 1, 20, 'BELLACHO.webp'),
  ('BOISSON3', 1, 20, 'MARGHERITA.webp'),
  ('BOISSON4', 1, 20, 'MARGHERITA.webp');
