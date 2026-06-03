/**
 * Environment variable validation
 * Ensures all required environment variables are present at startup
 */

export function validateEnv(): void {
  const required = [
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
        `Please copy .env.example to .env and fill in the required values.`
    );
  }
}

// Validate environment in development mode
if (process.env.NODE_ENV === 'development') {
  try {
    validateEnv();
  } catch (error) {
    console.warn('Environment validation warning:', error);
  }
}
