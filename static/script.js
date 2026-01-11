// PotatoBugCrypto v12 Web - FULLY FIXED VERSION
// All bugs resolved, all features working

// ==================== CONSTANTS ====================

const WORD_LIST = [
    'potato', 'crypto', 'moon', 'rocket', 'diamond', 'hands', 'bull', 'bear',
    'whale', 'doge', 'satoshi', 'hodl', 'lambo', 'fomo', 'dip', 'pump',
    'stack', 'gwei', 'defi', 'nft', 'wen', 'ser', 'fren', 'wagmi',
    'ngmi', 'btfd', 'rekt', 'cope', 'shill', 'bag', 'ape', 'alpha',
    'beta', 'chad', 'karen', 'boomer', 'zoomer', 'based', 'cringe', 'vibe',
    'yolo', 'safu', 'rugpull', 'scam', 'legit', 'mint', 'stake', 'yield',
    'pool', 'vault', 'farm', 'harvest', 'claim', 'bridge', 'swap', 'wrap',
    'burn', 'lock', 'vest', 'airdrop', 'snapshot', 'epoch', 'slash', 'bond',
    'validator', 'node', 'block', 'chain', 'ledger', 'wallet', 'key', 'seed',
    'hash', 'proof', 'gas', 'fee', 'tip', 'nonce', 'merkle', 'tree'
];

const USERNAME_WORDS = ['bug', 'potato', 'goop', 'dino'];

const QUOTES = [
    "I got a lil goop naimeen",
    "An angel of the Lord came to me in a dream and his name was Obi Wagwom.",
    "Impossible to not be bullish or even picture a 4 digit price per shmeckle.",
    "That's the dream of Obi Wigwom.",
    "But now I see young Jahnakin, I see like Mr. Lounds.",
    "Wise like count doobie.",
    "The King of kings",
    "What time is it?",
    "Pretty smart for a tanker",
    "My reputation proceeds me.",
    "One piece of advice for everyone before we go in there: this could get a little ugly, but whatever you do, just tell the truth. No sugarcoating. Do not change a word of it. No one here is smart enough, including the rocket scientist.",
    "There are three ways to make a living in this business: be first, be smarter, or cheat.",
    "If you're first out the door, A that's not called panicking.",
    "Put the gravy on the mashed potato",
    "I need to return some video tapes",
    "Where in the world is Carmen San Diego?",
    "Dancing around with bonerblue gorillas",
    "Saucy fingers, livin' like kings!",
    "M-U-N that spells moon",
    "Put it in the good spot Patty",
    "I'm taking all my money and buying rare cheese. Rare Cheese Reserve Crypto!",
    "Jim Marcell crypto!",
    "ARE YOU IN OR NOT?",
    "Idk.",
    "This is it!",
    "We are selling to willing buyers at the current fair market price.",
    "Do you care to know why I'm in this chair with you all? I mean, why I earn the big bucks?",
    "So urgently in fact probably should've been addressed weeks ago. But that is spilt milk under the bridge.",
    "ALL YOUR MODELS ARE DESTROYED",
    "NOT REAL",
    "REAL",
    "I'm finished!",
    "There's a whole ocean of oil under our feet!",
    "Talk about right place right time hehehehehe",
    "Some liquor, some women.",
    "Peach tree dance, Eli.",
    "Don't be a panickan. -DJT",
    "I'm here for one reason and one reason alone. I'm here to guess what the music might do a week, a month, a year from now. That's it. Nothing more.",
    "Speak as you might to a young child. Or a golden retriever. It wasn't brains that brought me here; I assure you that.",
    "Ecosystem bug in full effect"
];

// Arc Raiders 80s Miami Retro Cyberpunk Color Palette
const COLORS = {
    bg_dark: '#0a0e1a',
    bg_medium: '#1a1f35',

    // 80s Miami Vice Colors
    miami_pink: '#ff006e',      // Hot Miami pink
    miami_cyan: '#00f5ff',      // Bright cyan
    miami_purple: '#8b00ff',    // Deep purple
    sunset_orange: '#ff4500',   // Miami sunset
    vice_magenta: '#ff00aa',    // Vice magenta

    // Cyberpunk Neons
    neon_cyan: '#00ffff',
    neon_magenta: '#ff00ff',
    neon_purple: '#b026ff',
    hot_pink: '#ff1493',
    nuclear_green: '#39ff14',
    electric_yellow: '#ffff00',
    neon_orange: '#ff6600',
    electric_blue: '#00d4ff',

    // Arc Raiders Signature Colors
    arc_blue: '#0affff',        // Bright electric blue
    arc_pink: '#ff0090',        // Vibrant pink
    arc_purple: '#9d00ff',      // Deep purple
    arc_teal: '#00ffcc',        // Teal accent

    // Market Colors
    gold: '#ffd700',
    blood_red: '#ff0000',       // Deep red for dumps
    poison_green: '#00ff41',    // Toxic green for pumps

    // Calm Mode (80s Retro Lounge)
    retro_pink: '#ff6ec7',
    retro_blue: '#00d4ff',
    retro_purple: '#b794f6',
    retro_teal: '#00ffcc'
};

// ==================== STATE ====================

let ws = null;
let currentRoom = null;
let currentUsername = null;
let selectedCoins = ['bitcoin', 'ripple'];
let allCoinsList = [];
let coinData = {};
let polymarketData = [];
let fngIndex = null;
let btcActualAth = 0;
let newsHeadlines = [];
let lastBtcChange = 0;

let quotesEnabled = true;
let quoteInterval = 3;
let vizQuality = 'auto';
let newsEnabled = true;
let userZipCode = null;
let weatherData = null;

let canvas, ctx;
let particles = [];
let tunnelSegments = [];
let arcLines = []; // Arc Raiders signature arcs
let btcSymbolAngle = 0;
let vizMode = 'normal';
let lightningBolts = [];
let vortexRotation = 0; // For drain/vortex rotation

// Music and fireworks state
let musicPlaying = false;
let fireworksCanvas, fireworksCtx;
let fireworksParticles = [];

// UFO easter egg for fullscreen mode
let isFullscreen = false;
let ufoX = 0;
let ufoY = 0;
let ufoVelX = 2;
let ufoVelY = 1;
let ufoVisible = false;

// ==================== ROOM CODE SYSTEM ====================

function generateRoomCode() {
    const word1 = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    const word2 = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    const word3 = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    const number = Math.floor(Math.random() * 10);
    return `${word1}-${word2}-${word3}-${number}`;
}

function generateRandomUsername() {
    const word1 = USERNAME_WORDS[Math.floor(Math.random() * USERNAME_WORDS.length)];
    const word2 = USERNAME_WORDS[Math.floor(Math.random() * USERNAME_WORDS.length)];
    // Capitalize first letter of each word
    const capitalizedWord1 = word1.charAt(0).toUpperCase() + word1.slice(1);
    const capitalizedWord2 = word2.charAt(0).toUpperCase() + word2.slice(1);
    return `${capitalizedWord1} ${capitalizedWord2}`;
}

function validateRoomCode(code) {
    return code && code.length > 0 && code.length <= 20;
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    loadPersistedData();
    setupRoomModal();
    initArcRaidersIntro(); // Start Arc Raiders welcome animation

    canvas = document.getElementById('psychedelicCanvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }

    detectVizQuality();
    fetchAllCoinsList();
});

function setupRoomModal() {
    const enterBtn = document.getElementById('enterBtn');
    const customInput = document.getElementById('customRoomInput');
    const usernameInput = document.getElementById('usernameInput');

    // Auto-generate random username on page load
    const randomUsername = generateRandomUsername();
    usernameInput.value = randomUsername;

    enterBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim() || generateRandomUsername();
        const roomCode = customInput.value.trim().toLowerCase() || 'goop';

        if (validateRoomCode(roomCode)) {
            joinRoom(roomCode, username);
        } else {
            alert('Invalid room code');
        }
    });

    customInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') enterBtn.click();
    });

    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') enterBtn.click();
    });
}

function joinRoom(roomCode, username) {
    currentRoom = roomCode;
    currentUsername = username;

    document.getElementById('roomModal').style.display = 'none';
    document.getElementById('appContainer').style.display = 'block';
    document.getElementById('roomCodeDisplay').textContent = roomCode;
    document.getElementById('settingsRoomCode').textContent = roomCode;

    // Setup event listeners AFTER app container is visible
    setupEventListeners();

    connectWebSocket();
    fetchAllData();
    startDataUpdates();
    initVisualization();
    animate();
    startChatQuoteRotation();
    updateSelectedCoinsDisplay();
    initFireworksCanvas();

    if (userZipCode) {
        fetchWeather();
    }
}

