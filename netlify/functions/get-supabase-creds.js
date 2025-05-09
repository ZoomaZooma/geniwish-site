// netlify/functions/get-supabase-creds.js
exports.handler = async function () {
  return {
    statusCode: 200,
    body: JSON.stringify({
      url: process.env.SUPABASE_URL,
      key: process.env.SUPABASE_ANON_KEY
    }),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
};
  