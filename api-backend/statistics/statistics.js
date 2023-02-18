const fs = require('fs');
const path = require('path');

// Create (in case it doesn't exist) json file named "Questionnaire {QuestionnaireID}"
function file_creator(QuestionnaireID, QuestionnaireTitle, UserID) {

    const filename = `Questionnaire ${QuestionnaireID}.json`;
    const filepath = path.join(__dirname, filename);
    if (fs.existsSync(filepath)) {
        // File already exists, do nothing
        console.log(`File ${filename} already exists`);
        return;
    }
    // file doesn't exist, create it
    const data = {
        [`Questionnaire ${QuestionnaireID}`]: {
            QuestionnaireID: QuestionnaireID,
            QuestionnaireTitle: QuestionnaireTitle,
            UserID: UserID,
            keywords: [],
            Questions: [],
            Total_Questions: 0,
            Required_Questions: 0,
            Non_Required_Questions: 0,
            Personal_Questions: 0,
            Research_Questions: 0,
            Answers: 0,
            Sessions_Answered: []
        }
    };
    fs.writeFile(filepath, JSON.stringify(data, null, 2), err => {
        if(err)
            console.log(err);
            return;
    });
}

// Add KeywordText to keywords field
function AddKeyword(QuestionnaireID, KeywordText) {

    const filename = `Questionnaire ${QuestionnaireID}.json`;
    const filepath = path.join(__dirname, filename);

    if (!fs.existsSync(filepath)) {
        // file doesn't exist, do nothing
        console.log(`Questionnaire ${QuestionnaireID} not found`);
        return;
    }
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const questionnaire = JSON.parse(data);
        questionnaire[`Questionnaire ${QuestionnaireID}`].keywords.push(KeywordText);
        fs.writeFile(filepath, JSON.stringify(questionnaire, null, 2), err => {
            if (err) {
                console.log(err);
                return;
            }
        });
    });
}

// Add Question json object to Question field
function AddQuestion(QuestionnaireID, QuestionID, QuestionText, Required, Type) {
    
    const filename = `Questionnaire ${QuestionnaireID}.json`;
    const filepath = path.join(__dirname, filename);

    if (!fs.existsSync(filepath)) {
        // file doesn't exist, do nothing
        console.log(`Questionnaire ${QuestionnaireID} not found`);
        return;
    }
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const Question = {
            "QuestionID": QuestionID,
            "QText": QuestionText,
            "Required": Required,
            "Type": Type,
            "Options": [],
            "Answers": 0,
            "Sessions_Answered": []
        };
        const questionnaire = JSON.parse(data);

        // Update statistics
        if(Required === "true")
            questionnaire[`Questionnaire ${QuestionnaireID}`].Required_Questions++;
        else 
            questionnaire[`Questionnaire ${QuestionnaireID}`].Non_Required_Questions++;
        questionnaire[`Questionnaire ${QuestionnaireID}`].Total_Questions++;

        if(Type === "Personal")
            questionnaire[`Questionnaire ${QuestionnaireID}`].Personal_Questions++;
        else 
            questionnaire[`Questionnaire ${QuestionnaireID}`].Research_Questions++;

        // push question
        questionnaire[`Questionnaire ${QuestionnaireID}`].Questions.push(Question);
        fs.writeFile(filepath, JSON.stringify(questionnaire, null, 2), err => {
            if (err) {
                console.log(err);
                return;
            }
        });
    });
}

// Add Option json object to Options field in Questions
function AddOption (QuestionnaireID, QuestionID, OptionID, OptionText, NextQID) {

    const filename = `Questionnaire ${QuestionnaireID}.json`;
    const filepath = path.join(__dirname, filename);

    if (!fs.existsSync(filepath)) {
        // file doesn't exist, do nothing
        console.log(`Questionnaire ${QuestionnaireID} not found`);
        return;
    }
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const questionnaire = JSON.parse(data);

        // Search for question with QuestionID = {QuestionID}
        const question = questionnaire[`Questionnaire ${QuestionnaireID}`].Questions.find(q => q.QuestionID === QuestionID);
        if(!question) {
            // question doesn't exist
            console.log(`Question with QuestionID = ${QuestionID} doesn't exist in this Questionnaire!`);
            return;
        } 
        
        const Option = {
            "OptionID": OptionID,
            "OptionText": OptionText,
            "Times_Selected": 0,
            "Selection_Rate": 0,
            "Sessions_Selected": [],
            "NextQID": NextQID,
        };

        question.Options.push(Option);
        fs.writeFile(filepath, JSON.stringify(questionnaire, null, 2), err => {
            if (err) {
                console.log(err);
                return;
            }
        });
    });
}

