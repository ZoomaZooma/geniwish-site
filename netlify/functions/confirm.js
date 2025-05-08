const { createClient } = require('@supabase/supabase-js');
const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = require('../../supabase-config.js');

exports.handler = async (event) => {
  try {
    // Parse query parameters
    const params = new URLSearchParams(event.rawQuery);
    const code = params.get('code');
    const type = params.get('type') || 'recovery';

    if (!code) {
      return {
        statusCode: 400,
        body: 'Missing reset code',
      };
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Verify the code (this might need adjustment based on your Supabase version)
    const { error } = await supabase.auth.verifyOtp({
      token_hash: code,
      type,
    });

    if (error) {
      console.error('Verification failed:', error.message);
      return {
        statusCode: 302,
        headers: {
          Location: '/auth/auth-code-error.html',
        },
      };
    }

    // Redirect to reset page with the code and type
    return {
      statusCode: 302,
      headers: {
        Location: `/reset-password.html?code=${encodeURIComponent(code)}&type=${type}`,
      },
    };

  } catch (err) {
    console.error('Error in confirm function:', err);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};