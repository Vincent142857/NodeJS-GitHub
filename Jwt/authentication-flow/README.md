# Authentication Flow
## Login:
- The backend returns on access-token and a refresh_token.

## Storage:
- access_token -> stored in memory or localStorage.
- refresh_token -> stored in an HTTP-only secure cookie (recommended)

## API Requests:
- The front-end sends Authorization: Bearer <access_token> in headers

## Access Token Expiration:
- The API responds with 401 Unauthorized if the token is expired.

## Token Refresh:
- The frontend hits/refresh-token with the refresh token (via cookie).
- If valid, the API return a new access token.

## Re-login if Invalid:
- If the refresh token is invalid or expired -> redirect to login.

## Best Practives
- Store refresh_token in secure HTTP-only cookie.
- Add token revocation logic (e.g. store valid token in DB)
- Secure/refresh_token endpoint (CSRF protection if needed)
- Never store refresh_token in localStorage or JavaScript accessible cookie.