// Update statistics from given answer
function AddAnswer (QuestionnaireID, QuestionID, Session, OptionID) {

    const filename = `Questionnaire ${QuestionnaireID}.json`;
    const filepath = path.join(__dirname, filename);

    if (!fs.existsSync(filepath)) {
        // file doesn't exist, do nothing
        console.log(`Questionnaire ${QuestionnaireID} not found`);
        return;
    }
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const questionnaire = JSON.parse(data);

        // Search for question with QuestionID = {QuestionID}
        const question = questionnaire[`Questionnaire ${QuestionnaireID}`].Questions.find(q => q.QuestionID === QuestionID);
        if(!question) {
            // question doesn't exist
            console.log(`Question with QuestionID = ${QuestionID} doesn't exist in this Questionnaire!`);
            return;
        } 
        
        // Search for option with OptionID = {OptionID}
        const option = question.Options.find(o => o.OptionID === OptionID);
        if(! option) {
            // option doesn't exist
            console.log(`Option with OptionID = ${OptionID} doesn't exist in this question!`);
            return;
        }

        questionnaire[`Questionnaire ${QuestionnaireID}`].Answers++;
        if(!questionnaire[`Questionnaire ${QuestionnaireID}`].Sessions_Answered.find(s => s === Session))
            questionnaire[`Questionnaire ${QuestionnaireID}`].Sessions_Answered.push(Session);
        
        if(!question.Sessions_Answered.find(s => s === Session))
            question.Sessions_Answered.push(Session);

        question.Answers++;
        option.Times_Selected++;
        option.Sessions_Selected.push(Session);

        Options = question.Options;
        for(let i = 0; i < Options.length; i++) {
            Options[i].Selection_Rate = parseFloat(Options[i].Times_Selected/question.Answers).toFixed(2) * 100;
        }

        fs.writeFile(filepath, JSON.stringify(questionnaire, null, 2), err => {
            if (err) {
                console.log(err);
                return;
            }
        });
    });
}

// Delete all json files
function resetallStatistics () {

    //Read the contents of the folder 
    fs.readdir(__dirname, (err, files) => {
        if(err) {
            console.log(err);
            return;
        }
        // Loop through all the files in the folder
        files.forEach(file => {
            const filepath = path.join(__dirname, file);
            // Check if the file is a JSON file
            if(path.extname(file) === ".json") {
                console.log(file);
                // Delete the file
                fs.unlink(filepath, err => {
                    if(err) {
                        console.log(err);
                        return;
                    }
                })
            }
        });
    });
}

// Reset Questionnaire's Answers and relevant data
function resetQuestionnaireAnswers (QuestionnaireID) {

    const filename = `Questionnaire ${QuestionnaireID}.json`;
    const filepath = path.join(__dirname, filename);

    if (!fs.existsSync(filepath)) {
        // file doesn't exist, do nothing
        console.log(`Questionnaire ${QuestionnaireID} not found`);
        return;
    }
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        const questionnaire = JSON.parse(data);

        // Reset Questionnaire's number of answers and  sessions answered
        questionnaire[`Questionnaire ${QuestionnaireID}`].Answers = 0;
        questionnaire[`Questionnaire ${QuestionnaireID}`].Sessions_Answered = [];

        // For each question in the Questions array
        Questions = questionnaire[`Questionnaire ${QuestionnaireID}`].Questions;
        Questions.forEach((question) => {
            // Reset the Answers and Sessions_Answered fields in the question object
            question.Answers = 0;
            question.Sessions_Answered = [];
            
            //For each option in the Options Array of each question
            question.Options.forEach((option) => {
                // Reset the Times_Selected, Selection_Rate and Sessions_Answered fields in the option object
                option.Times_Selected = 0;
                option.Selection_Rate = 0;
                option.Sessions_Selected = [];
            }); 
        });  
        fs.writeFile(filepath, JSON.stringify(questionnaire, null, 2), err => {
            if (err) {
                console.log(err);
                return;
            }
        });
    })
}

// Function that reads Questionnaire ${QuestionnaireID}.json file and returns the questionnaire object it contains
function getQuestionnaireFile (QuestionnaireID) {
    
    const filename = `Questionnaire ${QuestionnaireID}.json`;
    const filepath = path.join(__dirname, filename);

    if (!fs.existsSync(filepath)) {
        // file doesn't exist, do nothing
        console.log(`Questionnaire ${QuestionnaireID} not found`);
        return;
    }

    const file = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(file);
}

module.exports = { file_creator, AddKeyword, AddQuestion, AddOption, AddAnswer, resetallStatistics, resetQuestionnaireAnswers, getQuestionnaireFile };