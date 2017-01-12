# PFE


Pour lancer le serveur :
aller dans PFE/PFE/node-postgres-promises et faire npm start
(pour pouvoir faire le upload : npm install express-fileupload(ou multer?))


Commandes git :
1. git status
2. git add <les nouveaux fichiers>
3. git commit -a //et la ecrire ce qu'on a fait
4. git push // va nous demander de nous identifier


Pour acceder à la base -> psql pfe
\dt pour lister les tables de la base
\h pour l'aide
\d <table> structure d'une table
\q pour quitter

Pour gerer la DB en mode superuser :
sudo -i -u postgres
psql
alter role lalanne with superuser

Pour recreer la base tranquillement
1. modifier pfe.sql
2. $ psql -f pfe.sql (penser a ne pas etre entrain d'utiliser la base a ce moment la hahaha)

Pour mettre en place la table session :
psql login < node_modules/connect-pg-simple/table.sql

Pour voir la liste des roles :
\du

Pour se connecter en mode superuser a la base de données :
user : lalanne
password : lucie1234
donc pas de row level security, vision de toutes les tables


QUESTIONS:
qui aura quels droits exactement ?
quelles fonctionnalités faut-il rajouter en plus (ajout et modifications dans la base, visualisation des données)?
pour les roles : med peut voir que ces patients ? tous les patients ? et vice versa ?
med peut ajouter patients ?
pourquoi je dois faire 2 fois mon login avant que ça marche ?
pourquoi l'importation ne se fait pas 2 fois de suite ? --> c'est une histoire de promesses je pense !!
on ne peut pas faire de row level security sur les vues... du coup on laisse comme ca pour l'instant ?
il faut faire une démo pour la soutenance ?

A FAIRE:
-> gerer les erreurs de maniere plus jolie (acces, connexion...)
-> faire l'ajout de deploiement
-> finir ajout patient et le SECURISER et creer role, suivis, etc
-> penser a changer les config pour que ça soit une appli web et pas dev
-> supprimer le fichier une fois que les données sont dans la db
-> s'occuper du format de la date de naissance
-> faire toutes les fonctions ajout...
-> gestion des droits
-> mettre un delete une fois qu'on charge les données d'un déploiement qui existe deja