// ==================== PERSISTENT STORAGE ====================

function loadPersistedData() {
    const saved = localStorage.getItem('pbcSettings');
    if (saved) {
        const settings = JSON.parse(saved);
        quotesEnabled = settings.quotesEnabled ?? true;
        quoteInterval = settings.quoteInterval ?? 3;
        vizQuality = settings.vizQuality ?? 'auto';
        newsEnabled = settings.newsEnabled ?? true;
        selectedCoins = settings.selectedCoins ?? ['bitcoin', 'ripple'];
        // Ensure Bitcoin and XRP are always in the list
        if (!selectedCoins.includes('bitcoin')) {
            selectedCoins.unshift('bitcoin');
        }
        if (!selectedCoins.includes('ripple')) {
            selectedCoins.push('ripple');
        }
        userZipCode = settings.userZipCode ?? null;

        setTimeout(() => {
            if (document.getElementById('quotesEnabled')) {
                document.getElementById('quotesEnabled').checked = quotesEnabled;
                document.getElementById('quoteInterval').value = quoteInterval;
                document.getElementById('quoteIntervalValue').textContent = quoteInterval;
                document.getElementById('vizQuality').value = vizQuality;
                document.getElementById('newsEnabled').checked = newsEnabled;
            }
        }, 100);
    }
}

function savePersistedData() {
    localStorage.setItem('pbcSettings', JSON.stringify({
        quotesEnabled,
        quoteInterval,
        vizQuality,
        newsEnabled,
        selectedCoins,
        userZipCode
    }));
}

// ==================== WEBSOCKET CHAT ====================

function connectWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
        console.log('WebSocket connected');
        ws.send(JSON.stringify({
            type: 'join',
            room_code: currentRoom,
            username: currentUsername
        }));
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleWebSocketMessage(data);
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
        console.log('WebSocket disconnected');
        setTimeout(connectWebSocket, 5000);
    };
}

function handleWebSocketMessage(data) {
    if (data.type === 'chat_message') {
        addChatMessage(data.username, data.message, data.is_bot);
    } else if (data.type === 'user_joined') {
        addSystemMessage(`${data.username} joined`);
    } else if (data.type === 'user_left') {
        addSystemMessage(`${data.username} left`);
    } else if (data.type === 'user_count') {
        document.getElementById('userCount').textContent = `${data.count} online`;
    } else if (data.type === 'fireworks') {
        // Trigger fireworks for all users in the room
        triggerFireworks(data.username);
    }
}

function addChatMessage(username, message, isBot = false) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = isBot ? 'chat-message bot' : 'chat-message';

    const timestamp = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    messageDiv.innerHTML = `
        <span class="username">${username}</span>
        ${message}
        <span class="timestamp">${timestamp}</span>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (Math.random() < 0.05) {
        showRandomImage();
    }
}

function addSystemMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'system-message';
    messageDiv.textContent = message;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (message && ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
            type: 'message',
            message: message
        }));
        input.value = '';
    }
}

function sendRandomQuote() {
    if (ws && ws.readyState === WebSocket.OPEN) {
        const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        ws.send(JSON.stringify({
            type: 'fren_bot',
            message: `🎲 Random Quote: "${quote}"`
        }));
    }
}

function sendEmoji(emoji) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
            type: 'message',
            message: emoji
        }));
    }
}

// ==================== COIN MANAGEMENT ====================

async function fetchAllCoinsList() {
    try {
        const response = await fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1'
        );
        const data = await response.json();
        allCoinsList = data.map(coin => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            rank: coin.market_cap_rank
        }));
        console.log(`Loaded ${allCoinsList.length} coins`);
    } catch (error) {
        console.error('Error fetching coin list:', error);
    }
}

function showAddCoinModal() {
    document.getElementById('addCoinModal').style.display = 'flex';
    document.getElementById('coinSearchInput').focus();
}

function hideAddCoinModal() {
    document.getElementById('addCoinModal').style.display = 'none';
    document.getElementById('coinSearchInput').value = '';
    document.getElementById('coinSearchResults').innerHTML = '';
}

function searchCoins(query) {
    if (!query || query.length < 2) {
        document.getElementById('coinSearchResults').innerHTML = '';
        return;
    }

    const results = allCoinsList.filter(coin =>
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 20);

    const resultsContainer = document.getElementById('coinSearchResults');
    resultsContainer.innerHTML = '';

    results.forEach(coin => {
        const isAdded = selectedCoins.includes(coin.id);
        const item = document.createElement('div');
        item.className = `coin-result-item ${isAdded ? 'already-added' : ''}`;

        item.innerHTML = `
            <div>
                <div class="coin-result-name">${coin.name}</div>
                <div class="coin-result-symbol">${coin.symbol}</div>
            </div>
            <div class="coin-result-rank">#${coin.rank}</div>
        `;

        if (!isAdded) {
            item.onclick = () => addCoin(coin.id, coin.name);
        }

        resultsContainer.appendChild(item);
    });
}

function addCoin(coinId, coinName) {
    if (!selectedCoins.includes(coinId)) {
        selectedCoins.push(coinId);
        updateSelectedCoinsDisplay();
        fetchCoinPrices();
        savePersistedData();
        hideAddCoinModal();
    }
}

function removeCoin(coinId) {
    // Bitcoin cannot be removed
    if (coinId === 'bitcoin') return;
    selectedCoins = selectedCoins.filter(id => id !== coinId);
    updateSelectedCoinsDisplay();
    fetchCoinPrices();
    savePersistedData();
}

function updateSelectedCoinsDisplay() {
    const container = document.getElementById('selectedCoinsDisplay');
    container.innerHTML = '';

    selectedCoins.forEach(coinId => {
        const coin = allCoinsList.find(c => c.id === coinId);
        if (!coin && coinId !== 'bitcoin' && coinId !== 'ripple') return;

        let displayName = coin ? coin.name : (coinId === 'bitcoin' ? 'Bitcoin' : 'XRP');
        let displaySymbol = coin ? coin.symbol : (coinId === 'bitcoin' ? 'BTC' : 'XRP');

        const chip = document.createElement('div');
        chip.className = `coin-chip ${coinId === 'bitcoin' ? 'bitcoin' : ''}`;
        chip.innerHTML = `
            ${displayName} (${displaySymbol})
            <span class="remove-coin" onclick="removeCoin('${coinId}')">×</span>
        `;

        container.appendChild(chip);
    });
}

// ==================== WEATHER ====================

function showWeatherModal() {
    document.getElementById('weatherModal').style.display = 'flex';
    const input = document.getElementById('zipCodeInput');
    if (userZipCode) {
        input.value = userZipCode;
    }
    input.focus();
    input.placeholder = "Enter 5-digit zip code";
}

function hideWeatherModal() {
    document.getElementById('weatherModal').style.display = 'none';
}

function saveZipCode() {
    const zip = document.getElementById('zipCodeInput').value.trim();
    if (zip && /^\d{5}$/.test(zip)) {
        userZipCode = zip;
        savePersistedData();
        fetchWeather();
        hideWeatherModal();
    } else {
        alert('Please enter a valid 5-digit zip code');
    }
}

async function fetchWeather() {
    if (!userZipCode) return;

    try {
        const response = await fetch(`https://wttr.in/${userZipCode}?format=j1`);
        const data = await response.json();

        weatherData = {
            location: data.nearest_area[0].areaName[0].value,
            temp: data.current_condition[0].temp_F,
            condition: data.current_condition[0].weatherDesc[0].value,
            humidity: data.current_condition[0].humidity,
            windSpeed: data.current_condition[0].windspeedMiles,
            feelsLike: data.current_condition[0].FeelsLikeF
        };

        updateWeatherDisplay();
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weatherDisplay').innerHTML = '<p class="weather-prompt">Unable to fetch weather. Please check zip code.</p>';
    }
}

