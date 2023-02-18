#cli-presentation.sh

echo -e "\n--- CLI Presentation ---"

echo -e "\n"
read -p "Press enter to run healthcheck command..."
se2255 healthcheck

echo -e "\n"
read -p "Press enter to run questionnaire command..."
se2255 questionnaire -Q "QQ000" -f json

echo -e "\n"
read -p "Press enter to run question command..."
se2255 question -Q "QQ000" -q "P01" -f json

echo -e "\n"
read -p "Press enter to run answer command and answer only one question..."
se2255 doanswer -Q "QQ000" -q "P01" -s "0000" -o "P01A1"

echo -e "\n"
read -p "Press enter to run getquestionanswers command..."
se2255 getquestionanswers -Q "QQ000" -q "P01" -f json

echo -e "\n"
read -p "Press enter to run getsessionanswers command..."
se2255 getsessionanswers -Q "QQ000" -s "0000" -f json

echo -e "\n"
read -p "Press enter to run resetq command..."
se2255 resetq -Q "QQ000"

echo -e "\n"
read -p "Press enter to run resetall command..."
se2255 resetall

echo -e "\n"
read -p "Press enter to run admin --usermod command and add a new user..."
se2255 admin --usermod --username "New_User" --passw "myPSW"

echo -e "\n"
read -p "Press enter to run admin --usermod command and change the password of an existing user..."
se2255 admin --usermod --username "New_User" --passw "myNewPSW"

echo -e "\n"
read -p "Press enter to run admin --users command"
se2255 admin --users "New_User"

echo -e "\n"
read -p "Press enter to run questionnaire_upd command..."
se2255 questionnaire_upd -s "../questionnaire_sample.json"

echo -e "\n"
read -p "Press enter to run questionnaire command..."
se2255 questionnaire -Q "QQ000" -f json