DROP DATABASE IF EXISTS pfe;
CREATE DATABASE pfe;

\c pfe;

create type sexe as enum('F', 'M');
create type pathologie as enum( 'parkinson', 'fracture');
create type service as enum('pediatrie', 'hematologie', 'interne', 'neurologie', 'psychiatrie', 'radiologie', 'rhumatologie');
create type specialite as enum( 'chirurgie', 'pediatrie', 'hematologie', 'interne', 'neurologie', 'psychiatrie', 'radiologie', 'rhumatologie');
create type label as enum('pied', 'genou', 'cuisse', 'mollet', 'bassin', 'dos');
create type type_capteur as enum ('accelerometre', 'gyroscope');

create table medecins (
	id_medecin serial primary key,
	nom varchar(80),
	prenom varchar(80),
	service service,
	specialite specialite,
	username varchar(80),
	password varchar(80)
);

create table patients (
	id_patient serial primary key,
	nom varchar(80),
	prenom varchar(80),
	sexe sexe,
	naissance date,
	pathologie pathologie,
	username varchar(80),
	password varchar(80)
);

create table suivis (
	id_suivi serial primary key,
	id_medecin int references medecins,
	id_patient int references patients,
	debut_traitement date,
	fin_traitement date
);

create table mesures (
	id_mesure serial primary key,
	id_suivi int references suivis,
	debut_acquisition timestamp,
	fin_acquisition timestamp
);

create table placements (
	id_placement serial primary key,
	label label
);

create table capteurs (
	id_capteur serial primary key,
	type type_capteur,
	adresse_physique int
);

create table deploiements (
	id_deploiement serial primary key,
	id_capteur int references capteurs,
	id_placement int references placements,
	id_mesure int references mesures,
	frequence int
);

create table donnees (
	id_deploiement int references deploiements,
	temps int,
	x float,
	y float,
	z float
);


insert into patients (nom,prenom,sexe,naissance, pathologie, username, password) values ('Soule', 'Clothilde', 'F', '1994-01-23', 'parkinson', 'clothilde32', 'e8192a30bbe41fbcfc616f5e116a77b15bbeaa8cb818bf6c1dea2932111554f1');
insert into patients (nom,prenom,sexe,naissance, pathologie, username, password) values ('Flores', 'Thelma', 'F', '28-2-1994', 'parkinson', 'thelma26', '2c115bb1814f1254cae69474ef425ab01e8853771542072d17e2bc2bf04a562b');
insert into patients (nom,prenom,sexe,naissance, pathologie, username, password) values ('Friry', 'Anna', 'F', '28-2-1994', 'fracture', 'anna69', '84af474ad74d9cfa3a18251659af0dc56a0d4ff79208063ee16c25bc8481eb85');
insert into patients (nom,prenom,sexe,naissance, pathologie, username, password) values ('Desmurs', 'Diane', 'F', '23-2-1994', 'fracture', 'diane69', '0bdebf8dbe9ad4254dc2f33eacc19095031f875780c5c2f2878b6a276a7d6b3a');
insert into patients (nom,prenom,sexe,naissance, pathologie, username, password) values ('José', 'Patrik', 'M', '28-2-1924', 'parkinson', 'patrik', '0575babab6447fe226fbcf6c473c97040e8b913eaf9131af87fb3e5969a8daf8');
insert into patients (nom,prenom,sexe,naissance, pathologie, username, password) values ('Beaubay', 'Jean-Baptiste', 'M', '23-2-1994', 'parkinson', 'jean2b', 'b13adf0704ab91113336594c5e2ef2e292bd484919e8d18c698b95c5fd6d892a');

insert into medecins (nom,prenom,service,specialite, username, password) values ('Dussac', 'Cecile', 'pediatrie', 'chirurgie','cecile13', '31ae19d3969903edcc40b5f12186ab0357074996e63d5154001f9b85da196fe0');
insert into medecins (nom,prenom,service,specialite, username, password) values ('De Framond', 'Théo', 'interne', 'chirurgie','theonarvalo', '2c115bb1814f1254cae69474ef425ab01e8853771542072d17e2bc2bf04a562b');
insert into medecins (nom,prenom,service,specialite, username, password) values ('Bontemps', 'Loic', 'pediatrie', 'pediatrie','loic75', '6ab860a7cfab9d68b0ab03978f076372e260d1a3c5addcee09b8afa89ea3d572');
insert into medecins (nom,prenom,service,specialite, username, password) values ('Gaiddon', 'Tommy', 'neurologie', 'chirurgie','tommy', '0d50651271be7c323d94dad57013a924824e92ad2f674a9a8ae965ce63adce45');
insert into medecins (nom,prenom,service,specialite, username, password) values ('David', 'Antoine', 'psychiatrie', 'neurologie','antoine', '84af474ad74d9cfa3a18251659af0dc56a0d4ff79208063ee16c25bc8481eb85');
insert into medecins (nom,prenom,service,specialite, username, password) values ('Lalanne', 'Lucie', 'psychiatrie', 'neurologie','lalanne', 'fc1bcf548211558ce521d9222af5e4d787063da2d6c386b71c121ce3183b5aa7');


insert into suivis (id_medecin,id_patient,debut_traitement,fin_traitement) values (1,2, '2-2-2015', '1-1-2016');
insert into suivis (id_medecin,id_patient,debut_traitement,fin_traitement) values (1,5, '21-3-2014', '22-5-2017');
insert into suivis (id_medecin,id_patient,debut_traitement,fin_traitement) values (2,3, '2-2-2015', '12-1-2016');
insert into suivis (id_medecin,id_patient,debut_traitement,fin_traitement) values (3,1, '6-12-2013', '3-8-2016');
insert into suivis (id_medecin,id_patient,debut_traitement,fin_traitement) values (5,4, '9-4-2012', '2-9-2017');
insert into suivis (id_medecin,id_patient,debut_traitement,fin_traitement) values (4,4, '13-3-2015', '1-3-2016');
insert into suivis (id_medecin,id_patient,debut_traitement,fin_traitement) values (6,6, '13-3-2015', '1-3-2016');