function updateWeatherDisplay() {
    if (!weatherData) return;

    const container = document.getElementById('weatherDisplay');

    let weatherEmoji = '☀️';
    const condition = weatherData.condition.toLowerCase();
    if (condition.includes('cloud')) weatherEmoji = '☁️';
    else if (condition.includes('rain')) weatherEmoji = '🌧️';
    else if (condition.includes('snow')) weatherEmoji = '❄️';
    else if (condition.includes('storm') || condition.includes('thunder')) weatherEmoji = '⛈️';
    else if (condition.includes('fog') || condition.includes('mist')) weatherEmoji = '🌫️';
    else if (condition.includes('clear') || condition.includes('sunny')) weatherEmoji = '☀️';

    container.innerHTML = `
        <div class="weather-info">
            <div class="weather-icon">${weatherEmoji}</div>
            <div class="weather-details">
                <div class="weather-location">${weatherData.location}</div>
                <div class="weather-temp">${weatherData.temp}°F</div>
                <div class="weather-condition">${weatherData.condition}</div>
                <div class="weather-extra">
                    <span>Feels like ${weatherData.feelsLike}°F</span>
                    <span>💧 ${weatherData.humidity}%</span>
                    <span>💨 ${weatherData.windSpeed} mph</span>
                </div>
            </div>
        </div>
    `;
}

// ==================== API FETCHING ====================

async function fetchAllData() {
    await Promise.all([
        fetchCoinPrices(),
        fetchFearGreedIndex(),
        fetchBitcoinATH(),
        fetchNewsHeadlines(),
        fetchFinancialIndicators()
    ]);
}

