# PFE


##Lancer le serveur :
1. $ cd PFE/node-postgres-promises

2. $ npm start


##(Re)créer la base :
1. (modifier pfe.sql)

2. $ psql -f pfe.sql


Pour mettre en place la table session :

$ psql login < node_modules/connect-pg-simple/table.sql


##Utiliser l'application :
http://localhost:3000/


##Accéder à la base :
$ psql pfe

\dt pour lister les tables de la base

\h pour l'aide

\d <table> structure d'une table

\q pour quitter


Voir la liste des roles :

\du


##Pour gerer la DB en mode superuser (voir toutes la base) :

1. sudo -i -u postgres

2. psql

3. alter role lalanne with superuser


##Commandes git :
1. git status

2. git add <les nouveaux fichiers>

3. git commit -a

4. git push
