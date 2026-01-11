# PotatoBug Crypto - Security Documentation

## Overview

PotatoBug is designed as a **public, anonymous crypto chat and tracking application**. There is NO user authentication or login system by design - users can join any room with any username.

## Security Measures Implemented

### 1. **Backend Security (FastAPI + WebSockets)**

#### Input Validation
- **Room Codes**: Limited to 20 characters max (validated client and server-side)
- **Usernames**: Limited to 20 characters max
- **Chat Messages**: Limited to 200 characters max
- **Zip Codes**: Must match 5-digit pattern `\d{5}`

#### WebSocket Security
- **Connection Handling**: Proper error handling and graceful disconnection
- **Message Type Validation**: Only accepts predefined message types:
  - `join` - Join a chatroom
  - `message` - Send chat message
  - `fren_bot` - Bot announcements
  - `fireworks` - Trigger fireworks effect
- **Room Isolation**: Users can only send messages to their own room
- **Auto-cleanup**: Empty rooms are automatically deleted
- **Connection Tracking**: Disconnected WebSockets are properly cleaned up

#### CORS Configuration
```python
CORSMiddleware(
    allow_origins=["*"],  # Public app - allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 2. **Frontend Security**

#### Content Security
- **No External Script Execution**: All JavaScript is served from the same origin
- **XSS Prevention**: Chat messages are rendered as text content, NOT HTML
- **Input Sanitization**: All user inputs are sanitized before display

#### API Security
- **Third-party APIs Used**:
  - CoinGecko (public API, read-only)
  - Polymarket CLOB API (public, read-only)
  - Alternative.me Fear & Greed (public, read-only)
  - wttr.in Weather API (public, requires user zip code)
  - RSS Feeds (Fox, CNBC, Bloomberg, WSJ, Reuters, CoinTelegraph)
- **No API Keys Required**: All APIs are public and free-tier
- **No Sensitive Data**: No personal information is collected or stored

#### Local Storage
- **What's Stored**:
  ```javascript
  {
    quotesEnabled: boolean,
    quoteInterval: number,
    vizQuality: string,
    newsEnabled: boolean,
    selectedCoins: array,
    userZipCode: string  // Optional, user-provided
  }
  ```
- **No Sensitive Data**: Only UI preferences stored locally
- **User Control**: Users can clear localStorage at any time

### 3. **Data Privacy**

#### No User Accounts
- No registration, login, or authentication
- No password storage or management
- No email addresses collected
- No phone numbers collected

#### No Persistent User Data
- Usernames exist only for current session
- Chat history is NOT stored server-side
- User sessions end when they close the browser
- No user tracking or analytics

#### Anonymous Usage
- Users can pick any username (including duplicates)
- No IP logging or user identification
- Rooms are ephemeral - deleted when empty

### 4. **WebSocket Security**

#### Connection Management
```python
class RoomManager:
    - Tracks active connections per room
    - Isolates room broadcasts
    - Handles disconnections gracefully
    - Prevents cross-room message leaks
```

#### Message Broadcasting
- Messages only sent to users in the same room
- Proper error handling prevents crashes
- Failed sends don't affect other users
- Automatic cleanup of dead connections

### 5. **Deployment Security (Render.com)**

#### HTTPS/WSS Encryption
- All traffic encrypted via TLS
- WebSocket connections use WSS (secure WebSocket)
- Certificates managed by Render

#### Environment Variables
```bash
PORT=10000  # Only non-sensitive config
```

#### Process Isolation
- FastAPI runs as single process
- Uvicorn manages worker lifecycle
- Auto-restart on crashes

### 6. **Rate Limiting & Abuse Prevention**

#### Current Measures
- **Message Length Limits**: Prevents spam flooding
- **Room Code Validation**: Prevents malformed requests
- **WebSocket Connection Limits**: System-level limits apply

#### Recommendations for Production
Consider adding:
- Rate limiting per IP (e.g., 100 messages/minute)
- WebSocket connection limit per IP
- Room creation throttling
- Content filtering for offensive language

### 7. **Known Limitations**

#### By Design (Public App)
- No user authentication
- No message moderation
- Anyone can join any room
- No ban/kick functionality
- No message history

#### Technical Limitations
- No DDoS protection (rely on Render's infrastructure)
- No IP-based rate limiting
- No content filtering
- No spam prevention beyond length limits

### 8. **Monitoring & Logging**

#### What's Logged
```python
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
```

Logs include:
- User joins/leaves
- Room creation/deletion
- WebSocket connection events
- Error messages

#### What's NOT Logged
- Chat message content
- User IP addresses
- Personal information
- Session data

### 9. **Third-Party Dependencies**

#### Backend (Python)
```
fastapi==0.104.1        # Web framework - well maintained
uvicorn==0.24.0        # ASGI server - production-ready
websockets             # WebSocket protocol - secure
```

#### Frontend
- No npm packages
- No third-party JavaScript libraries
- Vanilla JavaScript only
- No external dependencies

### 10. **Security Best Practices**

#### For Users
✅ **What to Do:**
- Use PotatoBug for casual crypto chat
- Don't share sensitive information
- Know that messages are public to room members
- Clear your browser data to remove settings

❌ **What NOT to Do:**
- Don't share private keys or seed phrases
- Don't discuss personal financial details
- Don't share personal contact information
- Don't assume privacy - all room members see messages

#### For Operators
✅ **Recommendations:**
- Monitor server logs for errors
- Keep dependencies updated
- Use Render's auto-deploy for security patches
- Monitor active room count for abuse

❌ **Don't:**
- Store chat message history
- Log user IP addresses
- Add user authentication (against design)
- Track user behavior

## Incident Response

### If Abuse Detected
1. Monitor active rooms via `/health` endpoint
2. Check logs for patterns
3. Restart server to clear all rooms (nuclear option)
4. Consider adding rate limiting

### If Security Vulnerability Found
1. Review code in affected area
2. Apply patch immediately
3. Redeploy via Render
4. No user notification needed (no accounts)

## Compliance

### Data Protection
- **GDPR**: No personal data collected
- **CCPA**: No California resident data stored
- **COPPA**: No age verification (assume 13+)

### Terms of Service
Users should understand:
- No privacy guarantee
- Messages visible to room members
- No moderation or content filtering
- Use at your own risk

## Security Contact

For security concerns:
- GitHub Issues: [potato-bug-web/issues](https://github.com/user/potato-bug-web/issues)
- Email: security@potatobug.app (if you set one up)

## Changelog

### Version 12 (Current)
- Added fireworks WebSocket message type
- Enhanced input validation
- Improved error handling
- Added this security documentation

---

**Last Updated**: January 2026

**Security Level**: Public Anonymous Chat Application
**Risk Level**: Low (no sensitive data, no authentication)
**Recommended Use**: Casual crypto discussion and price tracking
