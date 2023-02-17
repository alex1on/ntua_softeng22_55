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
    Username VARCHAR(32) UNIQUE NOT NULL,
    psw VARCHAR (32) NOT NULL,
    email VARCHAR (64),
    last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (UserID)
);
-- 
-- Table structure for table 'Questionnaire'
--
CREATE TABLE Questionnaire (
    QuestionnaireID VARCHAR(32) NOT NULL,
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
    KeywordsID VARCHAR(32) NOT NULL,
    KeywordsText VARCHAR(255) NOT NULL,
    QuestionnaireID VARCHAR(32) NOT NULL,
    CONSTRAINT fk_Key_QuestionnaireID FOREIGN KEY (QuestionnaireID) REFERENCES Questionnaire (QuestionnaireID) ON DELETE CASCADE ON UPDATE CASCADE,
    /* If we delete keywords' questionnaire, then we don't want to keep this table. */
    last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (KeywordsID, QuestionnaireID)
);
-- 
-- Table structure for table 'Question'
--    
CREATE TABLE Question (
    QuestionID VARCHAR(32) NOT NULL,
    QText VARCHAR(255) NOT NULL,
    Q_Required ENUM ('true', 'false') NOT NULL,
    Q_Type ENUM ('Personal', 'Research') NOT NULL,
    QuestionnaireID VARCHAR(32) NOT NULL,
    CONSTRAINT fk_Question_QuestionnaireID FOREIGN KEY (QuestionnaireID) REFERENCES Questionnaire (QuestionnaireID) ON DELETE CASCADE ON UPDATE CASCADE,
    /* If we delete question's questionnaire, then we don't want to keep the question. */
    last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (QuestionID, QuestionnaireID)
);
-- 
-- Table structure for table 'Q_Option'
--  
CREATE TABLE Q_Option (
    OptionID VARCHAR(32) NOT NULL,
    OptText VARCHAR(255) NOT NULL,
    NextQID VARCHAR(32),
    CONSTRAINT fk_Option_NextQID FOREIGN KEY (NextQID) REFERENCES Question (QuestionID) ON DELETE
    SET NULL ON UPDATE CASCADE,
        QuestionID VARCHAR(32) NOT NULL,
        CONSTRAINT fk_Option_QuestionID FOREIGN KEY (QuestionID) REFERENCES Question (QuestionID) ON DELETE CASCADE ON UPDATE CASCADE,
        /* If we delete option's question, then we don't want to keep the option. */
        QuestionnaireID VARCHAR(32) NOT NULL,
        CONSTRAINT fk_Option_QuestionnaireID FOREIGN KEY (QuestionnaireID) REFERENCES Questionnaire (QuestionnaireID) ON DELETE CASCADE ON UPDATE CASCADE,
        last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (OptionID, QuestionID, QuestionnaireID)
);
-- 
-- Table structure for table 'Answer'
--  
CREATE TABLE Answer (
    Session VARCHAR(4) NOT NULL,
    OptionID VARCHAR(32) NOT NULL,
    CONSTRAINT fk_Answer_OptionID FOREIGN KEY (OptionID) REFERENCES Q_Option (OptionID) ON DELETE CASCADE ON UPDATE CASCADE,
    QuestionID VARCHAR(32) NOT NULL,
    CONSTRAINT fk_Answer_QuestionID FOREIGN KEY (QuestionID) REFERENCES Question (QuestionID) ON DELETE CASCADE ON UPDATE CASCADE,
    QuestionnaireID VARCHAR(32) NOT NULL,
    CONSTRAINT fk_Answer_QuestionnaireID FOREIGN KEY (QuestionnaireID) REFERENCES Questionnaire (QuestionnaireID) ON DELETE CASCADE ON UPDATE CASCADE,
    last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (Session, OptionID, QuestionID, QuestionnaireID)
);
-- Triggers
DELIMITER && 
CREATE TRIGGER trigInsert_option_nextQuestion BEFORE INSERT ON Q_Option FOR EACH ROW BEGIN IF NOT (
        (
            SELECT QuestionnaireID
            FROM Question
            WHERE QuestionID = NEW.NextQID
        ) = NEW.QuestionnaireID
    ) THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'The ID of the next question you provided does not match with a question ID of this questionnaire.';
END IF;
END && CREATE TRIGGER trigUpdate_option_nextQuestion BEFORE
UPDATE ON Q_Option FOR EACH ROW BEGIN IF NOT (
        (
            SELECT QuestionnaireID
            FROM Question
            WHERE QuestionID = NEW.NextQID
        ) = NEW.QuestionnaireID
    ) THEN SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'The ID of the next question you provided does not match with a question ID of this questionnaire.';
END IF;
END && 
DELIMITER ;
SET SQL_MODE = @OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;