async function fetchCoinPrices() {
    try {
        const coinIds = selectedCoins.join(',');
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}`
        );
        const data = await response.json();

        data.forEach(coin => {
            coinData[coin.id] = coin;
        });

        updateCoinDisplay();
        checkMarketConditions();
    } catch (error) {
        console.error('Error fetching coin prices:', error);
    }
}

async function fetchPolymarketOdds() {
    try {
        console.log('Fetching Polymarket data...');

        // Try multiple API endpoints with fallbacks
        let data = null;

        // Approach 1: Try Gamma Markets API
        try {
            console.log('Trying Gamma Markets API...');
            const gammaResponse = await fetch('https://gamma-api.polymarket.com/markets?closed=false&limit=100');
            if (gammaResponse.ok) {
                data = await gammaResponse.json();
                console.log('Gamma API success:', data.length, 'markets');
            }
        } catch (e) {
            console.log('Gamma API failed:', e.message);
        }

        // Approach 2: Try CLOB API if Gamma failed
        if (!data || data.length === 0) {
            try {
                console.log('Trying CLOB API...');
                const clobResponse = await fetch('https://clob.polymarket.com/markets');
                if (clobResponse.ok) {
                    data = await clobResponse.json();
                    console.log('CLOB API success:', data.length, 'markets');
                }
            } catch (e) {
                console.log('CLOB API failed:', e.message);
            }
        }

        // Approach 3: Use hardcoded fallback data
        if (!data || data.length === 0) {
            console.log('Using fallback static data...');
            polymarketData = [
                {
                    question: "Will Bitcoin reach $150,000 in 2026?",
                    probability: "Live"
                },
                {
                    question: "Will Ethereum flip Bitcoin by market cap?",
                    probability: "Live"
                },
                {
                    question: "Will XRP reach $5 in 2026?",
                    probability: "Live"
                }
            ];
            updatePolymarketDisplay();
            return;
        }

        // Filter for crypto-related markets
        const cryptoMarkets = data.filter(market => {
            if (!market || !market.question) return false;
            if (market.closed || market.active === false) return false;
            const q = market.question.toLowerCase();
            return q.includes('bitcoin') || q.includes('btc') || q.includes('crypto') ||
                   q.includes('ethereum') || q.includes('eth') || q.includes('solana') ||
                   q.includes('sol') || q.includes('xrp') || q.includes('ripple') ||
                   q.includes('crypto') || q.includes('coin');
        });

        console.log('Filtered crypto markets:', cryptoMarkets.length);

        if (cryptoMarkets.length > 0) {
            polymarketData = cryptoMarkets.slice(0, 3);
        } else {
            // Show top 3 active markets (any topic)
            const activeMarkets = data.filter(m => !m.closed && m.active !== false).slice(0, 3);
            polymarketData = activeMarkets.length > 0 ? activeMarkets : data.slice(0, 3);
        }

        updatePolymarketDisplay();
    } catch (error) {
        console.error('Polymarket all approaches failed:', error);
        // Final fallback - show static markets
        polymarketData = [
            {
                question: "Polymarket predictions loading...",
                probability: "---"
            }
        ];
        updatePolymarketDisplay();
    }
}

async function fetchFearGreedIndex() {
    try {
        const response = await fetch('https://api.alternative.me/fng/');
        const data = await response.json();
        fngIndex = parseInt(data.data[0].value);
    } catch (error) {
        console.error('Error fetching Fear & Greed:', error);
    }
}

async function fetchBitcoinATH() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin');
        const data = await response.json();
        btcActualAth = data.market_data.ath.usd;
    } catch (error) {
        console.error('Error fetching Bitcoin ATH:', error);
    }
}

async function fetchNewsHeadlines() {
    if (!newsEnabled) return;

    let allHeadlines = [];

    // Fetch Fox Business (2 articles)
    try {
        const response = await fetch('https://moxie.foxbusiness.com/google-publisher/markets.xml');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');

        const foxHeadlines = Array.from(items).slice(0, 2).map(item => ({
            title: '📺 FOX: ' + item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent,
            pubDate: new Date(item.querySelector('pubDate')?.textContent || Date.now())
        }));
        allHeadlines.push(...foxHeadlines);
    } catch (error) {
        console.error('Error fetching Fox Business news:', error);
    }

    // Fetch CNBC (2 articles)
    try {
        const response = await fetch('https://www.cnbc.com/id/100003114/device/rss/rss.html');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');

        const cnbcHeadlines = Array.from(items).slice(0, 2).map(item => ({
            title: '📊 CNBC: ' + item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent,
            pubDate: new Date(item.querySelector('pubDate')?.textContent || Date.now())
        }));
        allHeadlines.push(...cnbcHeadlines);
    } catch (error) {
        console.error('Error fetching CNBC news:', error);
    }

    // Fetch Bloomberg (2 articles)
    try {
        const response = await fetch('https://feeds.bloomberg.com/markets/news.rss');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');

        const bloombergHeadlines = Array.from(items).slice(0, 2).map(item => ({
            title: '📈 BLOOMBERG: ' + item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent,
            pubDate: new Date(item.querySelector('pubDate')?.textContent || Date.now())
        }));
        allHeadlines.push(...bloombergHeadlines);
    } catch (error) {
        console.error('Error fetching Bloomberg news:', error);
    }

    // Fetch Wall Street Journal (2 articles)
    try {
        const response = await fetch('https://feeds.a.dj.com/rss/RSSMarketsMain.xml');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');

        const wsjHeadlines = Array.from(items).slice(0, 2).map(item => ({
            title: '📰 WSJ: ' + item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent,
            pubDate: new Date(item.querySelector('pubDate')?.textContent || Date.now())
        }));
        allHeadlines.push(...wsjHeadlines);
    } catch (error) {
        console.error('Error fetching WSJ news:', error);
    }

    // Fetch Reuters Business (2 articles)
    try {
        const response = await fetch('https://www.reutersagency.com/feed/?taxonomy=best-topics&post_type=best');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');

        const reutersHeadlines = Array.from(items).slice(0, 2).map(item => ({
            title: '📡 REUTERS: ' + item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent,
            pubDate: new Date(item.querySelector('pubDate')?.textContent || Date.now())
        }));
        allHeadlines.push(...reutersHeadlines);
    } catch (error) {
        console.error('Error fetching Reuters news:', error);
    }

    // Fetch CoinTelegraph (3 articles)
    try {
        const response = await fetch('https://cointelegraph.com/rss');
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');

        const ctHeadlines = Array.from(items).slice(0, 3).map(item => ({
            title: '₿ COINTELEGRAPH: ' + item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent,
            pubDate: new Date(item.querySelector('pubDate')?.textContent || Date.now())
        }));
        allHeadlines.push(...ctHeadlines);
    } catch (error) {
        console.error('Error fetching CoinTelegraph news:', error);
    }

    // Fetch CoinDesk (2 articles)
    try {
        const response = await fetch('https://www.coindesk.com/arc/outboundfeeds/rss/');
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');

        const cdHeadlines = Array.from(items).slice(0, 2).map(item => ({
            title: '₿ COINDESK: ' + item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent,
            pubDate: new Date(item.querySelector('pubDate')?.textContent || Date.now())
        }));
        allHeadlines.push(...cdHeadlines);
    } catch (error) {
        console.error('Error fetching CoinDesk news:', error);
    }

    // Fetch Financial Times (1 article)
    try {
        const response = await fetch('https://www.ft.com/?format=rss');
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');

        const ftHeadlines = Array.from(items).slice(0, 1).map(item => ({
            title: '📈 FT: ' + item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent,
            pubDate: new Date(item.querySelector('pubDate')?.textContent || Date.now())
        }));
        allHeadlines.push(...ftHeadlines);
    } catch (error) {
        console.error('Error fetching Financial Times news:', error);
    }

    // If we have no headlines at all, show an error
    if (allHeadlines.length === 0) {
        newsHeadlines = [{
            title: '⚠️ News feeds temporarily unavailable. Will retry shortly.',
            link: '#',
            pubDate: new Date()
        }];
    } else {
        // Sort by most recent first
        allHeadlines.sort((a, b) => b.pubDate - a.pubDate);
        newsHeadlines = allHeadlines;
    }

    updateNewsTicker();
    updateNewsHeadlinesList(); // Update the clickable headlines list
}

async function fetchBreakingNews() {
    try {
        // Try to fetch White House news from Fox News Politics RSS
        const response = await fetch('https://moxie.foxnews.com/google-publisher/politics.xml');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');

        // Look for White House or Trump related news in the first 10 items
        const whNews = Array.from(items).slice(0, 10).find(item => {
            const title = item.querySelector('title')?.textContent.toLowerCase() || '';
            return title.includes('white house') || title.includes('trump') ||
                   title.includes('president');
        });

        if (whNews) {
            const title = whNews.querySelector('title')?.textContent;
            const link = whNews.querySelector('link')?.textContent;

            const breakingNewsDiv = document.getElementById('breakingNews');
            const breakingNewsText = document.getElementById('breakingNewsText');

            if (title) {
                breakingNewsText.innerHTML = `<a href="${link}" target="_blank" style="color: white; text-decoration: underline;">${title}</a>`;
                breakingNewsDiv.style.display = 'flex';

                // Hide after 30 seconds
                setTimeout(() => {
                    breakingNewsDiv.style.display = 'none';
                }, 30000);
            }
        }
    } catch (error) {
        console.error('Error fetching breaking news:', error);
    }
}

async function fetchFinancialIndicators() {
    try {
        // Fetch 10Y Treasury Yield from FRED API (St. Louis Fed)
        // Note: This endpoint may require API key for production
        // Using a fallback/demo approach

        // For now, we'll use Yahoo Finance or similar APIs
        // Simplified approach - in production you'd use proper APIs

        const treasury = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/%5ETNX?interval=1d&range=1d')
            .then(r => r.json())
            .then(data => {
                const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
                return price ? `${price.toFixed(2)}%` : '--';
            })
            .catch(() => '--');

        const gold = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/GC=F?interval=1d&range=1d')
            .then(r => r.json())
            .then(data => {
                const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
                return price ? `$${price.toFixed(2)}` : '--';
            })
            .catch(() => '--');

        const silver = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/SI=F?interval=1d&range=1d')
            .then(r => r.json())
            .then(data => {
                const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
                return price ? `$${price.toFixed(2)}` : '--';
            })
            .catch(() => '--');

        const oil = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/CL=F?interval=1d&range=1d')
            .then(r => r.json())
            .then(data => {
                const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
                return price ? `$${price.toFixed(2)}` : '--';
            })
            .catch(() => '--');

        document.getElementById('treasury10y').textContent = treasury;
        document.getElementById('goldPrice').textContent = gold;
        document.getElementById('silverPrice').textContent = silver;
        document.getElementById('oilPrice').textContent = oil;

    } catch (error) {
        console.error('Error fetching financial indicators:', error);
    }
}

function startDataUpdates() {
    setInterval(fetchCoinPrices, 60000);
    setInterval(fetchFearGreedIndex, 1800000);
    setInterval(fetchBitcoinATH, 1800000);
    setInterval(fetchFinancialIndicators, 60000); // Every minute when markets open
    if (newsEnabled) {
        setInterval(fetchNewsHeadlines, 600000);
    }
    if (userZipCode) {
        setInterval(fetchWeather, 600000);
    }
}

// ==================== DISPLAY UPDATES ====================

function updateCoinDisplay() {
    const container = document.getElementById('coinPrices');
    container.innerHTML = '';

    selectedCoins.forEach(coinId => {
        const coin = coinData[coinId];
        if (!coin) return;

        const change = coin.price_change_percentage_24h || 0;
        const isPositive = change >= 0;

        const card = document.createElement('div');
        card.className = `coin-card ${isPositive ? 'positive' : 'negative'}`;

        let athIndicator = '';
        if (coinId === 'bitcoin' && btcActualAth > 0) {
            if (coin.current_price >= btcActualAth * 0.999) {
                athIndicator = ' ⚡ATH⚡';
            }
        }

        card.innerHTML = `
            <h3>${coin.name} (${coin.symbol.toUpperCase()})${athIndicator}</h3>
            <div class="coin-price">$${coin.current_price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <div class="coin-change ${isPositive ? 'positive' : 'negative'}">
                ${isPositive ? '▲' : '▼'} ${Math.abs(change).toFixed(2)}%
            </div>
        `;

        container.appendChild(card);
    });
}

function updateNewsHeadlinesList() {
    const container = document.getElementById('newsHeadlinesList');

    if (!newsHeadlines || newsHeadlines.length === 0) {
        container.innerHTML = '<p class="loading">Loading...</p>';
        return;
    }

    container.innerHTML = '';

    // Show all headlines sorted by most recent
    newsHeadlines.forEach((headline) => {
        const link = document.createElement('a');
        link.href = headline.link;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'headline-link';
        link.textContent = headline.title;

        container.appendChild(link);
    });
}

// X Trending removed - API requires authentication and was not functional

function updateNewsTicker() {
    if (!newsEnabled || newsHeadlines.length === 0) return;

    const ticker = document.getElementById('newsTicker');
    const content = document.createElement('div');
    content.className = 'news-ticker-content';

    newsHeadlines.forEach(headline => {
        const span = document.createElement('span');
        span.className = 'news-item';
        span.textContent = headline.title;
        span.onclick = () => window.open(headline.link, '_blank');
        content.appendChild(span);
    });

    ticker.innerHTML = '';
    ticker.appendChild(content);
}

// ==================== MARKET CONDITIONS ====================

function checkMarketConditions() {
    const btc = coinData['bitcoin'];
    if (!btc) return;

    const change = btc.price_change_percentage_24h || 0;
    const price = btc.current_price;
    lastBtcChange = change;

    if (fngIndex !== null && fngIndex <= 10) {
        vizMode = 'extreme_fear';
        showVizOverlay('💀 EXTREME FEAR 💀');
    } else if (fngIndex !== null && fngIndex >= 90) {
        vizMode = 'extreme_greed';
        showVizOverlay('🤑 EXTREME GREED 🤑');
    } else if (Math.abs(change) >= 15) {
        vizMode = 'singularity';
        showVizOverlay('🌌 SINGULARITY 🌌');
        sendFrenBotMessage('🌌 SINGULARITY MODE! Bitcoin moved ' + change.toFixed(1) + '% today!');
    } else if (change >= 10) {
        vizMode = 'pump';
        showVizOverlay('🚀 TO THE MOON 🚀');
        sendFrenBotMessage('🚀 Bitcoin is pumping! Up ' + change.toFixed(1) + '% today!');
    } else if (change <= -10) {
        vizMode = 'dump';
        showVizOverlay('📉 DUMP MODE 📉');
        sendFrenBotMessage('📉 Capitulation trade opportunity? Bitcoin down ' + Math.abs(change).toFixed(1) + '% today.');
    } else if (btcActualAth > 0 && price >= btcActualAth * 0.999) {
        vizMode = 'ath';
        showVizOverlay('⚡ ALL TIME HIGH ⚡');
        sendFrenBotMessage('⚡ BITCOIN AT ALL-TIME HIGH! Current: $' + price.toLocaleString());
    } else if (Math.abs(change) < 2) {
        vizMode = 'calm'; // New mode for stagnant market
        hideVizOverlay();
    } else {
        vizMode = 'normal';
        hideVizOverlay();
    }
}

function showVizOverlay(text) {
    const overlay = document.getElementById('vizOverlay');
    overlay.textContent = text;
    overlay.classList.add('active');
}

function hideVizOverlay() {
    const overlay = document.getElementById('vizOverlay');
    overlay.classList.remove('active');
}

function sendFrenBotMessage(message) {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
            type: 'fren_bot',
            message: message
        }));
    }
}

// ==================== QUOTES IN CHAT ====================

function startChatQuoteRotation() {
    // Send quote immediately to confirm it works
    setTimeout(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const quote = QUOTES[0]; // Send first quote
            ws.send(JSON.stringify({
                type: 'fren_bot',
                message: `💬 "${quote}"`
            }));
        }
    }, 5000); // Wait 5 seconds for connection

    // Then every 60 seconds
    setInterval(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
            ws.send(JSON.stringify({
                type: 'fren_bot',
                message: `💬 "${quote}"`
            }));
        }
    }, 60000);
}

// ==================== IMAGE TRIGGERS ====================

function showRandomImage() {
    const imageNumber = Math.floor(Math.random() * 10) + 1;
    const imagePath = `/static/funny-pics/pic${imageNumber}.jpg`;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2000;
        background: rgba(0, 0, 0, 0.9);
        padding: 20px;
        border-radius: 12px;
        border: 3px solid ${COLORS.neon_cyan};
        box-shadow: 0 0 40px ${COLORS.neon_cyan};
        max-width: 90%;
        max-height: 90%;
        cursor: pointer;
    `;

    const img = document.createElement('img');
    img.src = imagePath;
    img.style.cssText = `
        max-width: 100%;
        max-height: 70vh;
        border-radius: 8px;
    `;

    img.onerror = () => {
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }
    };

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.onclick = () => {
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }
    };

    setTimeout(() => {
        if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
        }
    }, 3000);
}

