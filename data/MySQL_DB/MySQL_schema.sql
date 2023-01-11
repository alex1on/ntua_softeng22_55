SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS,
    UNIQUE_CHECKS = 0;
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
    FOREIGN_KEY_CHECKS = 0;
SET @OLD_SQL_MODE = @@SQL_MODE,
    SQL_MODE = 'TRADITIONAL';
    
DROP SCHEMA IF EXISTS intelliQ;
CREATE SCHEMA intelliQ;
USE intelliQ;

-- 
-- Table structure for table 'Q_User'
--
CREATE TABLE Q_User (
	UserID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    Username VARCHAR(32) NOT NULL,
    psw VARCHAR (32) NOT NULL,
    email VARCHAR (64),
    last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (UserID)
);

-- 
-- Table structure for table 'Questionnaire'
--
CREATE TABLE Questionnaire (
	QuestionnaireID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    QuestionnaireTitle VARCHAR(255) NOT NULL, 
    UserID INT UNSIGNED NOT NULL, 
    CONSTRAINT fk_UserID FOREIGN KEY (UserID) REFERENCES Q_User (UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    /* If we delete questionnaire's user, then we don't want to keep the questionnaire. */
    last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (QuestionnaireID, UserID)
);

-- 
-- Table structure for table 'Keywords'
--    
CREATE TABLE Keywords (
	KeywordsID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    KeywordsText VARCHAR(32) NOT NULL,
    QuestionnaireID INT UNSIGNED NOT NULL,
    CONSTRAINT fk_Key_QuestionnaireID FOREIGN KEY (QuestionnaireID) REFERENCES Questionnaire (QuestionnaireID) ON DELETE CASCADE ON UPDATE CASCADE,
    /* If we delete keywords' questionnaire, then we don't want to keep this table. */
    UserID INT UNSIGNED NOT NULL, 
    CONSTRAINT fk_Key_UserID FOREIGN KEY (UserID) REFERENCES User (UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (KeywordsID, QuestionnaireID, UserID)
);

-- 
-- Table structure for table 'Question'
--    
CREATE TABLE Question (
	QuestionID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    QText VARCHAR(255) NOT NULL, 
    Q_Required BINARY(1) NOT NULL,
    Q_Type ENUM (
		'Personal',
        'Research'
	) NOT NULL,
    QuestionnaireID INT UNSIGNED NOT NULL,
    CONSTRAINT fk_Question_QuestionnaireID FOREIGN KEY (QuestionnaireID) REFERENCES Questionnaire (QuestionnaireID) ON DELETE CASCADE ON UPDATE CASCADE,
    /* If we delete question's questionnaire, then we don't want to keep the question. */
    UserID INT UNSIGNED NOT NULL, 
    CONSTRAINT fk_Question_UserID FOREIGN KEY (UserID) REFERENCES User (UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (QuestionID, QuestionnaireID, UserID)
);

-- 
-- Table structure for table 'Q_Option'
--  
CREATE TABLE Q_Option (
	OptionID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    OptText VARCHAR(255) NOT NULL,
    NextQID INT UNSIGNED,
    CONSTRAINT fk_Option_NextQID FOREIGN KEY (NextQID) REFERENCES Question (QuestionID) ON DELETE SET NULL ON UPDATE CASCADE,
    QuestionID INT UNSIGNED NOT NULL,
	CONSTRAINT fk_Option_QuestionID FOREIGN KEY (QuestionID) REFERENCES Question (QuestionID) ON DELETE CASCADE ON UPDATE CASCADE,
    /* If we delete option's question, then we don't want to keep the option. */
    QuestionnaireID INT UNSIGNED NOT NULL,
    CONSTRAINT fk_Option_QuestionnaireID FOREIGN KEY (QuestionnaireID) REFERENCES Questionnaire (QuestionnaireID) ON DELETE CASCADE ON UPDATE CASCADE,
    UserID INT UNSIGNED NOT NULL, 
    CONSTRAINT fk_Option_UserID FOREIGN KEY (UserID) REFERENCES User (UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (OptionID, QuestionID, QuestionnaireID, UserID)
);

-- 
-- Table structure for table 'Answer'
--  
CREATE TABLE Answer (
    Session INT UNSIGNED NOT NULL AUTO_INCREMENT,
    OptionID INT UNSIGNED NOT NULL,
    CONSTRAINT fk_Answer_OptionID FOREIGN KEY (OptionID) REFERENCES Q_Option (OptionID) ON DELETE CASCADE ON UPDATE CASCADE,
    QuestionID INT UNSIGNED NOT NULL,
    CONSTRAINT fk_Answer_QuestionID FOREIGN KEY (QuestionID) REFERENCES Question (QuestionID) ON DELETE CASCADE ON UPDATE CASCADE,
    QuestionnaireID INT UNSIGNED NOT NULL,
    CONSTRAINT fk_Answer_QuestionnaireID FOREIGN KEY (QuestionnaireID) REFERENCES Questionnaire (QuestionnaireID) ON DELETE CASCADE ON UPDATE CASCADE,
    UserID INT UNSIGNED NOT NULL, 
    CONSTRAINT fk_Answer_UserID FOREIGN KEY (UserID) REFERENCES User (UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Session, OptionID, QuestionID, QuestionnaireID, UserID)
); 

SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;