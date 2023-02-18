import React, { useState } from "react";
import Head from "next/head";
import { useEffect } from "react";
import axios from 'axios';
const initialOptions = [
  { id: 1, text: "Answer Option 1" },
  { id: 2, text: "Answer Option 2" },
  { id: 3, text: "Answer Option 3" },
];

const initialVoteCount = initialOptions.map(() => 0);

export default function Poll() {
  const [voteCount, setVoteCount] = useState(initialVoteCount);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [questionTitle, setQuestionTitle] = useState("");
  const [options, setOptions] = useState(initialOptions);

  const handleVote = (optionId) => {
    const newSelectedOptions = [...selectedOptions];
    if (!newSelectedOptions.includes(optionId)) {
      newSelectedOptions.push(optionId);
      setSelectedOptions(newSelectedOptions);
    } else {
      newSelectedOptions.splice(newSelectedOptions.indexOf(optionId), 1);
      setSelectedOptions(newSelectedOptions);
    }
    const newVoteCount = [...voteCount];
    newVoteCount[optionId] += 1;
    setVoteCount(newVoteCount);
  };

  const handleAddOption = () => {
    const newOption = {
      id: options.length + 1,
      text: "",
    };
    setOptions([...options, newOption]);
  };

  const handleTitleChange = (event) => {
    setQuestionTitle(event.target.value);
  };

  const handleOptionChange = (event, optionId) => {
    const newOptions = [...options];
    newOptions[optionId].text = event.target.value;
    setOptions(newOptions);
  };

  const handleNextQuestion = () => {
    setQuestionTitle("");
    setSelectedOptions([]);
    setOptions(initialOptions);
    setVoteCount(initialVoteCount);
    window.location.reload();
  };

  const handleCreateSurvey = async () => {
    try {
      const surveyData = {
        questionTitle,
        options,
        voteCount
      };
  
      const response = await axios.post('/api/create-survey', surveyData);
      if (response.status === 201) {
        // survey created successfully
        // you can show a success message or redirect to another page
      } else {
        // handle error
      }
    } catch (error) {
      console.log(error);
      // handle error
    }
  };

  return (
    <>
      <Head>
        <title>Create you Survey</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col flex-wrap justify-center text-center items-center p-6 rounded-lg">
        <h2 className="text-2xl font-medium ">Create your Survey</h2>
        <form>
          <div className="mb-4">
            <label className="block text-blue-800 font-medium mb-2">
              Question Title:
            </label>
            <input
              type="text"
              value={questionTitle}
              onChange={handleTitleChange}
              className="form-input rounded"
            />
          </div>
          {options.map((option, index) => (
            <div key={option.id} className="mb-2">
              <input
                type="checkbox"
                name="option"
                id={`option-${option.id}`}
                onChange={() => handleVote(index)}
                className="form-checkbox"
                checked={selectedOptions.includes(index)}
              />
              <label htmlFor={`option-${option.id}`} className="ml-2">
                <input
                  type="text"
                  value={option.text}
                  onChange={(event) => handleOptionChange(event, index)}
                  className="form-input rounded"
                />
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="font-semibold border-2 border-white hover:text-gray-500 py-2 px-4 rounded-lg hover:bg-white"
          >
            Add More Option
          </button>
          <button
            type="submit"
            className="inline-block px-12 py-2 mt-10 mb-10 font-semibold border-2 border-white rounded-full hover:bg-white hover:text-gray-500 ml-3"
          >
            Submit
          </button>
        </form>
        <div className="mt-4">
          {options.map((option, index) => (
            <div key={option.id} className="mb-2">
              <span className="font-medium">{option.text}:</span>{" "}
              {voteCount[index]} votes
            </div>
          ))}
          <div className="items-center p-6 rounded-lg">
            {/* ... your existing JSX */}
            <button
              type="button"
              onClick={handleNextQuestion}
              className="font-semibold border-2 border-white hover:text-gray-500 py-2 px-4 rounded-lg hover:bg-white"
            >
              Next Question
            </button>
            <button
              type="button"
              onClick={handleCreateSurvey}
              className="font-semibold border-2 border-white hover:text-gray-500 py-2 px-4 rounded-lg hover:bg-white ml-3 "
            >
              Create Survey
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
