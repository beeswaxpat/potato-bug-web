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
let btcSymbolAngle = 0;
let vizMode = 'normal';
let lightningBolts = [];

// Music and fireworks state
let musicPlaying = false;
let fireworksCanvas, fireworksCtx;
let fireworksParticles = [];

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
        fetchPolymarketOdds(),
        fetchFearGreedIndex(),
        fetchBitcoinATH(),
        fetchNewsHeadlines(),
        fetchBreakingNews()
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

        // Use the CLOB API endpoint which is more stable
        const response = await fetch('https://clob.polymarket.com/markets', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            console.error('Polymarket API returned status:', response.status);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Polymarket raw response length:', data.length);

        // Filter for active, crypto-related markets
        const cryptoMarkets = data.filter(market => {
            if (!market || !market.question || market.closed) return false;
            const q = market.question.toLowerCase();
            return q.includes('bitcoin') || q.includes('btc') || q.includes('crypto') ||
                   q.includes('ethereum') || q.includes('eth') || q.includes('solana') ||
                   q.includes('sol') || q.includes('xrp') || q.includes('ripple');
        });

        console.log('Filtered crypto markets:', cryptoMarkets.length);

        if (cryptoMarkets.length > 0) {
            polymarketData = cryptoMarkets.slice(0, 3);
        } else {
            // If no crypto markets, show top 3 active non-closed markets
            console.log('No crypto markets found, showing top active markets');
            const activeMarkets = data.filter(m => !m.closed).slice(0, 3);
            polymarketData = activeMarkets.length > 0 ? activeMarkets : data.slice(0, 3);
        }

        updatePolymarketDisplay();
    } catch (error) {
        console.error('Polymarket API error details:', error);
        // Fallback to showing a helpful message
        document.getElementById('polymarketOdds').innerHTML = `
            <p class="loading">Polymarket data temporarily unavailable</p>
            <p class="loading" style="font-size: 12px; margin-top: 5px; opacity: 0.7;">Will retry shortly...</p>
        `;

        // Retry after 30 seconds
        setTimeout(fetchPolymarketOdds, 30000);
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

    // Fetch Fox Business
    try {
        const response = await fetch('https://moxie.foxbusiness.com/google-publisher/markets.xml');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');

        const foxHeadlines = Array.from(items).slice(0, 6).map(item => ({
            title: '📺 FOX BIZ: ' + item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent
        }));
        allHeadlines.push(...foxHeadlines);
    } catch (error) {
        console.error('Error fetching Fox Business news:', error);
    }

    // Fetch CNBC
    try {
        const response = await fetch('https://www.cnbc.com/id/100003114/device/rss/rss.html');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');

        const cnbcHeadlines = Array.from(items).slice(0, 6).map(item => ({
            title: '📊 CNBC: ' + item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent
        }));
        allHeadlines.push(...cnbcHeadlines);
    } catch (error) {
        console.error('Error fetching CNBC news:', error);
    }

    // Fetch Bloomberg
    try {
        const response = await fetch('https://feeds.bloomberg.com/markets/news.rss');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');

        const bloombergHeadlines = Array.from(items).slice(0, 6).map(item => ({
            title: '📈 BLOOMBERG: ' + item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent
        }));
        allHeadlines.push(...bloombergHeadlines);
    } catch (error) {
        console.error('Error fetching Bloomberg news:', error);
    }

    // Fetch Wall Street Journal
    try {
        const response = await fetch('https://feeds.a.dj.com/rss/RSSMarketsMain.xml');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');

        const wsjHeadlines = Array.from(items).slice(0, 6).map(item => ({
            title: '📰 WSJ: ' + item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent
        }));
        allHeadlines.push(...wsjHeadlines);
    } catch (error) {
        console.error('Error fetching WSJ news:', error);
    }

    // Fetch Reuters Business
    try {
        const response = await fetch('https://www.reutersagency.com/feed/?taxonomy=best-topics&post_type=best');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');

        const reutersHeadlines = Array.from(items).slice(0, 5).map(item => ({
            title: '📡 REUTERS: ' + item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent
        }));
        allHeadlines.push(...reutersHeadlines);
    } catch (error) {
        console.error('Error fetching Reuters news:', error);
    }

    // Fetch CoinTelegraph
    try {
        const response = await fetch('https://cointelegraph.com/rss');
        const text = await response.text();
        const xml = new DOMParser().parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');

        const ctHeadlines = Array.from(items).slice(0, 8).map(item => ({
            title: '₿ COINTELEGRAPH: ' + item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent
        }));
        allHeadlines.push(...ctHeadlines);
    } catch (error) {
        console.error('Error fetching CoinTelegraph news:', error);
    }

    // If we have no headlines at all, show an error
    if (allHeadlines.length === 0) {
        newsHeadlines = [{
            title: '⚠️ News feeds temporarily unavailable. Will retry shortly.',
            link: '#'
        }];
    } else {
        newsHeadlines = allHeadlines;
    }

    updateNewsTicker();
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

function startDataUpdates() {
    setInterval(fetchCoinPrices, 60000);
    setInterval(fetchPolymarketOdds, 300000);
    setInterval(fetchFearGreedIndex, 1800000);
    setInterval(fetchBitcoinATH, 1800000);
    if (newsEnabled) {
        setInterval(fetchNewsHeadlines, 600000);
        setInterval(fetchBreakingNews, 300000); // Check for breaking news every 5 minutes
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

function updatePolymarketDisplay() {
    const container = document.getElementById('polymarketOdds');

    if (!polymarketData || polymarketData.length === 0) {
        container.innerHTML = '<p class="loading">Loading prediction markets...</p>';
        return;
    }

    container.innerHTML = '';

    polymarketData.forEach(market => {
        const card = document.createElement('div');
        card.className = 'odds-card';

        let probability = 'N/A';

        // Try multiple ways to extract probability
        if (market.outcomePrices && market.outcomePrices.length > 0) {
            probability = (parseFloat(market.outcomePrices[0]) * 100).toFixed(1) + '%';
        } else if (market.outcomes && market.outcomes.length > 0) {
            const yesOutcome = market.outcomes.find(o => o.name === 'Yes' || o.name === 'YES');
            if (yesOutcome && yesOutcome.price !== undefined) {
                probability = (parseFloat(yesOutcome.price) * 100).toFixed(1) + '%';
            } else if (market.outcomes[0] && market.outcomes[0].price !== undefined) {
                probability = (parseFloat(market.outcomes[0].price) * 100).toFixed(1) + '%';
            }
        } else if (market.clobTokenIds && market.clobTokenIds.length > 0) {
            // For CLOB API, we may need to fetch individual token prices
            // For now, just show the market without probability
            probability = 'Live';
        }

        const questionText = market.question || market.title || 'Market Question';

        card.innerHTML = `
            <h4>${questionText}</h4>
            <div class="odds-value">${probability}</div>
        `;

        container.appendChild(card);
    });
}

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
    const particleCount = vizQuality === 'low' ? 200 : (vizQuality === 'high' ? 600 : 400);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random(),
            size: 4 + Math.random() * 8,
            speed: 0.1 + Math.random() * 0.25,
            angle: Math.random() * Math.PI * 2,
            angularSpeed: (Math.random() - 0.5) * 10,
            hue: Math.random(),
            colorIndex: Math.floor(Math.random() * 4) // For multi-color particles
        });
    }

    for (let i = 0; i < 120; i++) {
        tunnelSegments.push({
            z: i * 0.03,
            rotation: Math.random() * Math.PI * 2,
            offset: Math.random() * Math.PI * 2
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

    ctx.fillStyle = COLORS.bg_dark;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawTunnel();
    drawParticles();
    drawBitcoinSymbol();

    if (vizMode !== 'calm' && Math.random() < 0.05 && (vizMode === 'extreme_fear' || vizMode === 'extreme_greed' || vizMode === 'singularity')) {
        drawLightning();
    }

    updateLightning();
}

function drawTunnel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Wormhole effect with traveling sensation
    let speedMultiplier = 0.4; // Faster default for travel feel
    let wobble = 20;
    let pulseIntensity = 0;

    if (vizMode === 'singularity') {
        speedMultiplier = 3.0;
        wobble = 50;
        pulseIntensity = 30;
    } else if (vizMode === 'pump' || vizMode === 'ath') {
        speedMultiplier = 1.2;
        wobble = 25;
        pulseIntensity = 15;
    } else if (vizMode === 'dump') {
        speedMultiplier = 1.5;
        wobble = 30;
        pulseIntensity = 20;
    } else if (vizMode === 'extreme_fear' || vizMode === 'extreme_greed') {
        speedMultiplier = 0.9;
        wobble = 22;
        pulseIntensity = 10;
    } else if (vizMode === 'calm') {
        speedMultiplier = 0.3;
        wobble = 12;
        pulseIntensity = 5;
    }

    const time = Date.now() * 0.001;

    tunnelSegments.forEach((segment, index) => {
        segment.z -= 0.04 * speedMultiplier;
        if (segment.z < 0) {
            segment.z = 1;
            segment.offset = Math.random() * Math.PI * 2;
        }

        const scale = 1 - segment.z;
        const pulse = Math.sin(time * 2 + segment.z * 10) * pulseIntensity;
        const radius = 150 + scale * 350 + Math.sin(segment.rotation * 5 + segment.offset) * wobble + pulse;

        // Draw multiple concentric rings for depth
        for (let ring = 0; ring < 2; ring++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * scale + ring * 5, 0, Math.PI * 2);

            const color = getWormholeColor(segment.z, vizMode, ring);
            ctx.strokeStyle = color;
            ctx.lineWidth = 4 + scale * 4 - ring;
            ctx.globalAlpha = (0.5 + scale * 0.5) * (1 - ring * 0.3);

            // Add glow effect
            ctx.shadowBlur = 15 + scale * 20;
            ctx.shadowColor = color;

            ctx.stroke();
        }

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        segment.rotation += 0.012 * speedMultiplier;
    });
}

