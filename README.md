# PFE


Pour lancer le serveur :
aller dans PFE/node-postgres-promises et faire npm start


Pour (re)creer la base :
1. (modifier pfe.sql)
2. $ psql -f pfe.sql


Pour mettre en place la table session :
$ psql login < node_modules/connect-pg-simple/table.sql


Pour utiliser l'application :
http://localhost:3000/


Pour acceder à la base :
$ psql pfe

\dt pour lister les tables de la base
\h pour l'aide
\d <table> structure d'une table
\q pour quitter


Pour voir la liste des roles :
\du


Pour gerer la DB en mode superuser (voir toutes la base) :
1. sudo -i -u postgres
2. psql
3. alter role lalanne with superuser


Commandes git :
1. git status
2. git add <les nouveaux fichiers>
3. git commit -a
4. git push
