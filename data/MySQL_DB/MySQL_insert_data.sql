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
INSERT INTO Q_User (UserID, Username, psw)
VALUES (1, 'Manos', 'test1'),
    (2, 'pGiad', 'test2'),
    (3, 'Alex', 'test3'),
    (4, 'Velalo', 'test4'),
    (5, 'Skatz', 'test5');
/*
-- Insert Questionaire data
INSERT INTO Questionnaire (QuestionnaireID, QuestionnaireTitle, UserID)
VALUES ('QQ001', "Manos' Questionnaire", 1),
    ('QQ002', "pGiad's Questionnaire", 2),
    ('QQ003' ,"Alex's Questionnaire", 3),
    ('QQ004', "Velalo's Questionnaire", 4),
    ('QQ005', "Skatz's Questionnaire", 5);

-- Insert Question data
INSERT INTO Question (QuestionID, QText, Q_Required, Q_Type, QuestionnaireID)
VALUES (
        'Q01',
        'Do you prefer chess, basketball or football?',
        'true',
        'Research',
        'QQ001'
    ),
    ('Q02', 'How old are you?', 'true', 'Personal', 'QQ001'),
    (
        'Q03',
        'Do you prefer pizza, souvlaki or burger?',
        'false',
        'Research',
        'QQ001'
    ),
    (
        'Q04',
        'What kind of music do you enjoy most?',
        'false',
        'Research',
        'QQ001'
    ),
    (   
        'Q05', 
        'Do you play games on PC, PlayStation or XBOX?',
        'false',
        'Research',
        'QQ002'
    ),
    (
        'Q06',
        'What kind of games do you enjoy most?',
        'true',
        'Research',
        'QQ002'
    ),
    (
        'Q07',
        'How often do you use Spotify?',
        'true',
        'Research',
        'QQ002'
    ),
    ('Q08', 'Will you ever shave?', 'true', 'Research', 'QQ002'),
    ('Q09', 'Do you drive?', 'false', 'Research', 'QQ003'),
    (
        'Q10', 
        'In what condition is your car?',
        'true',
        'Research',
        'QQ003'
    ),
    (
        'Q11', 
        'Which is your favourite character in Star Wars?',
        'true',
        'Research',
        'QQ003'
    ),
    ('Q12','Do you like cats?', 'true', 'Research', 'QQ004'),
    (
        'Q13',
        'How often do you go to gym?',
        'true',
        'Research',
        'QQ004'
    ),
    ('Q14', 'Do you eat healthy?', 'true', 'Research', 'QQ004'),
    ('Q15', 'Do you have a dog?', 'true', 'Research', 'QQ005'),
    (
        'Q16', 
        'Which is your favourite hat?',
        'true',
        'Research',
        'QQ005'
    ),
    ('Q17', 'What is your nickname?', 'true', 'Research', 'QQ005');

-- Insert Q_Option data
INSERT INTO Q_Option (OptionID, OptText, NextQID, QuestionID, QuestionnaireID)
VALUES ('Q01A1', "chess", 'Q02', 'Q01', 'QQ001'),
    ('Q01A2', "basketball", 'Q02', 'Q01', 'QQ001'),
    ('Q01A3', "football", 'Q02', 'Q01', 'QQ001'),
    ('Q02A1', "18", 'Q03', 'Q02', 'QQ001'),
    ('Q02A2', "20", 'Q03', 'Q02', 'QQ001'),
    ('Q02A3', "22", 'Q03', 'Q02', 'QQ001'),
    ('Q03A1', "pizza", 'Q04', 'Q03', 'QQ001'),
    ('Q03A2', "souvlaki", 'Q04', 'Q03', 'QQ001'),
    ('Q03A3', "burger", 'Q04', 'Q03', 'QQ001'),
    ('Q04A1', "pop", NULL, 'Q04', 'QQ001'),
    ('Q04A2', "rock", NULL, 'Q04', 'QQ001'),
    ('Q04A3', "classic", NULL, 'Q04', 'QQ001'),
    ('Q05A1', "PC", 'Q06', 'Q05', 'QQ002'),
    ('Q05A2', "XBOX", 'Q06', 'Q05', 'QQ002'),
    ('Q05A3', "PlayStation", 'Q06', 'Q05', 'QQ002'),
    ('Q06A1', "RPG", 'Q07', 'Q06', 'QQ002'),
    ('Q06A2', "RTS", 'Q07', 'Q06', 'QQ002'),
    ('Q06A3', "MOBA", 'Q07', 'Q06', 'QQ002'),
    ('Q07A1', "Everyday", 'Q08', 'Q07', 'QQ002'),
    ('Q07A2', "Sometimes", 'Q08', 'Q07', 'QQ002'),
    ('Q07A3', "Never", 'Q08', 'Q07', 'QQ002'),
    ('Q08A1', "Yes", NULL, 'Q08', 'QQ002'),
    ('Q08A2', "No", NULL, 'Q08', 'QQ002'),
    ('Q08A3', "Never!", NULL, 'Q08', 'QQ002'),
    ('Q09A1', "Yes", 'Q10', 'Q09', 'QQ003'),
    ('Q09A2', "No", 'Q10', 'Q09', 'QQ003'),
    ('Q09A3', "I'm trying", 'Q10', 'Q09', 'QQ003'),
    ('Q10A1', "Excellent", 'Q11', 'Q10', 'QQ003'),
    ('Q10A2', "Terrible", 'Q11', 'Q10', 'QQ003'),
    ('Q10A3', "Meehh", 'Q11', 'Q10', 'QQ003'),
    ('Q11A1', "Darth Vader", NULL, 'Q11', 'QQ003'),
    ('Q11A2', "Han Solo", NULL, 'Q11', 'QQ003'),
    ('Q11A3', "Finn", NULL, 'Q11', 'QQ003');

-- Insert Question data
INSERT INTO Answer (Session, OptionID, QuestionID, QuestionnaireID)
VALUES ("ab11", 'Q01A1', 'Q01', 'QQ001'),
    ("ab11", 'Q02A3', 'Q02', 'QQ001'),
    ("ab11", 'Q03A2', 'Q03', 'QQ001'),
    ("ab11", 'Q04A1', 'Q04', 'QQ001'),
    ("ac12", 'Q05A1', 'Q05', 'QQ002'),
    ("ac12", 'Q06A2', 'Q06', 'QQ002'),
    ("ac12", 'Q07A1', 'Q07', 'QQ002'),
    ("ad13", 'Q08A3', 'Q08', 'QQ002'),
    ("ad13", 'Q09A1', 'Q09', 'QQ003'),
    ("ad13", 'Q10A3', 'Q10', 'QQ003'),
    ("ad13", 'Q11A1', 'Q11', 'QQ003');
    
INSERT INTO Keywords (KeywordsText, QuestionnaireID)
VALUES ("key1", 'QQ001'),
    ("key2", 'QQ001'),
    ("key3", 'QQ001'),
    ("key4", 'QQ001'),
    ("key5", 'QQ001'),
    ("key1", 'QQ002'),
    ("key2", 'QQ002'),
    ("key3", 'QQ002'),
    ("key4", 'QQ002'),
    ("key5", 'QQ002');
*/