import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Questionnaire_render from './pages/questionnaire';
import Question_render from './pages/question';

function App() {

  return (
    <div>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/questionnaire">Questionnaire</Link>
            </li>
            <li>
              <Link to="/question">Question</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questionnaire" element={<Questionnaire_render />} />
          <Route path="/question" element={<Question_render />} />
        </Routes>
      </BrowserRouter>
    </div >

  )
}

function Home() {
  return <h1>Home </h1>;
}


export default App
