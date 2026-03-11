import 'dotenv/config';

async function test() {
  try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
              'Authorization': 'Bearer ' + process.env.GROQ_API_KEY,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              'model': 'llama-3.1-8b-instant',
              'messages': [
                  {'role': 'user', 'content': 'Hello'}
              ]
          })
      });
      const data = await response.json();
      console.log('GROQ RAW:', JSON.stringify(data, null, 2));
  } catch(e) { console.error(e) }
}
test();
