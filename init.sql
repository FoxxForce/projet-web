
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
  ('Végétarienne', 20, 'vegetarienne.jpg'),
  ('Texane Barbecue', 20, 'texanebarbecue.jpg'),
  ('Nordique', 20, 'nordique.jpg'),
  ('Margherita', 20, 'margherita.jpg'),
  ('Orientale', 20, 'orientale.jpg'),
  ('Chicken Barbecue', 20, 'chickenbarbecue.jpg'),
  ('Chèvre Miel', 20, 'chevremiel.jpg'),
  ('Raclette', 20, 'raclette.jpg'),
  ('Suprême', 20, 'supreme.jpg'),
  ('Montagnarde', 20, 'montagnarde.jpg'),
  ('Queen', 20, 'queen.jpg'),
  ('Pepperoni', 20, 'pepperoni.jpg'),
  ('BPM', 20, 'bpm.jpg'),
  ('4 4fromages', 20, '4fromages.jpg');

insert into entree values
  ('Salade de pâte', 6, 'saladepate.jpg'),
  ('Salade Grecque', 7, 'saladegrecque'),
  ('Salade César', 6, 'saladecesar'),
  ('Salade de fruits', 5, 'saladefruit.jpg');

insert into boisson values
  ('Sprite', 1, 20, 'sprite'),
  ('Ice tea', 1, 20, 'icetea'),
  ('Coca-Cola', 1, 20, 'coca'),
  ('Fanta', 1, 20, 'fanta');
