create database if not exists Projet;
drop table if exists Entree;
drop table if exists Boisson;
drop table if exists Pizza;
drop table if exists Ingredient;

create database Projet;

create table Entree (nom varchar(50) primary key, photo text);
create table Sauce (nom varchar(50) primary key, prix int, photo text);
create table Boisson (nom varchar(50), taille int, prix int, photo text);
create table Pizza (nom varchar(50), taille int, prix int, photo text);
create table Ingredient (nom varchar(50), prix int, photo text);
create table Composition (nomPizza varchar(50), nomIngredient varchar(50),
                          FOREIGN KEY (Pizza) REFERENCES Pizza(nom)
                          FOREIGN KEY (Ingredient) REFERENCES Ingredient(nom));

insert into Pizza values
  ("MARGHERITA", "MARGHERITA.webp"),
  ("BELLACHO", "BELLACHO.webp");