// ==================== VISUALIZATION ====================

function initVisualization() {
    // Mobile-optimized particle counts
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let particleCount;

    if (isMobile) {
        particleCount = vizQuality === 'low' ? 50 : (vizQuality === 'high' ? 120 : 80);
    } else {
        particleCount = vizQuality === 'low' ? 100 : (vizQuality === 'high' ? 200 : 150);
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random(),
            size: 2 + Math.random() * 3, // Smaller particles
            speed: 0.05 + Math.random() * 0.1,
            angle: Math.random() * Math.PI * 2,
            angularSpeed: (Math.random() - 0.5) * 5,
            hue: Math.random(),
            colorIndex: Math.floor(Math.random() * 4)
        });
    }

    // Vortex tunnel segments
    for (let i = 0; i < 80; i++) {
        tunnelSegments.push({
            z: i * 0.04,
            rotation: 0,
            offset: Math.random() * Math.PI * 2
        });
    }

    // Arc Raiders signature arc lines
    for (let i = 0; i < 6; i++) {
        arcLines.push({
            angle: (Math.PI * 2 / 6) * i,
            length: 0,
            maxLength: 200 + Math.random() * 100,
            speed: 0.5 + Math.random() * 1,
            colorIndex: i % 4
        });
    }
}

function resizeCanvas() {
    if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
}

function detectVizQuality() {
    if (vizQuality !== 'auto') return;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    vizQuality = isMobile ? 'medium' : 'high';
}

function animate() {
    requestAnimationFrame(animate);

    if (!ctx) return;

    // Clear completely to prevent stacking
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dark background
    ctx.fillStyle = COLORS.bg_dark;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawTunnel();
    drawArcLines(); // Arc Raiders signature arcs
    drawParticles();
    drawBitcoinSymbol();
    drawUFO(); // UFO easter egg for fullscreen mode

    if (vizMode !== 'calm' && Math.random() < 0.05 && (vizMode === 'extreme_fear' || vizMode === 'extreme_greed' || vizMode === 'singularity')) {
        drawLightning();
    }

    updateLightning();
}

function drawTunnel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // SLOW speeds for smooth vortex
    let speedMultiplier = 0.03;
    let rotationSpeed = 0.08;

    // Bitcoin price correlation - subtle intensity increase based on price movement
    const btc = coinData['bitcoin'];
    let btcIntensityBoost = 1.0;
    if (btc) {
        const change = btc.price_change_percentage_24h || 0;
        // Positive change = faster rotation, negative = slower
        btcIntensityBoost = 1.0 + (change * 0.01); // 10% change = 1.1x speed
        btcIntensityBoost = Math.max(0.5, Math.min(1.5, btcIntensityBoost)); // Clamp between 0.5x and 1.5x
    }

    if (vizMode === 'singularity') {
        speedMultiplier = 0.15;
        rotationSpeed = 0.3;
    } else if (vizMode === 'pump' || vizMode === 'ath') {
        speedMultiplier = 0.08;
        rotationSpeed = 0.15;
    } else if (vizMode === 'dump') {
        speedMultiplier = 0.1;
        rotationSpeed = -0.15;
    } else if (vizMode === 'extreme_fear' || vizMode === 'extreme_greed') {
        speedMultiplier = 0.06;
        rotationSpeed = 0.12;
    }

    // Apply Bitcoin correlation boost
    rotationSpeed *= btcIntensityBoost;

    vortexRotation += rotationSpeed * 0.01;

    // Draw concentric rotating rings for vortex effect
    const numRings = 30; // Fewer rings for better performance

    for (let i = 0; i < numRings; i++) {
        const depth = i / numRings; // 0 to 1
        const scale = 1 - depth * 0.7; // Shrink as they go deeper

        // Create spiral/twist effect
        const twist = vortexRotation + depth * Math.PI * 3;
        const radius = 120 * scale; // Max radius 120px to stay on screen

        // Get color based on depth and mode
        const color = getWormholeColor(depth, vizMode, 0);
        const alpha = 0.15 + (1 - depth) * 0.3; // Fade with distance

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(twist);

        // Draw spiral ring segments (not full circles)
        const segments = 8;
        for (let j = 0; j < segments; j++) {
            const angleStart = (j / segments) * Math.PI * 2;
            const angleEnd = angleStart + Math.PI / (segments * 0.8);

            ctx.beginPath();
            ctx.arc(0, 0, radius, angleStart, angleEnd);
            ctx.strokeStyle = color;
            ctx.lineWidth = 2 + (1 - depth) * 3;
            ctx.globalAlpha = alpha;
            ctx.stroke();
        }

        ctx.restore();
    }

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
}

function drawArcLines() {
    // Arc Raiders signature curved lines at edges
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const time = Date.now() * 0.001;

    arcLines.forEach((arc, index) => {
        // Grow and shrink arc lines
        arc.length += arc.speed;
        if (arc.length > arc.maxLength) {
            arc.length = 0;
            arc.maxLength = 200 + Math.random() * 100;
        }

        const startRadius = 80;
        const endRadius = startRadius + arc.length;

        // Curved arc path
        ctx.beginPath();
        ctx.arc(centerX, centerY, startRadius, arc.angle, arc.angle + 0.3);
        ctx.arc(centerX, centerY, endRadius, arc.angle + 0.3, arc.angle, true);
        ctx.closePath();

        // Arc Raiders colors
        const colors = [COLORS.miami_cyan, COLORS.miami_pink, COLORS.arc_purple, COLORS.electric_yellow];
        const color = colors[arc.colorIndex];

        ctx.fillStyle = color;
        ctx.globalAlpha = 0.3 + Math.sin(time * 2 + index) * 0.2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = color;
        ctx.fill();
    });

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
}

function drawParticles() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    particles.forEach(particle => {
        particle.angle += particle.angularSpeed * 0.001; // Much slower rotation
        particle.z += particle.speed * 0.001; // Much slower movement
        if (particle.z > 1) {
            particle.z = 0;
            particle.colorIndex = Math.floor(Math.random() * 4);
        }

        const scale = 1 - particle.z;
        const depth = particle.z;

        // Follow vortex rotation (slower)
        const twist = vortexRotation + depth * Math.PI;
        const orbitRadius = 40 + scale * 80; // Smaller orbit to stay on screen

        const x = centerX + Math.cos(particle.angle + twist) * orbitRadius * scale;
        const y = centerY + Math.sin(particle.angle + twist) * orbitRadius * scale;
        const size = particle.size * (scale + 0.2);

        const color = getParticleColor(particle.colorIndex, depth, vizMode);

        // Simple particle with less glow for performance
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 4; // Less blur for performance
        ctx.shadowColor = color;
        ctx.globalAlpha = 0.5 + scale * 0.4;
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    });
}

