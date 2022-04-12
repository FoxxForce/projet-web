
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

insert into pizza values 
  ('MARGHERITA', 20, 'MARGHERITA.webp'),
  ('BELLACHO', 20, 'BELLACHO.webp');