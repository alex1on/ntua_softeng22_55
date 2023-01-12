#! /usr/bin/env node

const { program } = require("commander");
const questionnaire = require("./commands/questionnaire");
const question = require("./commands/question");
const resetall = require("./commands/resetall");
const resetq = require("./commands/resetq");
const getsessionanswers = require("./commands/getsessionanswers");
const getquestionanswers = require("./commands/getquestionanswers");
const doanswer = require("./commands/doanswer");

program
  .command("questionnaire")
  .description("Returns the requested questionnaire.")
  .requiredOption(
    "-Q, --questionnaire_id <questionnaire_id>",
    "The id of the requested questionnaire."
  )
  .requiredOption(
    "-f, --format <format>",
    "The preferred format of the response. Can be either `json` or `csv`."
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
    "The preferred format of the response. Can be either `json` or `csv`."
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
    "The preferred format of the response. Can be either `json` or `csv`."
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
    "The preferred format of the response. Can be either `json` or `csv`."
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

program.parse();
