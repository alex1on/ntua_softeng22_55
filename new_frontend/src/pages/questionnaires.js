import { useState, useEffect } from 'react';
//import Head from "./Head";

const SurveyPreviewPage = () => {
    const [surveys, setSurveys] = useState([]);

  return (
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
                  {surveys.map(survey => (
                    <div key={survey.id} className="bg-gray-50 rounded-lg shadow-md p-8">
                      <h3 className="text-lg font-bold mb-4">{survey.title}</h3>
                      <p className="text-gray-700 mb-4">{survey.description}</p>
                      <p className="text-sm text-gray-500 mb-4">{`${survey.total_responses} responses`}</p>
                      <a href={`/survey/${survey.id}`} className="text-blue-600 hover:underline">Take Survey</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
const Questionnaires = () => {
    return (
      <div>
        <SurveyPreviewPage />
      </div>
    );
  }
export default Questionnaires;
