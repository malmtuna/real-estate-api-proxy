const fetch = require('node-fetch');

exports.handler = async (event) => {
  const apiUrl = 'https://crmapi.proppydev.com/api/Property/SendProperty'; // New URL
  const token = 'Basic ZXh0ZXJuYWxkZXY6Rml0aDVmQmRmZ3NkeEhWTUF4aXpkNW9yNjhn';

  // Minimal request body (since it's for sending, we'll test with an empty object)
  const requestBody = {};

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: `API request failed with status ${response.status}` })
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data.Properties || data) // Adjust for possible response structure
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};