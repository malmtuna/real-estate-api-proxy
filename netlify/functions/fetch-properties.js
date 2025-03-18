const fetch = require('node-fetch');

exports.handler = async (event) => {
  const apiUrl = 'https://crmapi.proppydev.com/api/Property/ListProperties';
  const token = 'Basic ZXh0ZXJuYWxkZXY6Rml0aDVmQmRmZ3NkeEhWTUF4aXpkNW9yNjhn';

  const requestBody = {
    "SequenceNmbr": 1,
    "MaxResponses": 6
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: `API request failed with status ${response.status}` })
      };
    }

    console.log('API Response:', JSON.stringify(data, null, 2)); // Temporary log
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data.PropertyList)
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    };
  }
};