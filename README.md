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

QUESTIONS:
faut-il chiffrer le password ? comment ?

A FAIRE:
-> il faut creer une nouvelle session si ça correspond pas !
-> rajouter email comme attribut dans bd pour faire le lien
-> penser a changer les config pour que ça soit une appli web et pas dev
-> supprimer le fichier une fois que les données sont dans la db
-> faire des graphs des données
-> s'occuper du format de la date de naissance
-> faire toutes les fonctions ajout...
-> gestion des droits
