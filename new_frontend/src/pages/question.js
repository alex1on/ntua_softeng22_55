import React, { useEffect, useState } from 'react'

function Question_render() {
    const [backendData, setBackendData] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("https://localhost:9103/intelliq_api/question/1/1").then(
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
            <p>Question: {backendData.question.questionnaireID}</p>
            <p>Question: {backendData.question.questionID}</p>
            <p>Question: {backendData.question.qtext}</p>
            <p>Question: {backendData.question.required}</p>
            <p>Question: {backendData.question.type}</p>
            {
                backendData.question.options.map((option, i) => (
                    <div key={i}>
                        <p >Option : {option.OptionID}  </p>
                        <p >Option Text : {option.OptText} </p>
                        <p >Next Question : {option.NextQID} </p>
                    </div>
                ))
            }
        </div >

    )
}

export default Question_render;