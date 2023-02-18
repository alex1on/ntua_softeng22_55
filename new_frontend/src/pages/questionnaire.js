import React, { useEffect, useState } from 'react'

function Questionnaire_render() {
    const [backendData, setBackendData] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("https://localhost:9103/intelliq_api/questionnaire/1").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data);
                console.log('run');
                setIsLoading(false);
            }
        )
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }


    return (

        <div>
            <p>Questionnaire ID: {backendData.questionnaire.questionnaireID}</p>
            <p>Questionnaire Title: {backendData.questionnaire.questionnaireTitle}</p>
            {
                backendData.questionnaire.keywords.map((keyword, i) => (
                    <p key={i}>keyword: {keyword}</p>
                ))
            }
            {
                backendData.questionnaire.questions.map((question, i) => (
                    <div key={i}>
                        <p >Question : {question.QuestionID}  </p>
                        <p >Question : {question.QText} </p>
                        <p >Question : {question.Q_Required} </p>
                        <p >Question : {question.Q_Type} </p>
                    </div>
                ))
            }
        </div >

    )
}

export default Questionnaire_render;