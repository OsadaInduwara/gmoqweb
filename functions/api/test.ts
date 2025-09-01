export async function onRequestGet() {
  console.log('Test function called');
  return new Response(JSON.stringify({ 
    message: 'Test function works!',
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

export async function onRequestPost() {
  console.log('Test POST function called');
  return new Response(JSON.stringify({ 
    message: 'Test POST function works!',
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}