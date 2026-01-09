# 🥔 PotatoBugCrypto Web v12

Web version of PotatoBugCrypto for mobile access with friends!

## 🚀 Features

- **Room-based chat** - Private rooms with 3 words + 1 number code (68,400 combinations)
- **Real-time crypto prices** - Bitcoin, Ethereum, Solana, and more
- **Polymarket odds** - Live prediction market data
- **Psychedelic visualization** - Market-reactive v12 visualization with 6 modes
- **Fren Bot** - Friendly announcements for major market events
- **PWA support** - Add to home screen on mobile
- **Dark/Light mode** - Toggle between themes
- **Customizable** - Select coins, adjust quote frequency, viz quality

## 📱 Quick Deploy to Render.com

### Prerequisites
- GitHub account
- Render.com account (free)

### Deployment Steps

1. **Push code to GitHub**
   ```bash
   cd potato-bug-web
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/potato-bug-web.git
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will auto-detect the `render.yaml` config
   - Click "Create Web Service"
   - Wait ~3-5 minutes for deployment

3. **Share with friends**
   - Your URL: `https://potatobug-crypto.onrender.com`
   - Send link to friends
   - They can access instantly on phones!

### Cost Options

- **FREE tier**: App sleeps after 15 min of inactivity (30-60s wake time)
- **$7/month**: Always awake, instant access

## 🎮 How to Use

1. **Open the URL** on your phone/computer
2. **Generate or enter a room code**
3. **Choose a username**
4. **Start tracking crypto** with friends!

### Room Codes

- Random generation: 3 words + 1 number (e.g., `potato-moon-rocket-5`)
- Custom: Enter any code up to 20 characters
- Share code with friends to join same room

### Features

- **Select coins** - Choose which cryptocurrencies to track (Bitcoin always visible)
- **Chat** - Real-time chat with everyone in your room
- **Fren Bot** - Get notified about major market movements
- **Psychedelic viz** - Reacts to market conditions:
  - Normal: Smooth rainbow
  - Pump (+10%): Green particles, faster
  - Dump (-10%): Red vortex
  - Singularity (±15%): ABSOLUTE CHAOS
  - ATH: Gold everything
  - Extreme Fear/Greed: Special effects

- **Add to Home Screen** (iOS):
  1. Tap Share button
  2. Tap "Add to Home Screen"
  3. App opens like native app!

- **Add to Home Screen** (Android):
  1. Tap menu (⋮)
  2. Tap "Add to Home Screen"
  3. Confirm

## 🔧 Local Development

```bash
# Install dependencies
pip install -r requirements.txt

# Run server
python app.py

# Open browser
# http://localhost:10000
```

## 📊 Technical Stack

- **Backend**: FastAPI + WebSockets
- **Frontend**: Vanilla JavaScript + Canvas API
- **APIs**: CoinGecko, Polymarket, Alternative.me (Fear & Greed)
- **Deployment**: Render.com
- **PWA**: Service workers + manifest.json

## 🎨 Customization

Edit these files to customize:
- `static/script.js` - QUOTES array (line 15)
- `static/style.css` - Color scheme (`:root` section)
- `app.py` - Backend logic

## 🐛 Troubleshooting

**App won't load:**
- Check if Render service is running
- Check browser console for errors

**Chat not working:**
- Ensure WebSocket connection is active
- Check network/firewall settings

**Visualization lag:**
- Lower quality in Settings
- Try on better device

## 📝 Notes

- All data fetched client-side (no API keys needed!)
- Room codes stored in memory (not persistent)
- Chat messages are real-time only (not stored)
- Works offline after first load (PWA caching)

## 🚀 Made with love and way too much caffeine

*"I got a lil goop naimeen"*
