async function healthCheck() {
    const response = await fetch(`${process.env.baseURL}/admin/healthcheck`);
    const data = await response.json();
    return data;
  }
  
  // Call the healthCheck function
  healthCheck().then((data) => {
    console.log(data);
  });
  