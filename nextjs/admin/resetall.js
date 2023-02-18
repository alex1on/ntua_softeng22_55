import { useState } from "react";

function ResetAllButton() {
  const [response, setResponse] = useState(null);

  async function handleResetAllClick() {
    try {
      const res = await fetch("https://localhost:9103", {
        method: "POST",
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error(error);
      setResponse({ status: "failed", reason: error.message });
    }
  }

  return (
    <div>
      <button onClick={handleResetAllClick}>Reset All Data</button>
      {response && (
        <div>
          <p>Status: {response.status}</p>
          {response.reason && <p>Reason: {response.reason}</p>}
        </div>
      )}
    </div>
  );
}
