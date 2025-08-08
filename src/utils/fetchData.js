// src/utils/fetchData.js

export async function fetchData(url, method = "GET", body = null) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    };
  
    const response = await fetch(url, options);
  
    if (!response.ok) {
      const message = `Error ${response.status}: ${response.statusText}`;
      throw new Error(message);
    }
  
    return await response.json();
  }
  