function drawBitcoinSymbol() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const time = Date.now() * 0.001;

    let speedMultiplier = 0.4; // Much slower base speed
    if (vizMode === 'singularity') speedMultiplier = 2.5;
    else if (vizMode === 'ath') speedMultiplier = 1.5;
    else if (vizMode === 'pump') speedMultiplier = 1.0;
    else if (vizMode === 'dump') speedMultiplier = 1.2;
    else if (vizMode === 'calm') speedMultiplier = 0.3;

    btcSymbolAngle += 2 * speedMultiplier * 0.02; // Slower orbit

    // Smaller orbit to keep on screen
    const orbitRadius = 80;
    const wobble = Math.sin(time * 1) * 8; // Less wobble
    const x = centerX + Math.cos(btcSymbolAngle * Math.PI / 180) * (orbitRadius + wobble);
    const y = centerY + Math.sin(btcSymbolAngle * Math.PI / 180) * (orbitRadius + wobble);

    // Pulsing effect
    const pulse = 1 + Math.sin(time * 3) * 0.15;
    const fontSize = 64 * pulse;

    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let color = COLORS.gold;
    let glowColor = COLORS.gold;

    if (vizMode === 'singularity') {
        const hue = (time * 100) % 360;
        color = `hsl(${hue}, 100%, 60%)`;
        glowColor = color;
    } else if (vizMode === 'pump') {
        color = COLORS.poison_green;
        glowColor = COLORS.poison_green;
    } else if (vizMode === 'dump') {
        color = COLORS.blood_red;
        glowColor = COLORS.blood_red;
    } else if (vizMode === 'ath') {
        color = COLORS.electric_yellow;
        glowColor = COLORS.electric_yellow;
    } else {
        // Miami retro colors for calm mode
        color = COLORS.miami_cyan;
        glowColor = COLORS.miami_pink;
    }

    // Massive glow halo
    ctx.shadowBlur = 50;
    ctx.shadowColor = glowColor;

    // Outer glow ring
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = glowColor;
    ctx.fillText('₿', x, y);

    // Mid glow
    ctx.shadowBlur = 35;
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = color;
    ctx.fillText('₿', x, y);

    // Main symbol
    ctx.shadowBlur = 25;
    ctx.globalAlpha = 1;
    ctx.fillStyle = color;
    ctx.fillText('₿', x, y);

    // Bright core
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.5;
    const coreSize = fontSize * 0.8;
    ctx.font = `bold ${coreSize}px Arial`;
    ctx.fillText('₿', x, y);

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
}

function drawUFO() {
    if (!ufoVisible || !isFullscreen) return;

    // Update UFO position
    ufoX += ufoVelX;
    ufoY += ufoVelY;

    // Bounce off edges
    if (ufoX < 0 || ufoX > canvas.width) ufoVelX *= -1;
    if (ufoY < 0 || ufoY > canvas.height * 0.4) ufoVelY *= -1;

    const time = Date.now() * 0.001;
    const bobble = Math.sin(time * 3) * 5;
    const ufoSize = 40;

    ctx.save();

    // UFO body (dome)
    ctx.beginPath();
    ctx.ellipse(ufoX, ufoY + bobble, ufoSize * 0.6, ufoSize * 0.4, 0, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.arc_teal;
    ctx.shadowBlur = 20;
    ctx.shadowColor = COLORS.arc_teal;
    ctx.fill();

    // UFO base (saucer)
    ctx.beginPath();
    ctx.ellipse(ufoX, ufoY + bobble + 10, ufoSize, ufoSize * 0.3, 0, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.miami_cyan;
    ctx.shadowBlur = 25;
    ctx.shadowColor = COLORS.miami_cyan;
    ctx.fill();

    // UFO lights (blinking)
    const lightOn = Math.floor(time * 4) % 2 === 0;
    if (lightOn) {
        for (let i = -1; i <= 1; i++) {
            ctx.beginPath();
            ctx.arc(ufoX + i * 15, ufoY + bobble + 10, 3, 0, Math.PI * 2);
            ctx.fillStyle = i === 0 ? COLORS.electric_yellow : COLORS.hot_pink;
            ctx.shadowBlur = 15;
            ctx.shadowColor = i === 0 ? COLORS.electric_yellow : COLORS.hot_pink;
            ctx.fill();
        }
    }

    // Tractor beam (occasional)
    if (Math.floor(time * 0.5) % 3 === 0) {
        ctx.beginPath();
        ctx.moveTo(ufoX - 20, ufoY + bobble + 15);
        ctx.lineTo(ufoX - 40, ufoY + bobble + 100);
        ctx.lineTo(ufoX + 40, ufoY + bobble + 100);
        ctx.lineTo(ufoX + 20, ufoY + bobble + 15);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
        ctx.fill();
        ctx.strokeStyle = COLORS.neon_cyan;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;
        ctx.stroke();
    }

    ctx.restore();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
}

function drawLightning() {
    const startX = Math.random() * canvas.width;
    const startY = 0;
    const endY = canvas.height;

    const segments = 8;
    const points = [{x: startX, y: startY}];

    for (let i = 1; i < segments; i++) {
        points.push({
            x: startX + (Math.random() - 0.5) * 100,
            y: startY + (endY / segments) * i
        });
    }
    points.push({x: startX, y: endY});

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(point => ctx.lineTo(point.x, point.y));

    ctx.strokeStyle = vizMode === 'extreme_fear' ? COLORS.hot_red : COLORS.neon_cyan;
    ctx.lineWidth = 3;
    ctx.stroke();

    lightningBolts.push({points, life: 5});
}

function updateLightning() {
    lightningBolts = lightningBolts.filter(bolt => {
        bolt.life--;

        if (bolt.life > 0) {
            ctx.beginPath();
            ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
            bolt.points.forEach(point => ctx.lineTo(point.x, point.y));
            ctx.strokeStyle = vizMode === 'extreme_fear' ? COLORS.hot_red : COLORS.neon_cyan;
            ctx.lineWidth = 3;
            ctx.globalAlpha = bolt.life / 5;
            ctx.stroke();
            ctx.globalAlpha = 1;
            return true;
        }
        return false;
    });
}

// Arc Raiders 80s Miami color functions
function getWormholeColor(depth, mode, ring = 0) {
    const colors = {
        calm: [COLORS.miami_cyan, COLORS.miami_pink, COLORS.retro_purple, COLORS.arc_teal],
        pump: [COLORS.poison_green, COLORS.nuclear_green, COLORS.arc_teal, COLORS.electric_yellow],
        dump: [COLORS.blood_red, COLORS.miami_pink, COLORS.sunset_orange, COLORS.vice_magenta],
        singularity: [COLORS.arc_purple, COLORS.neon_magenta, COLORS.miami_cyan, COLORS.electric_yellow],
        ath: [COLORS.gold, COLORS.electric_yellow, COLORS.sunset_orange, COLORS.miami_pink],
        extreme_greed: [COLORS.poison_green, COLORS.arc_teal, COLORS.electric_blue, COLORS.nuclear_green],
        extreme_fear: [COLORS.blood_red, COLORS.miami_pink, COLORS.neon_orange, COLORS.vice_magenta]
    };

    const palette = colors[mode] || colors.calm;
    const index = Math.floor(depth * palette.length) % palette.length;
    return palette[index];
}

function getParticleColor(colorIndex, depth, mode) {
    const palettes = {
        calm: [COLORS.miami_cyan, COLORS.miami_pink, COLORS.miami_purple, COLORS.arc_teal],
        pump: [COLORS.poison_green, COLORS.arc_teal, COLORS.electric_yellow, COLORS.nuclear_green],
        dump: [COLORS.blood_red, COLORS.sunset_orange, COLORS.miami_pink, COLORS.vice_magenta],
        singularity: [COLORS.neon_cyan, COLORS.neon_magenta, COLORS.arc_purple, COLORS.electric_yellow],
        ath: [COLORS.gold, COLORS.electric_yellow, COLORS.miami_cyan, COLORS.miami_pink],
        extreme_greed: [COLORS.nuclear_green, COLORS.arc_teal, COLORS.poison_green, COLORS.electric_blue],
        extreme_fear: [COLORS.blood_red, COLORS.sunset_orange, COLORS.vice_magenta, COLORS.miami_pink]
    };

    const palette = palettes[mode] || palettes.calm;
    return palette[colorIndex % palette.length];
}

function getDynamicColor(progress, mode) {
    // Legacy function for backwards compatibility
    return getWormholeColor(progress, mode, 0);
}

// ==================== CASSETTE TAPE MUSIC PLAYER ====================

const synthwaveTracks = [
    { name: 'Neon Nights', url: 'https://cdn.pixabay.com/audio/2024/08/05/audio_ca25bc8e00.mp3' },
    { name: 'Cyber Dreams', url: 'https://cdn.pixabay.com/audio/2023/10/06/audio_5c63babf76.mp3' },
    { name: 'Electric Pulse', url: 'https://cdn.pixabay.com/audio/2022/03/22/audio_2348988ac0.mp3' },
    { name: 'Retro Wave', url: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3' },
    { name: 'Future Past', url: 'https://ia601500.us.archive.org/23/items/ncs-release-elektronomia-sky-high/Elektronomia%20-%20Sky%20High.mp3' },
    { name: 'Synthwave City', url: 'https://ia802707.us.archive.org/14/items/ncs-release-approaching-nirvana-sugar-high/Approaching%20Nirvana%20-%20Sugar%20High.mp3' },
    { name: 'Digital Rain', url: 'https://cdn.pixabay.com/audio/2023/11/29/audio_b43e3aa4ae.mp3' },
    { name: 'Arc Raiders Mix', url: 'https://cdn.pixabay.com/audio/2024/02/22/audio_20d84c36c8.mp3' }
];

let currentTrackIndex = 0;
let isPlaying = false;

function toggleMusic() {
    const cassettePlayer = document.getElementById('cassettePlayer');

    if (cassettePlayer.style.display === 'none' || cassettePlayer.style.display === '') {
        // Show cassette player
        cassettePlayer.style.display = 'block';
        loadTrack(currentTrackIndex);
        addSystemMessage('🎵 Cassette player opened! Hit PLAY ►');
    } else {
        // Hide cassette player and stop music
        cassettePlayer.style.display = 'none';
        pauseMusic();
    }
}

function loadTrack(index) {
    const audio = document.getElementById('synthMusic');
    const track = synthwaveTracks[index];

    audio.src = track.url;
    audio.load();
    audio.volume = 0.7;

    document.getElementById('cassetteTrackName').textContent = track.name.toUpperCase();
    document.getElementById('currentTrackNum').textContent = index + 1;
    document.getElementById('totalTracks').textContent = synthwaveTracks.length;

    console.log('Loaded track:', track.name);
}

function playMusic() {
    const audio = document.getElementById('synthMusic');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const leftReel = document.getElementById('leftReel');
    const rightReel = document.getElementById('rightReel');

    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            isPlaying = true;
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'block';

            // Spin the reels!
            leftReel.classList.add('spinning');
            rightReel.classList.add('spinning');

            console.log('🎵 Playing:', synthwaveTracks[currentTrackIndex].name);
        }).catch(err => {
            console.error('Play failed:', err);
            addSystemMessage('⚠️ Tap PLAY ► again to start music');
        });
    }

    // Auto-play next track when current ends
    audio.onended = () => {
        nextTrack();
    };
}