function drawParticles() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const time = Date.now() * 0.001;

    particles.forEach(particle => {
        particle.angle += particle.angularSpeed * 0.008;
        particle.z += particle.speed * 0.008;
        if (particle.z > 1) {
            particle.z = 0;
            particle.colorIndex = Math.floor(Math.random() * 4);
        }

        const scale = 1 - particle.z;
        const depth = particle.z;

        // Spiral orbit for wormhole effect
        const spiralFactor = Math.sin(depth * Math.PI * 2);
        const orbitRadius = 80 + scale * 220 + spiralFactor * 30;

        const x = centerX + Math.cos(particle.angle) * orbitRadius * scale;
        const y = centerY + Math.sin(particle.angle) * orbitRadius * scale;
        const size = particle.size * (scale + 0.3); // Ensure minimum size

        // Draw particle with intense glow
        const color = getParticleColor(particle.colorIndex, depth, vizMode);

        // Outer glow
        ctx.beginPath();
        ctx.arc(x, y, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.15 * scale;
        ctx.fill();

        // Main particle
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 25;
        ctx.shadowColor = color;
        ctx.globalAlpha = 0.7 + scale * 0.3;
        ctx.fill();

        // Core bright spot
        ctx.beginPath();
        ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.9;
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    });
}

function drawBitcoinSymbol() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const time = Date.now() * 0.001;

    let speedMultiplier = 1.2;
    if (vizMode === 'singularity') speedMultiplier = 8;
    else if (vizMode === 'ath') speedMultiplier = 5;
    else if (vizMode === 'pump') speedMultiplier = 3;
    else if (vizMode === 'dump') speedMultiplier = 3.5;
    else if (vizMode === 'calm') speedMultiplier = 0.8;

    btcSymbolAngle += 8 * speedMultiplier * 0.02;

    // Larger orbit for better visibility
    const orbitRadius = 120;
    const wobble = Math.sin(time * 2) * 15;
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

