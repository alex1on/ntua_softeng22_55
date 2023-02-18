import { useState } from 'react';

function ResetQuestionnaireForm() {
  const [questionnaireId, setQuestionnaireId] = useState('');
  const [resetResult, setResetResult] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`{baseURL}/admin/resetq/${questionnaireId}`, {
        method: 'POST',
      });
      const data = await response.json();
      setResetResult(data);
    } catch (error) {
      console.error(error);
      setResetResult({ status: 'failed', reason: error.message });
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Questionnaire ID:
          <input type="text" value={questionnaireId} onChange={(e) => setQuestionnaireId(e.target.value)} />
        </label>
        <button type="submit">Reset Questionnaire</button>
      </form>
      {resetResult && (
        <div>
          <p>Reset Status: {resetResult.status}</p>
          {resetResult.reason && <p>Reason: {resetResult.reason}</p>}
        </div>
      )}
    </div>
  );
}
