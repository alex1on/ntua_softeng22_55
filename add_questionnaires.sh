#add_questionnaires.sh

echo -e "\n--- Add json questionnaires ---"

se2255 login -u "Manos" -p "test1"

se2255 questionnaire_upd -s "./json_questionnaires/questionnaire1.json"
se2255 questionnaire_upd -s "./json_questionnaires/questionnaire2.json"
se2255 questionnaire_upd -s "./json_questionnaires/questionnaire3.json"
se2255 questionnaire_upd -s "./json_questionnaires/questionnaire4.json"

se2255 login -u "pGiad" -p "test2"

se2255 questionnaire_upd -s "./json_questionnaires/questionnaire5.json"