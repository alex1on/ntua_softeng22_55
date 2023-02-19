#cli-presentation.sh

echo -e "\n--- CLI Presentation ---"

echo -e "\n"
read -p "Press enter to run healthcheck command when not logged in..."
se2255 healthcheck

echo -e "\n"
read -p "Press enter to log in incorrectly(various instances)..."
se2255 login -u manos
se2255 login -u manos -p 
se2255 login -u manps -p secretcode


echo -e "\n"
read -p "Press enter to log in..."
se2255 login -u Manos -p test1

echo -e "\n"
read -p "Press enter to run healthcheck command..."
se2255 healthcheck

echo -e "\n"
read -p "Press enter to add questionnaires in DB..."
bash ../add_questionnaires.sh

echo -e "\n"
read -p "Press enter to run questionnaire command..."
se2255 questionnaire -Q "QQ001" -f json

echo -e "\n"
read -p "Press enter to run answer command and answer only one question..."
se2255 doanswer -Q "QQ001" -q "Q01" -s "0000" -o "Q01A1"

echo -e "\n"
read -p "Press enter to run getquestionanswers command..."
se2255 getquestionanswers -Q "QQ001" -q "Q01" -f json

#echo -e "\n"
#read -p "Press enter to run resetall command..."
#se2255 resetall

#echo -e "\n"
#read -p "Press enter to run questionnaire_upd command..."
#se2255 questionnaire_upd -s "../test.json"

#echo -e "\n"
#read -p "Press enter to run questionnaire command..."
#se2255 questionnaire -Q "QQ001" -f json

echo -e "\n"
read -p "Press enter to log out..."
se2255 logout