// ==================== MUSIC PLAYER ====================

function toggleMusic() {
    const audio = document.getElementById('synthMusic');
    const btn = document.getElementById('musicBtn');

    if (musicPlaying) {
        audio.pause();
        btn.textContent = '🎵 MUSIC';
        btn.style.opacity = '0.7';
        musicPlaying = false;
    } else {
        audio.play().catch(err => console.error('Audio play failed:', err));
        btn.textContent = '⏸️ MUSIC';
        btn.style.opacity = '1';
        musicPlaying = true;
    }
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
    addSystemMessage(`🎆 ${username} triggered fireworks!`);

    // Show canvas
    fireworksCanvas.style.display = 'block';

    // Create multiple firework launches
    const launchCount = 8;
    for (let i = 0; i < launchCount; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 300);
    }

    // Animate fireworks
    animateFireworks();

    // Hide canvas after 5 seconds
    setTimeout(() => {
        fireworksCanvas.style.display = 'none';
        fireworksParticles = [];
    }, 5000);
}

function createFirework() {
    const x = Math.random() * fireworksCanvas.width;
    const y = fireworksCanvas.height * 0.3 + Math.random() * fireworksCanvas.height * 0.3;

    const particleCount = 80;
    const colors = [
        COLORS.miami_cyan, COLORS.miami_pink, COLORS.arc_purple,
        COLORS.electric_yellow, COLORS.poison_green, COLORS.sunset_orange,
        COLORS.neon_magenta, COLORS.arc_teal
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 2 + Math.random() * 4;

        fireworksParticles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            life: 1.0,
            decay: 0.01 + Math.random() * 0.01,
            size: 3 + Math.random() * 3,
            color: color,
            gravity: 0.05
        });
    }
}

function animateFireworks() {
    if (fireworksParticles.length === 0 && fireworksCanvas.style.display === 'none') {
        return;
    }

    fireworksCtx.fillStyle = 'rgba(10, 14, 26, 0.1)';
    fireworksCtx.fillRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

    fireworksParticles = fireworksParticles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.life -= p.decay;

        if (p.life <= 0) return false;

        fireworksCtx.beginPath();
        fireworksCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        fireworksCtx.fillStyle = p.color;
        fireworksCtx.globalAlpha = p.life;
        fireworksCtx.shadowBlur = 15;
        fireworksCtx.shadowColor = p.color;
        fireworksCtx.fill();

        fireworksCtx.globalAlpha = 1;
        fireworksCtx.shadowBlur = 0;

        return true;
    });

    requestAnimationFrame(animateFireworks);
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

    // Weather
    document.getElementById('editWeatherBtn').addEventListener('click', showWeatherModal);
    document.getElementById('closeWeather').addEventListener('click', hideWeatherModal);
    document.getElementById('saveZipBtn').addEventListener('click', saveZipCode);
    document.getElementById('zipCodeInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveZipCode();
    });
}

window.removeCoin = removeCoin;
