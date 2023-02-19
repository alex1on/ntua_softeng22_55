import React, { useEffect, useState } from 'react'

function Questionnaire_render() {
    const [backendData, setBackendData] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("https://localhost:9103/intelliq_api/questionnaires").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data);
                console.log(data);
                setIsLoading(false);
            }
        )
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }


    return (
        <>
            <div>

            </div >

            {/* <Head>
      <title> Preview Surveys Page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head> */}
            <div className="bg-black min-h-screen">
                <nav className="bg-gray-400 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold text-gray-900">Survey Preview</h1>
                            </div>
                        </div>
                    </div>
                </nav>

                <main>
                    <div className="py-10">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-gray-500 overflow-hidden shadow-xl sm:rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Available Surveys</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {
                                            backendData.questionnaires.Questionnaires.map((Questionnaire, i) => (
                                                <div>
                                                    <p>Questionnaire ID: {Questionnaire.questionnaireID}</p>
                                                    <p>Questionnaire Title: {Questionnaire.questionnaireTitle}</p>
                                                    {
                                                        Questionnaire.keywords.map((keyword, i) => (
                                                            <p key={i}>keyword: {keyword}</p>
                                                        ))
                                                    }
                                                    {
                                                        Questionnaire.questions.map((question, i) => (
                                                            <div key={i}>
                                                                <p >Question : {question.QuestionID}  </p>
                                                                <p >Question : {question.QText} </p>
                                                                <p >Question : {question.Q_Required} </p>
                                                                <p >Question : {question.Q_Type} </p>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Questionnaire_render;
