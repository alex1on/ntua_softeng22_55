USE intelliQ;
-- Delete Data
DELETE FROM Answer;
DELETE FROM Keywords;
DELETE FROM Q_Option;
DELETE FROM Question;
DELETE FROM Questionnaire;
DELETE FROM Q_User;
ALTER TABLE `Q_User` AUTO_INCREMENT = 1;
-- ALTER TABLE `Questionnaire` AUTO_INCREMENT = 1;
-- ALTER TABLE `Question` AUTO_INCREMENT = 1;
-- ALTER TABLE `Q_Option` AUTO_INCREMENT = 1;
ALTER TABLE `Answer` AUTO_INCREMENT = 1;
ALTER TABLE `Keywords` AUTO_INCREMENT = 1;
-- Insert Q_user data
INSERT INTO Q_User (UserID, Username, psw, email)
VALUES (1, 'Manos', 'test1', 'Manos@example.com'),
    (2, 'pGiad', 'test2', 'pGiad@example.com'),
    (3, 'Alex', 'test3', 'Alex@example.com'),
    (4, 'Velalo', 'test4', 'Velalo@example.com'),
    (5, 'Skatz', 'test5', 'Skatz@example.com');
-- Insert Questionaire data
INSERT INTO Questionnaire (QuestionnaireID, QuestionnaireTitle, UserID)
VALUES ('1', "Manos' Questionnaire", 1),
    ('2', "pGiad's Questionnaire", 2),
    ('3' ,"Alex's Questionnaire", 3),
    ('4', "Velalo's Questionnaire", 4),
    ('5', "Skatz's Questionnaire", 5);
-- Insert Question data
INSERT INTO Question (QuestionID, QText, Q_Required, Q_Type, QuestionnaireID)
VALUES (
        '1',
        'Do you prefer chess, basketball or football?',
        'true',
        'Research',
        '1'
    ),
    ('2', 'How old are you?', 'true', 'Personal', '1'),
    (
        '3',
        'Do you prefer pizza, souvlaki or burger?',
        'false',
        'Research',
        '1'
    ),
    (
        '4',
        'What kind of music do you enjoy most?',
        'false',
        'Research',
        '1'
    ),
    (   
        '5', 
        'Do you play games on PC, PlayStation or XBOX?',
        'false',
        'Research',
        '2'
    ),
    (
        '6',
        'What kind of games do you enjoy most?',
        'true',
        'Research',
        '2'
    ),
    (
        '7',
        'How often do you use Spotify?',
        'true',
        'Research',
        '2'
    ),
    ('8', 'Will you ever shave?', 'true', 'Research', '2'),
    ('9', 'Do you drive?', 'false', 'Research', '3'),
    (
        '10', 
        'In what condition is your car?',
        'true',
        'Research',
        '3'
    ),
    (
        '11', 
        'Which is your favourite character in Star Wars?',
        'true',
        'Research',
        '3'
    ),
    ('12','Do you like cats?', 'true', 'Research', 4),
    (
        '13',
        'How often do you go to gym?',
        'true',
        'Research',
        '4'
    ),
    ('14', 'Do you eat healthy?', 'true', 'Research', '4'),
    ('15', 'Do you have a dog?', 'true', 'Research', '5'),
    (
        '16', 
        'Which is your favourite hat?',
        'true',
        'Research',
        '5'
    ),
    ('17', 'What is your nickname?', 'true', 'Research', '5');
-- Insert Q_Option data
INSERT INTO Q_Option (OptionID, OptText, NextQID, QuestionID, QuestionnaireID)
VALUES ('1', "chess", '2', '1', '1'),
    ('2', "basketball", '2', '1', '1'),
    ('3', "football", '2', '1', '1'),
    ('4', "18", '3', '2', '1'),
    ('5', "20", '3', '2', '1'),
    ('6', "22", '3', '2', '1'),
    ('7', "pizza", '4', '3', '1'),
    ('8', "souvlaki", '4', '3', '1'),
    ('9', "burger", '4', '3', '1'),
    ('10', "pop", NULL, '4', '1'),
    ('11', "rock", NULL, '4', '1'),
    ('12', "classic", NULL, '4', '1'),
    ('13', "PC", '6', '5', '2'),
    ('14', "XBOX", '6', '5', '2'),
    ('15', "PlayStation", '6', '5', '2'),
    ('16', "RPG", '7', '6', '2'),
    ('17', "RTS", '7', '6', '2'),
    ('18', "MOBA", '7', '6', '2'),
    ('19', "Everyday", '8', '7', '2'),
    ('20', "Sometimes", '8', '7', '2'),
    ('21', "Never", '8', '7', '2'),
    ('22', "Yes", NULL, '8', '2'),
    ('23', "No", NULL, '8', '2'),
    ('24', "Never!", NULL, '8', '2'),
    ('25', "Yes", '10', '9', '3'),
    ('26', "No", '10', '9', '3'),
    ('27', "I'm trying", '10', '9', '3'),
    ('28', "Excellent", '11', '10', '3'),
    ('29', "Terrible", '11', '10', '3'),
    ('30', "Meehh", '11', '10', '3'),
    ('31', "Darth Vader", NULL, '11', '3'),
    ('32', "Han Solo", NULL, '11', '3'),
    ('33', "Finn", NULL, '11', '3');
-- Insert Question data
INSERT INTO Answer (Session, OptionID, QuestionID, QuestionnaireID)
VALUES ("ab11", '1', '1', '1'),
    ("ab11", '6', '2', '1'),
    ("ab11", '8', '3', '1'),
    ("ab11", '10', '4', '1'),
    ("ac12", '13', '5', '2'),
    ("ac12", '17', '6', '2'),
    ("ac12", '19', '7', '2'),
    ("ad13", '24', '8', '2'),
    ("ad13", '25', '9', '3'),
    ("ad13", '30', '10', '3'),
    ("ad13", '31', '11', '3');
INSERT INTO Keywords (KeywordsID, KeywordsText, QuestionnaireID)
VALUES ('1', "key1", '1'),
    ('2', "key2", '1'),
    ('3', "key3", '1'),
    ('4', "key4", '1'),
    ('5', "key5", '1'),
    ('6', "key1", '2'),
    ('7', "key2", '2'),
    ('8', "key3", '2'),
    ('9', "key4", '2'),
    ('10', "key5", '2');