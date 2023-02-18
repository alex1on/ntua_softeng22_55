#! /usr/bin/env node

const { program } = require("commander");
const login = require("./commands/login");
const logout = require("./commands/logout");
const healthcheck = require("./commands/healthcheck");
const questionnaire = require("./commands/questionnaire");
const question = require("./commands/question");
const resetall = require("./commands/resetall");
const resetq = require("./commands/resetq");
const getsessionanswers = require("./commands/getsessionanswers");
const getquestionanswers = require("./commands/getquestionanswers");
const doanswer = require("./commands/doanswer");
const questionnaire_upd = require("./commands/questionnaire_upd");
const admin = require("./commands/admin");
const AnswerQuestionnaire = require("./commands/AnswerQuestionnaire");

program
  .command("login")
  .description("Enter 'username' and 'password' to login as a user.")
  .action(login);

program
  .command("logout")
  .description("Logout.")
  .action(logout);

program
  .command("healthcheck")
  .description(
    "Confirms the end-to-end connectivity between the user and the database."
  )
  .action(healthcheck);

program
  .command("questionnaire")
  .description("Returns the requested questionnaire.")
  .requiredOption(
    "-Q, --questionnaire_id <questionnaire_id>",
    "The id of the requested questionnaire."
  )
  .requiredOption(
    "-f, --format <format>",
    "The preferred format of the response. Can be either 'json' or 'csv'."
  )
  .action(questionnaire);

program
  .command("question")
  .description("Returns the requested question.")
  .requiredOption(
    "-Q, --questionnaire_id <questionnaire_id>",
    "The questionnaire id of the requested question."
  )
  .requiredOption(
    "-q, --question_id <question_id>",
    "The question id of the requested question."
  )
  .requiredOption(
    "-f, --format <format>",
    "The preferred format of the response. Can be either 'json' or 'csv'."
  )
  .action(question);

program
  .command("resetall")
  .description("Reset the database and erases all the data.")
  .action(resetall);

program
  .command("resetq")
  .description("Delete the answers for the requested questionnaire.")
  .requiredOption(
    "-Q, --questionnaire_id <questionnaire_id>",
    "The id of the questionnaire of which the answers will be deleted."
  )
  .action(resetq);

program
  .command("getsessionanswers")
  .description("Get the given answers of a session.")
  .requiredOption(
    "-Q, --questionnaire_id <questionnaire_id>",
    "The id of the answer's questionnaire."
  )
  .requiredOption("-s, --session <session>", "The id of the answer's session.")
  .requiredOption(
    "-f, --format <format>",
    "The preferred format of the response. Can be either 'json' or 'csv'."
  )
  .action(getsessionanswers);

program
  .command("getquestionanswers")
  .description("Get the given answers for a question of a questionnaire.")
  .requiredOption(
    "-Q, --questionnaire_id <questionnaire_id>",
    "The id of the answer's questionnaire."
  )
  .requiredOption(
    "-q, --question_id <question_id>",
    "The id of the answer's question."
  )
  .requiredOption(
    "-f, --format <format>",
    "The preferred format of the response. Can be either 'json' or 'csv'."
  )
  .action(getquestionanswers);

program
  .command("doanswer")
  .description("Register an answer for a question and a session.")
  .requiredOption("-Q, --questionnaire_id <questionnaire_id>", "")
  .requiredOption("-q, --question_id <question_id>", "")
  .requiredOption("-s, --session <session>", "")
  .requiredOption("-o, --option_id <option_id>", "")
  .action(doanswer);

program
  .command("questionnaire_upd")
  .description(
    "Upload a JSON file with the data of a new questionnaire on database."
  )
  .requiredOption(
    "-s, --source <source>",
    "The name of the JSON file that contains the questionnaire."
  )
  .action(questionnaire_upd);

program
  .command("admin")
  .description(
    "Actions that only admins can do. It is required to choose one and only one of the options '--usermod' and '--users <username>'. If the option '--usermod' is chosen then options '--username <username>' and '--passw <password>' are required. See the options below for more details."
  )
  .option(
    "--usermod",
    "Create a new user or change the password of an existing one."
  )
  .option(
    "--users <username>",
    "Returns the state of an existing user. The value of this parameter should be user's username."
  )
  .option(
    "--username <username>",
    "The username of the new user or of the one whose password will be changed."
  )
  .option(
    "--passw <password>",
    "The password of the new user or the current password of an existing username."
  )
  .action(admin);

program
  .command("AnswerQuestionnaire")
  .description("Answer a questionnaire from start to finish")
  .requiredOption("-Q, --questionnaire_id <questionnaire_id>", "")
  .requiredOption("-s, --session <session>", "")
  .action(AnswerQuestionnaire);


program.parse();
