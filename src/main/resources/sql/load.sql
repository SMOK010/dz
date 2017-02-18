INSERT INTO users(username, password, email, firstname, lastname, age, gender, isActive) VALUES ('lol','lolo', 'lol@op.pl', 'Bolek', 'Lolek', 25, 'Male', 1);
INSERT INTO roles(username, role) VALUES ('lol','user');
INSERT INTO roles(username, role) VALUES ('lol','admin');
INSERT INTO users(username, password, email, firstname, lastname, age, gender, isActive) VALUES ('lol1','lolo', 'lol@op.pl', 'Bolek', 'Lolek', 25, 'Male', 0);
INSERT INTO roles(username, role) VALUES ('lol1','user');



INSERT INTO body_parts(name) VALUES ('plecy');
INSERT INTO body_parts(name) VALUES ('barki');
INSERT INTO body_parts(name) VALUES ('klatka piersiowa');
INSERT INTO body_parts(name) VALUES ('triceps');
INSERT INTO body_parts(name) VALUES ('biceps');
INSERT INTO body_parts(name) VALUES ('nogi');

INSERT INTO exercises(name, type, id_body_part) VALUES ('wioslowanie sztanga w opadzie', 'silowe', 1);
INSERT INTO exercises(name, type, id_body_part) VALUES ('podciaganie na drazku', 'silowe', 1);
INSERT INTO exercises(name, type, id_body_part) VALUES ('wyciskanie sztangi zolnierskie', 'silowe', 2);
INSERT INTO exercises(name, type, id_body_part) VALUES ('wyciskanie hantelek', 'silowe', 2);
INSERT INTO exercises(name, type, id_body_part) VALUES ('wyciskanie sztangi lezac', 'silowe', 3);
INSERT INTO exercises(name, type, id_body_part) VALUES ('wyciskanie sztangielek lezac', 'silowe', 3);
INSERT INTO exercises(name, type, id_body_part) VALUES ('francuskie wyciskanie hantli', 'silowe', 4);
INSERT INTO exercises(name, type, id_body_part) VALUES ('pompki na poreczach', 'silowe', 4);
INSERT INTO exercises(name, type, id_body_part) VALUES ('uginanie ramion ze sztanga', 'silowe', 5);
INSERT INTO exercises(name, type, id_body_part) VALUES ('uginanie ramion ze sztangielkami', 'silowe', 5);
INSERT INTO exercises(name, type, id_body_part) VALUES ('przysiady', 'silowe', 6);
INSERT INTO exercises(name, type, id_body_part) VALUES ('wykroki', 'silowe', 6);

INSERT INTO users(username, age, createTime, email, firstName, gender, lastName, password) VALUES ('user1', '21', '2016-12-14', 'lol@op.pl', 'fdsasdf', 'fdss', 'fdsas', 'pass');
INSERT INTO users(username, age, createTime, email, firstName, gender, lastName, password) VALUES ('user2', '41', '2016-12-14', 'lol@op.pl', 'fdsasdf', 'fdss', 'fdsas', 'pass');
INSERT INTO users(username, age, createTime, email, firstName, gender, lastName, password) VALUES ('user3', '22', '2016-12-14', 'lol@op.pl', 'fdsasdf', 'fdss', 'fdsas', 'pass');
INSERT INTO users(username, age, createTime, email, firstName, gender, lastName, password) VALUES ('user4', '31', '2016-12-14', 'lol@op.pl', 'fdsasdf', 'fdss', 'fdsas', 'pass');