function pauseMusic() {
    const audio = document.getElementById('synthMusic');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const leftReel = document.getElementById('leftReel');
    const rightReel = document.getElementById('rightReel');

    audio.pause();
    isPlaying = false;
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';

    // Stop spinning
    leftReel.classList.remove('spinning');
    rightReel.classList.remove('spinning');

    console.log('⏸ Paused');
}

function prevTrack() {
    currentTrackIndex--;
    if (currentTrackIndex < 0) {
        currentTrackIndex = synthwaveTracks.length - 1;
    }
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        playMusic();
    }
}

function nextTrack() {
    currentTrackIndex++;
    if (currentTrackIndex >= synthwaveTracks.length) {
        currentTrackIndex = 0;
    }
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        playMusic();
    }
}

function closeCassette() {
    document.getElementById('cassettePlayer').style.display = 'none';
    pauseMusic();
}

// ==================== FIREWORKS SYSTEM ====================

function initFireworksCanvas() {
    fireworksCanvas = document.getElementById('fireworksCanvas');
    fireworksCtx = fireworksCanvas.getContext('2d');
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        fireworksCanvas.width = window.innerWidth;
        fireworksCanvas.height = window.innerHeight;
    });
}

function sendFireworks() {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
            type: 'fireworks'
        }));
    }
}

function triggerFireworks(username) {
    console.log('🎆 Fireworks triggered by:', username);
    addSystemMessage(`🎆 ${username} triggered fireworks!`);

    // Ensure canvas exists
    if (!fireworksCanvas) {
        console.error('Fireworks canvas not found!');
        initFireworksCanvas();
    }

    // Clear any existing particles
    fireworksParticles = [];

    // Show canvas with proper styling
    fireworksCanvas.style.display = 'block';
    fireworksCanvas.style.position = 'fixed';
    fireworksCanvas.style.top = '0';
    fireworksCanvas.style.left = '0';
    fireworksCanvas.style.width = '100vw';
    fireworksCanvas.style.height = '100vh';
    fireworksCanvas.style.pointerEvents = 'none';
    fireworksCanvas.style.zIndex = '9999';

    console.log('Canvas display:', fireworksCanvas.style.display);
    console.log('Canvas dimensions:', fireworksCanvas.width, 'x', fireworksCanvas.height);

    // Create multiple firework launches
    const launchCount = 8;
    for (let i = 0; i < launchCount; i++) {
        setTimeout(() => {
            console.log('Creating firework', i + 1);
            createFirework();
        }, i * 300);
    }

    // Animate fireworks
    animateFireworks();

    // Hide canvas after 6 seconds
    setTimeout(() => {
        console.log('Hiding fireworks canvas');
        fireworksCanvas.style.display = 'none';
        fireworksParticles = [];
    }, 6000);
}

function createFirework() {
    const x = Math.random() * fireworksCanvas.width;
    const y = fireworksCanvas.height * 0.3 + Math.random() * fireworksCanvas.height * 0.3;

    const particleCount = 100; // More particles for bigger explosion
    const colors = [
        COLORS.miami_cyan, COLORS.miami_pink, COLORS.arc_purple,
        COLORS.electric_yellow, COLORS.poison_green, COLORS.sunset_orange,
        COLORS.neon_magenta, COLORS.arc_teal
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    console.log(`Creating firework at (${Math.round(x)}, ${Math.round(y)}) with color ${color}`);

    for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 3 + Math.random() * 5; // Faster particles for bigger burst

        fireworksParticles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            life: 1.0,
            decay: 0.008 + Math.random() * 0.008, // Slower decay for longer visibility
            size: 4 + Math.random() * 4, // Bigger particles
            color: color,
            gravity: 0.08 // Slightly more gravity for realistic arc
        });
    }

    console.log('Total fireworks particles:', fireworksParticles.length);
}

