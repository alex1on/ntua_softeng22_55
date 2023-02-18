import { useState } from 'react';
import Head from "next/head";
/* import axios from 'axios';

const POLL_API_ENDPOINT = 'https://example.com/api/polls';*/

const DemoPage = () => {
  const [option1Votes, setOption1Votes] = useState(8);
  const [option2Votes, setOption2Votes] = useState(6);
  const [option3Votes, setOption3Votes] = useState(3);
  const [option4Votes, setOption4Votes] = useState(2);

  const totalVotes = option1Votes + option2Votes + option3Votes + option4Votes;
  const option1Percent = Math.round((option1Votes / totalVotes) * 100);
  const option2Percent = Math.round((option2Votes / totalVotes) * 100);
  const option3Percent = Math.round((option3Votes / totalVotes) * 100);
  const option4Percent = Math.round((option4Votes / totalVotes) * 100);

  const option1BarStyle = `bg-green-500 h-2 rounded-full w-${option1Percent}`;
  const option2BarStyle = `bg-blue-500 h-2 rounded-full w-${option2Percent}`;
  const option3BarStyle = `bg-red-500 h-2 rounded-full w-${option3Percent}`;
  const option4BarStyle = `bg-purple-500 h-2 rounded-full w-${option4Percent}`;

  /*useEffect(() => {
    axios.get(POLL_API_ENDPOINT)
      .then(response => setPolls(response.data))
      .catch(error => console.error(error));
  }, []);*/

  return (
    <>
    <Head>
      <title> Statistics Page</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header className="text-3xl center font-bold my-8">Experience Statistical Analyzer</header>
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="bg-gray-500 w-full max-w-md rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-4">What is your favorite color?</h1>
        <button onClick={handleOption1Click} className="bg-green-500 text-white px-4 py-2 rounded-full mb-2">{`Green (${option1Votes} votes)`}</button>
        <div className="flex items-center mb-2">
          <div className="w-3/12 text-right mr-2">{`${option1Percent}%`}</div>
          <div className="w-9/12 bg-gray-200 h-2 rounded-full">
            <div className={option1BarStyle}></div>
          </div>
        </div>
        <button onClick={handleOption2Click} className="bg-blue-500 text-white px-4 py-2 rounded-full mb-2">{`Blue (${option2Votes} votes)`}</button>
        <div className="flex items-center mb-2">
          <div className="w-3/12 text-right mr-2">{`${option2Percent}%`}</div>
          <div className="w-9/12 bg-gray-400 h-2 rounded-full">
            <div className={option2BarStyle}></div>
          </div>
        </div>
        <button onClick={handleOption3Click} className="bg-red-500 text-white px-4 py-2 rounded-full mb-2">{`Red (${option3Votes} votes)`}</button>
        <div className="flex items-center mb-2">
          <div className="w-3/12 text-right mr-2">{`${option3Percent}%`}</div>
          <div className="w-9/12 bg-gray-200 h-2 rounded-full">
            <div className={option3BarStyle}></div>
          </div>
        </div>
        <button onClick={handleOption4Click} className="bg-purple-500 text-white px-4 py-2 rounded-full mb-2">{`Purple (${option4Votes} votes)`}</button>
        <div className="flex items-center mb-2">
        <div className="w-3/12 text-right mr-2">{`${option4Percent}%`}</div>
<div className="w-9/12 bg-gray-200 h-2 rounded-full">
<div className={option4BarStyle}></div>
</div>
</div>
</div>
</div>
</>
);

function handleOption1Click() {
setOption1Votes(option1Votes + 1);
}

function handleOption2Click() {
setOption2Votes(option2Votes + 1);
}

function handleOption3Click() {
setOption3Votes(option3Votes + 1);
}

function handleOption4Click() {
setOption4Votes(option4Votes + 1);
}
};

export default DemoPage;


