const request = require("request");
const prompt = require("prompt-sync")({ sigint: true });


async function AnswerQuestionnaire({ questionnaire_id, session}){
  await AnswerQuestion(questionnaire_id,"Q04",session)
}

function AwaitRequest(url,method){
  return new Promise((resolve, reject) => {
    request( {
        url,
        method,
        strictSSL: false,
        json: true,
        callback:(err, res, body) => {
        if (err) {
          reject(err);
        }
        resolve(body)
      }
    }
    )
  });
}

function GetUserInput(question){
    const answer = prompt("Choose an answer from the choices above: ")
    const SelectedOption = question.options.find(x => x.OptionID === answer)
    if(SelectedOption === undefined){
        console.log("Invalid Input")
        return GetUserInput(question)
    }
    return SelectedOption
}

async function AnswerQuestion(questionnaire_id,question_id,session){
    console.clear()
    const { question }= await AwaitRequest(
        `https://localhost:9103/intelliq_api/question/${questionnaire_id}/${question_id}`,
        `get`
    )
    console.log(question.qtext)
    for(let option of question.options){
        console.log(`Option ${option.OptionID}: ${option.OptText}`)
    }
    const SelectedOption = GetUserInput(question)
    await AwaitRequest(
        `https://localhost:9103/intelliq_api/doanswer/${questionnaire_id}/${question_id}/${session}/${SelectedOption.OptionID}`,
        "post"
    )
    if (SelectedOption.NextQID === null ) return;
    AnswerQuestion(questionnaire_id, SelectedOption.NextQID ,session)
}

module.exports = AnswerQuestionnaire;