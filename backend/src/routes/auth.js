import express from 'express';
import { supabase } from '../config/supabase.js';
import { getAuthorizationUrl, getTokensFromCode } from '../config/google-calendar.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Sign Up - Create new psychologist account
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm for demo
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Create profile for the user
    await supabase
      .from('profiles')
      .insert([
        {
          id: data.user.id,
          role: 'psychologist',
        },
      ]);

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: data.user.id,
        email: data.user.email
      }
    });
  } catch (error) {
    console.error('Sign up error:', error);
    res.status(500).json({ error: 'Sign up failed' });
  }
});

// Sign In - Get session token
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    res.json({
      message: 'Sign in successful',
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        user: {
          id: data.user.id,
          email: data.user.email,
        }
      }
    });
  } catch (error) {
    console.error('Sign in error:', error);
    res.status(500).json({ error: 'Sign in failed' });
  }
});

// Sign Out
router.post('/signout', authenticateUser, async (req, res) => {
  try {
    res.json({ message: 'Signed out successfully' });
  } catch (error) {
    console.error('Sign out error:', error);
    res.status(500).json({ error: 'Sign out failed' });
  }
});

// Get Google Calendar authorization URL
router.get('/google/auth-url', authenticateUser, async (req, res) => {
  try {
    const authUrl = getAuthorizationUrl();
    res.json({ authUrl });
  } catch (error) {
    console.error('Error getting auth URL:', error);
    res.status(500).json({ error: 'Failed to get authorization URL' });
  }
});

// Google OAuth Callback - Exchange code for tokens and store
router.post('/google/callback', authenticateUser, async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    // Exchange code for tokens
    const tokens = await getTokensFromCode(code);

    // Store tokens in oauth_credentials table
    const { error } = await supabase
      .from('oauth_credentials')
      .upsert({
        user_id: req.user.id,
        provider: 'google_calendar',
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        token_expires_at: new Date(tokens.expiry_date).toISOString(),
        google_calendar_id: 'primary', // Default to primary calendar
      }, { onConflict: 'user_id' });

    if (error) {
      console.error('Error storing OAuth credentials:', error);
      return res.status(500).json({ error: 'Failed to store calendar credentials' });
    }

    res.json({
      message: 'Google Calendar connected successfully',
      connected: true
    });
  } catch (error) {
    console.error('Google callback error:', error);
    res.status(500).json({ error: 'Failed to process Google authorization' });
  }
});

// Get current user info
router.get('/me', authenticateUser, async (req, res) => {
  try {
    // Get profile info
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Check if Google Calendar is connected
    const { data: oauthData } = await supabase
      .from('oauth_credentials')
      .select('provider')
      .eq('user_id', req.user.id)
      .single();

    res.json({
      user: {
        id: req.user.id,
        email: req.user.email,
        role: data.role,
        googleCalendarConnected: !!oauthData,
      }
    });
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
});

export default router;
