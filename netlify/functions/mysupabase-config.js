exports.handler = async function () {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/javascript",
        "Access-Control-Allow-Origin": "*"
      },
      body: `
        export const SUPABASE_URL = "${process.env.SUPABASE_URL}";
        export const SUPABASE_ANON_KEY = "${process.env.SUPABASE_ANON_KEY}";
      `
    };
  };
  