insert into mesures (id_suivi, debut_acquisition, fin_acquisition) values (1, '2016-2-2 10:24:55', '2016-2-2 10:43:22');
insert into mesures (id_suivi, debut_acquisition, fin_acquisition) values (2, '2016-2-2 10:24:55', '2016-2-2 10:43:22');
insert into mesures (id_suivi, debut_acquisition, fin_acquisition) values (3, '2016-2-2 10:24:55', '2016-2-2 10:43:22');
insert into mesures (id_suivi, debut_acquisition, fin_acquisition) values (4, '2016-2-2 10:24:55', '2016-2-2 10:43:22');
insert into mesures (id_suivi, debut_acquisition, fin_acquisition) values (5, '2016-2-2 10:24:55', '2016-2-2 10:43:22');
insert into mesures (id_suivi, debut_acquisition, fin_acquisition) values (6, '2016-2-2 10:24:55', '2016-2-2 10:43:22');
insert into mesures (id_suivi, debut_acquisition, fin_acquisition) values (7, '2016-2-2 10:24:55', '2016-2-2 10:43:22');




insert into placements (label) values ('pied');
insert into placements (label) values ('genou');
insert into placements (label) values ('cuisse');
insert into placements (label) values ('mollet');
insert into placements (label) values ('bassin');
insert into placements (label) values ('dos');

insert into capteurs (type, adresse_physique) values ('accelerometre', '12345');
insert into capteurs (type, adresse_physique) values ('gyroscope', '1244345');

insert into deploiements (id_capteur, id_placement, id_mesure, frequence) values (2,2,1,50);
insert into deploiements (id_capteur, id_placement, id_mesure, frequence) values (1,3,2,50);
insert into deploiements (id_capteur, id_placement, id_mesure, frequence) values (1,5,3,200);
insert into deploiements (id_capteur, id_placement, id_mesure, frequence) values (2,1,4,50);
insert into deploiements (id_capteur, id_placement, id_mesure, frequence) values (1,4,5,200);
insert into deploiements (id_capteur, id_placement, id_mesure, frequence) values (1,4,6,50);
insert into deploiements (id_capteur, id_placement, id_mesure, frequence) values (1,4,7,50);


insert into donnees values (1, 54215,12.6,14.95,33.5);
insert into donnees values (1, 51234,52.6,14.55,43.5);
insert into donnees values (1, 23178,52.4,44.55,42.5);


create view vue_suivis as
	select s.id_suivi as id_suivi,
		m.nom as nom_medecin,
		m.prenom as prenom_medecin,
		m.username as username_medecin,
		m.service as service_medecin,
		m.specialite as specialite_medecin,
		p.nom as nom_patient,
		p.prenom as prenom_patient,
		p.pathologie as pathologie_patient,
		p.username as username_patient,
		s.debut_traitement as debut_traitement,
		s.fin_traitement as fin_traitement
	from medecins m
		inner join suivis s on (m.id_medecin=s.id_medecin)
		inner join patients p on (p.id_patient=s.id_patient);

create view vue_mesures as
	select m.id_mesure as id_mesure,
		s.nom_medecin as nom_medecin,
		s.prenom_medecin as prenom_medecin,
		s.nom_patient as nom_patient,
		s.prenom_patient as prenom_patient,
		m.debut_acquisition as debut_acquisition,
		m.fin_acquisition as fin_acquisition
	from mesures m
		inner join vue_suivis s on (m.id_suivi=s.id_suivi);



create view vue_deploiement as
	select d.id_deploiement as id_deploiement,
		m.nom_medecin as nom_medecin,
		m.prenom_medecin as prenom_medecin,
		m.nom_patient as nom_patient,
		m.prenom_patient as prenom_patient,
		c.type as type,
		p.label as label,
		d.frequence as frequence,
		m.debut_acquisition as debut_acquisition,
		m.fin_acquisition as fin_acquisition
	from deploiements d
		inner join capteurs c on (d.id_capteur=c.id_capteur)
		inner join placements p on (d.id_placement=p.id_placement)
		inner join vue_mesures m on (m.id_mesure=d.id_mesure);

create view vue_login as
	select username, password
	from patients
	union
	select username, password
	from medecins;

/*create user patient with inherit password 'patient';
create user medecin with inherit password 'medecin';*/

grant select on patients to patient;
grant select, insert on donnees to patient;
grant select on vue_suivis to patient;
grant select on vue_deploiement to patient;

grant select on medecins to medecin;
grant select, insert on donnees to medecin;
grant select on vue_suivis to medecin;
grant select on vue_deploiement to medecin;

/*create user clothilde32 with inherit password 'coco' in role patient;
create user thelma26 with inherit password 'tete' in role patient;
create user anna69 with inherit password 'anan' in role patient;
create user diane69 with inherit password 'didi' in role patient;
create user patrik with inherit password 'papa' in role patient;
create user jean2b with inherit password 'jeje' in role patient;
create user cecile13 with inherit password 'cece' in role medecin;
create user theonarvalo with inherit password 'tete' in role medecin;
create user loic75 with inherit password 'lolo' in role medecin;
create user tommy with inherit password 'toto' in role medecin;
create user antoine with inherit password 'anan' in role medecin;
*/
