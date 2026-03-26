import { google } from 'googleapis';

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_REDIRECT_URI;

if (!clientId || !clientSecret || !redirectUri) {
  throw new Error('Missing Google Calendar API credentials in environment variables');
}

export const googleAuth = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri
);

// Get Google Calendar service
export const getGoogleCalendarService = (auth) => {
  return google.calendar({
    version: 'v3',
    auth: auth,
  });
};

// Generate authorization URL for user to grant permission
export const getAuthorizationUrl = () => {
  return googleAuth.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ],
    prompt: 'consent', // Force re-authentication to get refresh token
  });
};

// Exchange authorization code for tokens
export const getTokensFromCode = async (code) => {
  try {
    const { tokens } = await googleAuth.getToken(code);
    return tokens;
  } catch (error) {
    console.error('Error getting tokens from code:', error);
    throw error;
  }
};

// Create a new auth client with stored tokens
export const createAuthWithTokens = (tokens) => {
  const auth = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );
  auth.setCredentials(tokens);
  return auth;
};
