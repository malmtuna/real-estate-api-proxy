const fetch = require('node-fetch');

exports.handler = async (event) => {
  const imageUrl = decodeURIComponent(event.queryStringParameters.url);
  const token = 'Basic ZXh0ZXJuYWxkZXY6Rml0aDVmQmRmZ3NkeEhWTUF4aXpkNW9yNjhn';

  try {
    const imageResponse = await fetch(imageUrl, {
      headers: { 'Authorization': token }
    });

    if (!imageResponse.ok) {
      return {
        statusCode: imageResponse.status,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: 'Image fetch failed'
      };
    }

    const imageBuffer = await imageResponse.buffer();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': imageResponse.headers.get('Content-Type') || 'image/jpeg',
        'Access-Control-Allow-Origin': '*'
      },
      body: imageBuffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: error.message
    };
  }
};