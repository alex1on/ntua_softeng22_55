USE intelliQ;

-- Delete Data
DELETE FROM Answer;
DELETE FROM Keywords;
DELETE FROM Q_Option;
DELETE FROM Question;
DELETE FROM Questionnaire;
DELETE FROM Q_User;
ALTER TABLE `Q_User` AUTO_INCREMENT = 1;
ALTER TABLE `Questionnaire` AUTO_INCREMENT = 1;
ALTER TABLE `Question` AUTO_INCREMENT = 1;
ALTER TABLE `Q_Option` AUTO_INCREMENT = 1;
ALTER TABLE `Answer` AUTO_INCREMENT = 1;
ALTER TABLE `Keywords` AUTO_INCREMENT = 1;

-- Insert Q_user data
INSERT INTO Q_User (UserID, Username, psw, email) VALUES 
    (1,'Manos', 'test1', 'Manos@example.com'),
    (2,'pGiad', 'test2', 'pGiad@example.com'),
    (3,'Alex', 'test3', 'Alex@example.com'),
    (4,'Velalo', 'test4', 'Velalo@example.com'),
    (5,'Skatz', 'test5', 'Skatz@example.com');

-- Insert Questionaire data
INSERT INTO Questionnaire (QuestionnaireTitle, UserID) VALUES 
    ("Manos' Questionnaire", 1),
    ("pGiad's Questionnaire", 2),
    ("Alex's Questionnaire", 3),
    ("Velalo's Questionnaire", 4),
    ("Skatz's Questionnaire", 5);
    


-- Insert Question data
INSERT INTO Question (QText, Q_Required, Q_Type, QuestionnaireID, UserID) VALUES 
    ('Do you prefer chess, basketball or football?', 1, 'Research', 1, 1),
    ('How old are you?', 1, 'Personal' , 1, 1),
    ('Do you prefer pizza, souvlaki or burger?',0, 'Research', 1, 1),
    ('What kind of music do you enjoy most?',0,'Research', 1, 1),
    ('Do you play games on PC, PlayStation or XBOX?',0, 'Research', 2, 2),
    ('What kind of games do you enjoy most?',1,'Research', 2, 2),
    ('How often do you use Spotify?',1,'Research', 2, 2),
    ('Will you ever shave?',1,'Research', 2, 2),
    ('Do you drive?',0,'Research', 3, 3),
    ('In what condition is your car?',1,'Research', 3, 3),
    ('Which is your favourite character in Star Wars?',1,'Research', 3, 3),
    ('Do you like cats?',1, 'Research',4, 4),
    ('How often do you go to gym?',1,'Research', 4, 4),
    ('Do you eat healthy?',1,'Research', 4, 4),
    ('Do you have a dog?', 1,'Research',5, 5),
    ('Which is your favourite hat?',1,'Research', 5, 5),
    ('What is your nickname?',1, 'Research',5, 5);
    
    
-- Insert Q_Option data
INSERT INTO Q_Option (OptText, NextQID, QuestionID, QuestionnaireID, UserID) VALUES 
    ("chess", 2, 1, 1, 1),
    ("basketball", 2, 1, 1, 1),
    ("football", 2, 1, 1, 1),
    ("18", 3, 2, 1, 1),
    ("20", 3, 2, 1, 1),
    ("22", 3, 2, 1, 1),
    ("pizza", 4, 3, 1, 1),
    ("souvlaki", 4, 3, 1, 1),
    ("burger", 4, 3, 1, 1),
    ("pop", NULL, 4, 1, 1),
    ("rock", NULL, 4, 1, 1),
    ("classic", NULL, 4, 1, 1),
    ("PC",6,5, 2, 2),
    ("XBOX",6,5, 2, 2),
    ("PlayStation",6,5, 2, 2),
    ("RPG",7,6, 2, 2),
    ("RTS",7, 6, 2, 2),
    ("MOBA",7, 6, 2, 2),
    ("Everyday",8, 7, 2, 2),
    ("Sometimes",8, 7, 2, 2),    
    ("Never",8, 7, 2, 2),
    ("Yes", NULL, 8, 2, 2),
    ("No", NULL, 8, 2, 2),
    ("Never!", NULL, 8, 2, 2),
    ("Yes", 10, 9 ,3, 3),
    ("No", 10, 9 ,3, 3),
    ("I'm trying", 10, 9 ,3, 3),
    ("Excellent", 11, 10 ,3, 3),
    ("Terrible", 11, 10 ,3, 3),
    ("Meehh", 11, 10 ,3, 3),
    ("Darth Vader", NULL, 11, 3, 3),
    ("Han Solo", NULL, 11, 3, 3),
    ("Finn", NULL, 11, 3, 3);

    
-- Insert Question data
INSERT INTO Answer (Session, OptionID, QuestionID, QuestionnaireID, UserID) VALUES
    ("ab11",1,1,1,1),
    ("ab11",6,2,1,1),
    ("ab11",8,3,1,1),
    ("ab11",10,4,1,1),
    ("ac12",13,5,2,2),
    ("ac12",17,6,2,2),
    ("ac12",19,7,2,2),
    ("ad13",24,8,2,3),
    ("ad13",25,9,3,3),
    ("ad13",30,10,3,3),
    ("ad13",31,11,3,3);
    