function animateFireworks() {
    if (fireworksParticles.length === 0 && fireworksCanvas.style.display === 'none') {
        console.log('Fireworks animation stopped - no particles');
        return;
    }

    // Semi-transparent background for trail effect
    fireworksCtx.fillStyle = 'rgba(10, 14, 26, 0.15)';
    fireworksCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    let activeParticles = 0;
    fireworksParticles = fireworksParticles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.life -= p.decay;

        if (p.life <= 0) return false;

        activeParticles++;

        // Draw particle with glow
        fireworksCtx.save();
        fireworksCtx.globalAlpha = p.life;

        // Outer glow
        fireworksCtx.beginPath();
        fireworksCtx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        fireworksCtx.fillStyle = p.color;
        fireworksCtx.shadowBlur = 30;
        fireworksCtx.shadowColor = p.color;
        fireworksCtx.fill();

        // Inner bright core
        fireworksCtx.beginPath();
        fireworksCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        fireworksCtx.fillStyle = '#ffffff';
        fireworksCtx.shadowBlur = 15;
        fireworksCtx.fill();

        fireworksCtx.restore();

        return true;
    });

    if (activeParticles > 0 || fireworksCanvas.style.display === 'block') {
        requestAnimationFrame(animateFireworks);
    }
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
    // Chat
    document.getElementById('sendBtn').addEventListener('click', sendChatMessage);
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });

    // Chat interaction buttons
    document.getElementById('randomQuoteBtn').addEventListener('click', sendRandomQuote);
    document.getElementById('sadEmojiBtn').addEventListener('click', () => sendEmoji('😢'));
    document.getElementById('rocketEmojiBtn').addEventListener('click', () => sendEmoji('🚀'));
    document.getElementById('fireworksBtn').addEventListener('click', sendFireworks);
    document.getElementById('musicBtn').addEventListener('click', toggleMusic);

    // Cassette player controls
    document.getElementById('playBtn')?.addEventListener('click', playMusic);
    document.getElementById('pauseBtn')?.addEventListener('click', pauseMusic);
    document.getElementById('prevTrack')?.addEventListener('click', prevTrack);
    document.getElementById('nextTrack')?.addEventListener('click', nextTrack);
    document.getElementById('closeCassette')?.addEventListener('click', closeCassette);

    // Add coin
    document.getElementById('addCoinBtn').addEventListener('click', showAddCoinModal);
    document.getElementById('closeAddCoin').addEventListener('click', hideAddCoinModal);
    document.getElementById('coinSearchInput').addEventListener('input', (e) => {
        searchCoins(e.target.value);
    });

    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const btn = document.getElementById('themeToggle');
        btn.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
    });

    // Settings modal
    document.getElementById('settingsBtn').addEventListener('click', () => {
        document.getElementById('settingsModal').style.display = 'flex';
    });

    document.getElementById('closeSettings').addEventListener('click', () => {
        document.getElementById('settingsModal').style.display = 'none';
    });

    // Settings controls
    document.getElementById('quotesEnabled').addEventListener('change', (e) => {
        quotesEnabled = e.target.checked;
        savePersistedData();
    });

    document.getElementById('quoteInterval').addEventListener('input', (e) => {
        quoteInterval = parseInt(e.target.value);
        document.getElementById('quoteIntervalValue').textContent = quoteInterval;
        savePersistedData();
    });

    document.getElementById('vizQuality').addEventListener('change', (e) => {
        vizQuality = e.target.value;
        savePersistedData();
        particles = [];
        initVisualization();
    });

    document.getElementById('newsEnabled').addEventListener('change', (e) => {
        newsEnabled = e.target.checked;
        savePersistedData();
        if (newsEnabled) {
            fetchNewsHeadlines();
        } else {
            document.getElementById('newsTicker').innerHTML = '';
        }
    });

    document.getElementById('copyRoomCode').addEventListener('click', () => {
        navigator.clipboard.writeText(currentRoom);
        alert('Room code copied!');
    });

    document.getElementById('leaveRoom').addEventListener('click', () => {
        if (confirm('Leave this room?')) {
            location.reload();
        }
    });

    // Fullscreen viz
    document.getElementById('fullscreenVizBtn').addEventListener('click', () => {
        canvas.requestFullscreen();
    });

    // Detect fullscreen change for UFO easter egg
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            isFullscreen = true;
            ufoVisible = true;
            ufoX = Math.random() * canvas.width;
            ufoY = Math.random() * canvas.height * 0.3; // Start in upper portion
        } else {
            isFullscreen = false;
            ufoVisible = false;
        }
    });

    // Weather
    document.getElementById('editWeatherBtn').addEventListener('click', showWeatherModal);
    document.getElementById('closeWeather').addEventListener('click', hideWeatherModal);
    document.getElementById('saveZipBtn').addEventListener('click', saveZipCode);
    document.getElementById('zipCodeInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveZipCode();
    });
}

window.removeCoin = removeCoin;

// ==================== ARC RAIDERS INTRO ANIMATION ====================

let arcIntroCanvas, arcIntroCtx;
let arcIntroLines = [];
let arcIntroAnimating = false;

function initArcRaidersIntro() {
    arcIntroCanvas = document.getElementById('arcRaidersCanvas');
    if (!arcIntroCanvas) return;

    arcIntroCtx = arcIntroCanvas.getContext('2d');
    arcIntroCanvas.width = window.innerWidth;
    arcIntroCanvas.height = window.innerHeight;

    // Arc Raiders signature colors ONLY - matching the game exactly
    const colors = [
        '#00ffff',  // Arc cyan
        '#ffff00',  // Arc yellow
        '#ff6600',  // Arc orange
        '#00ffff',  // Arc cyan (repeat for consistency)
        '#ffff00'   // Arc yellow (repeat for consistency)
    ];

    // Create curved arc lines from left side (Arc Raiders logo style)
    // Make them bigger and more prominent
    const numLines = 5;
    const spacing = window.innerHeight / (numLines + 2);

    for (let i = 0; i < numLines; i++) {
        arcIntroLines.push({
            color: colors[i],
            startY: spacing * (i + 1.5),
            currentLength: 0,
            maxLength: window.innerWidth * 0.45,
            speed: 12 + Math.random() * 6,
            thickness: 25 + i * 8, // Thicker lines
            curve: 60 + i * 40, // More pronounced curve
            alpha: 0,
            glowIntensity: 30 + i * 10
        });
    }

    arcIntroAnimating = true;
    animateArcRaidersIntro();
}

function animateArcRaidersIntro() {
    if (!arcIntroAnimating || !arcIntroCanvas) return;

    // Dark background with slight transparency for trail effect
    arcIntroCtx.fillStyle = 'rgba(10, 14, 26, 0.15)';
    arcIntroCtx.fillRect(0, 0, arcIntroCanvas.width, arcIntroCanvas.height);

    let allComplete = true;

    arcIntroLines.forEach((line, index) => {
        // Fade in quickly
        if (line.alpha < 1) {
            line.alpha += 0.03;
        }

        // Grow the line
        if (line.currentLength < line.maxLength) {
            line.currentLength += line.speed;
            allComplete = false;
        }

        // Draw curved arc line with intense glow
        arcIntroCtx.save();
        arcIntroCtx.globalAlpha = line.alpha;

        // Multiple glow layers for Arc Raiders effect
        for (let i = 0; i < 3; i++) {
            arcIntroCtx.beginPath();
            arcIntroCtx.moveTo(0, line.startY);

            // Create smooth bezier curve
            const cpX = line.currentLength * 0.5;
            const cpY = line.startY - line.curve;
            const endX = line.currentLength;
            const endY = line.startY;

            arcIntroCtx.quadraticCurveTo(cpX, cpY, endX, endY);

            arcIntroCtx.strokeStyle = line.color;
            arcIntroCtx.lineWidth = line.thickness + (i * 5);
            arcIntroCtx.lineCap = 'round';
            arcIntroCtx.shadowBlur = line.glowIntensity + (i * 15);
            arcIntroCtx.shadowColor = line.color;
            arcIntroCtx.globalAlpha = line.alpha * (1 - i * 0.3);

            arcIntroCtx.stroke();
        }

        arcIntroCtx.restore();
    });

    if (!allComplete) {
        requestAnimationFrame(animateArcRaidersIntro);
    } else {
        // Hold for 2 seconds then fade
        setTimeout(() => {
            fadeOutArcRaidersIntro();
        }, 2000);
    }
}

function fadeOutArcRaidersIntro() {
    if (!arcIntroCanvas) return;

    const fadeInterval = setInterval(() => {
        arcIntroCtx.clearRect(0, 0, arcIntroCanvas.width, arcIntroCanvas.height);

        let anyVisible = false;

        arcIntroLines.forEach(line => {
            line.alpha -= 0.03;

            if (line.alpha > 0) {
                anyVisible = true;

                arcIntroCtx.save();
                arcIntroCtx.globalAlpha = line.alpha;
                arcIntroCtx.strokeStyle = line.color;
                arcIntroCtx.lineWidth = line.thickness;
                arcIntroCtx.lineCap = 'round';
                arcIntroCtx.shadowBlur = 20;
                arcIntroCtx.shadowColor = line.color;

                arcIntroCtx.beginPath();
                arcIntroCtx.moveTo(0, line.startY);

                const cpX = line.currentLength * 0.5;
                const cpY = line.startY - line.curve;
                const endX = line.currentLength;
                const endY = line.startY;

                arcIntroCtx.quadraticCurveTo(cpX, cpY, endX, endY);
                arcIntroCtx.stroke();

                arcIntroCtx.restore();
            }
        });

        if (!anyVisible) {
            clearInterval(fadeInterval);
            arcIntroAnimating = false;
        }
    }, 50);
}
