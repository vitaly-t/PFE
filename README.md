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




-> penser a changer les config pour que ça soit une appli web et pas dev
-> penser a faire des requetes sql preparees pour eviter les injections (voir mail francois)
-> voir les données de carole
-> utiliser le filefilter de mutler pour l'upload
