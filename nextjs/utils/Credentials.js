export default async function validateUsrCredentials(username, password) {
    const url = `https://localhost:9103/login`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      if (!response.ok) {
        throw new Error('Failed to authenticate user');
      }
      const data = await response.json();

      return data;
      
    } catch (error) {
      console.error(error);
      return null;
    }
}
  