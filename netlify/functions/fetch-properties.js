const fetch = require('node-fetch');

exports.handler = async (event) => {
  const apiUrl = 'https://crmapi.proppydev.com/api/Property/ListProperties';
  const token = 'Basic ZXh0ZXJuYWxkZXY6Rml0aDVmQmRmZ3NkeEhWTUF4aXpkNW9yNjhn';

  const requestBody = {
    "Featured": true,
    "VisibleOnWebsite": true,
    "SequenceNmbr": 1,
    "MaxResponses": 10
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

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `API request failed with status ${response.status}` })
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.PropertyList)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};