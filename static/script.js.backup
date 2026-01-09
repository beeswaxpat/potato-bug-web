// PotatoBugCrypto v12 Web - Enhanced Edition
// New: 250+ coins, persistent storage, image triggers, chat quotes, fixed Polymarket

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

const QUOTES = [
    "I got a lil goop naimeen",
    "Buy high, sell low - it's the way",
    "Not financial advice, but definitely financial advice",
    "Trust the process",
    "Zoom out",
    "This is fine",
    "Have fun staying poor",
    "Few understand this",
    "Probably nothing",
    "Bullish",
    "Numbers go up",
    "Wen moon?",
    "Just up",
    "This is the way",
    "HODL strong",
    "Panic sells make for great stories",
    "Be fearful when others are greedy",
    "Buy the fear, sell the greed",
    "Dips are gifts",
    "Volatility is your friend",
    "Diamond hands don't fold",
    "Still early",
    "Stack sats",
    "Laser eyes activated"
];

const COLORS = {
    bg_dark: '#0a0e1a',
    bg_medium: '#1a1f35',
    neon_cyan: '#00f3ff',
    neon_magenta: '#ff00ff',
    neon_purple: '#b026ff',
    hot_pink: '#ff0080',
    nuclear_green: '#39ff14',
    electric_yellow: '#fffc00',
    neon_orange: '#ff6600',
    electric_blue: '#0080ff',
    gold: '#ffd700',
    hot_red: '#ff0040'
};

// ==================== STATE ====================

let ws = null;
let currentRoom = null;
let currentUsername = null;
let selectedCoins = ['bitcoin'];
let allCoinsList = [];
let coinData = {};
let polymarketData = [];
let fngIndex = null;
let btcActualAth = 0;
let newsHeadlines = [];

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

// ==================== ROOM CODE SYSTEM ====================

function generateRoomCode() {
    const word1 = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    const word2 = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    const word3 = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    const number = Math.floor(Math.random() * 10);
    return `${word1}-${word2}-${word3}-${number}`;
}

function validateRoomCode(code) {
    return code && code.length > 0 && code.length <= 20;
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
    loadPersistedData();
    setupRoomModal();

    canvas = document.getElementById('psychedelicCanvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    setupEventListeners();
    detectVizQuality();
    fetchAllCoinsList();
});

function setupRoomModal() {
    const randomBtn = document.getElementById('randomRoomBtn');
    const customBtn = document.getElementById('customRoomBtn');
    const customInput = document.getElementById('customRoomInput');
    const usernameInput = document.getElementById('usernameInput');

    randomBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim() || 'Anon' + Math.floor(Math.random() * 1000);
        const roomCode = generateRoomCode();
        joinRoom(roomCode, username);
    });

    customBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim() || 'Anon' + Math.floor(Math.random() * 1000);
        const roomCode = customInput.value.trim().toLowerCase();

        if (validateRoomCode(roomCode)) {
            joinRoom(roomCode, username);
        } else {
            alert('Invalid room code');
        }
    });

    customInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') customBtn.click();
    });

    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (customInput.value.trim()) {
                customBtn.click();
            } else {
                randomBtn.click();
            }
        }
    });
}

function joinRoom(roomCode, username) {
    currentRoom = roomCode;
    currentUsername = username;

    document.getElementById('roomModal').style.display = 'none';
    document.getElementById('appContainer').style.display = 'block';
    document.getElementById('roomCodeDisplay').textContent = roomCode;
    document.getElementById('settingsRoomCode').textContent = roomCode;

    connectWebSocket();
    fetchAllData();
    startDataUpdates();
    initVisualization();
    animate();
    startChatQuoteRotation();
    updateSelectedCoinsDisplay();

    // Load weather if zip code is saved
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
        selectedCoins = settings.selectedCoins ?? ['bitcoin'];
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
        if (!coin && coinId !== 'bitcoin') return;

        const displayName = coin ? coin.name : 'Bitcoin';
        const displaySymbol = coin ? coin.symbol : 'BTC';

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
    if (userZipCode) {
        document.getElementById('zipCodeInput').value = userZipCode;
    }
    document.getElementById('zipCodeInput').focus();
}

function hideWeatherModal() {
    document.getElementById('weatherModal').style.display = 'none';
}

function saveZipCode() {
    const zip = document.getElementById('zipCodeInput').value.trim();
    if (zip) {
        userZipCode = zip;
        savePersistedData();
        fetchWeather();
        hideWeatherModal();
    }
}

async function fetchWeather() {
    if (!userZipCode) return;

    try {
        // Using OpenWeatherMap free API (requires API key, but we'll use wttr.in as free alternative)
        // wttr.in is a free weather service that doesn't require API key
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
        document.getElementById('weatherDisplay').innerHTML = '<p class="weather-prompt">Unable to fetch weather. Check zip code.</p>';
    }
}

function updateWeatherDisplay() {
    if (!weatherData) return;

    const container = document.getElementById('weatherDisplay');

    // Get weather emoji based on condition
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
        fetchNewsHeadlines()
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
        const response = await fetch('https://gamma-api.polymarket.com/markets?limit=100&active=true');
        const data = await response.json();

        polymarketData = data.filter(market =>
            (market.question.toLowerCase().includes('bitcoin') ||
             market.question.toLowerCase().includes('btc') ||
             market.question.toLowerCase().includes('crypto') ||
             market.question.toLowerCase().includes('ethereum')) &&
            market.active !== false
        ).slice(0, 3);

        updatePolymarketDisplay();
    } catch (error) {
        console.error('Error fetching Polymarket:', error);
        document.getElementById('polymarketOdds').innerHTML = '<p class="loading">Polymarket temporarily unavailable</p>';
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

    try {
        const response = await fetch('https://www.coindesk.com/arc/outboundfeeds/rss/');
        const text = await response.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');

        newsHeadlines = Array.from(items).slice(0, 10).map(item => ({
            title: item.querySelector('title')?.textContent,
            link: item.querySelector('link')?.textContent
        }));

        updateNewsTicker();
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function startDataUpdates() {
    setInterval(fetchCoinPrices, 60000);
    setInterval(fetchPolymarketOdds, 300000);
    setInterval(fetchFearGreedIndex, 1800000);
    setInterval(fetchBitcoinATH, 1800000);
    if (newsEnabled) {
        setInterval(fetchNewsHeadlines, 600000);
    }
    if (userZipCode) {
        setInterval(fetchWeather, 600000); // Update weather every 10 minutes
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

    if (polymarketData.length === 0) {
        container.innerHTML = '<p class="loading">Loading crypto markets...</p>';
        return;
    }

    container.innerHTML = '';

    polymarketData.forEach(market => {
        const card = document.createElement('div');
        card.className = 'odds-card';

        let probability = 'N/A';
        if (market.outcomePrices && market.outcomePrices.length > 0) {
            probability = (parseFloat(market.outcomePrices[0]) * 100).toFixed(1) + '%';
        }

        card.innerHTML = `
            <h4>${market.question}</h4>
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
    setInterval(() => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
            ws.send(JSON.stringify({
                type: 'fren_bot',
                message: `"${quote}"`
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
    const particleCount = vizQuality === 'low' ? 100 : (vizQuality === 'high' ? 300 : 200);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random(),
            size: 2 + Math.random() * 4,
            speed: 0.04 + Math.random() * 0.14,
            angle: Math.random() * Math.PI * 2,
            angularSpeed: (Math.random() - 0.5) * 6,
            hue: Math.random()
        });
    }

    for (let i = 0; i < 60; i++) {
        tunnelSegments.push({
            z: i * 0.05,
            rotation: Math.random() * Math.PI * 2
        });
    }
}

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

function detectVizQuality() {
    if (vizQuality !== 'auto') return;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    vizQuality = isMobile ? 'medium' : 'high';
}

function animate() {
    requestAnimationFrame(animate);

    ctx.fillStyle = COLORS.bg_dark;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawTunnel();
    drawParticles();
    drawBitcoinSymbol();

    if (Math.random() < 0.05 && (vizMode === 'extreme_fear' || vizMode === 'extreme_greed' || vizMode === 'singularity')) {
        drawLightning();
    }

    updateLightning();
}

function drawTunnel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const speedMultiplier = vizMode === 'singularity' ? 5 : (vizMode === 'pump' || vizMode === 'ath' ? 2 : 1);
    const wobble = vizMode === 'singularity' ? 50 : 30;

    tunnelSegments.forEach(segment => {
        segment.z -= 0.08 * speedMultiplier;
        if (segment.z < 0) segment.z = 1;

        const scale = 1 - segment.z;
        const radius = 100 + scale * 200 + Math.sin(segment.rotation * 5) * wobble;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * scale, 0, Math.PI * 2);
        ctx.strokeStyle = getDynamicColor(segment.z, vizMode);
        ctx.lineWidth = 2 + scale * 2;
        ctx.stroke();

        segment.rotation += 0.02 * speedMultiplier;
    });
}

function drawParticles() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    particles.forEach(particle => {
        particle.angle += particle.angularSpeed * 0.01;
        particle.z += particle.speed * 0.01;
        if (particle.z > 1) particle.z = 0;

        const scale = 1 - particle.z;
        const orbitRadius = 50 + scale * 150;

        const x = centerX + Math.cos(particle.angle) * orbitRadius * scale;
        const y = centerY + Math.sin(particle.angle) * orbitRadius * scale;
        const size = particle.size * scale;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = getDynamicColor(particle.hue + particle.z, vizMode);
        ctx.globalAlpha = 0.3 + scale * 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
    });
}

function drawBitcoinSymbol() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const speedMultiplier = vizMode === 'singularity' ? 5 : (vizMode === 'ath' ? 3 : (vizMode === 'pump' ? 2 : 1));
    btcSymbolAngle += 10 * speedMultiplier * 0.01;

    const orbitRadius = 75;
    const x = centerX + Math.cos(btcSymbolAngle * Math.PI / 180) * orbitRadius;
    const y = centerY + Math.sin(btcSymbolAngle * Math.PI / 180) * orbitRadius;

    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let color = COLORS.gold;
    if (vizMode === 'singularity') {
        color = getDynamicColor(Date.now() * 0.001, vizMode);
    } else if (vizMode === 'pump') {
        color = COLORS.nuclear_green;
    } else if (vizMode === 'dump') {
        color = COLORS.hot_red;
    }

    ctx.fillStyle = color;
    ctx.fillText('₿', x, y);
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

function getDynamicColor(progress, mode) {
    let hue;

    if (mode === 'extreme_greed') {
        hue = (progress + 0.3) % 1.0;
    } else if (mode === 'extreme_fear') {
        hue = 0.0;
    } else if (mode === 'singularity') {
        hue = (progress * 3) % 1.0;
    } else if (mode === 'pump') {
        hue = 0.33;
    } else if (mode === 'dump') {
        hue = 0.0;
    } else if (mode === 'ath') {
        hue = 0.14;
    } else {
        hue = progress;
    }

    return `hsl(${hue * 360}, 100%, 50%)`;
}

// ==================== EVENT LISTENERS ====================

function setupEventListeners() {
    document.getElementById('sendBtn').addEventListener('click', sendChatMessage);
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });

    document.getElementById('addCoinBtn').addEventListener('click', showAddCoinModal);
    document.getElementById('closeAddCoin').addEventListener('click', hideAddCoinModal);
    document.getElementById('coinSearchInput').addEventListener('input', (e) => {
        searchCoins(e.target.value);
    });

    document.getElementById('themeToggle').addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const btn = document.getElementById('themeToggle');
        btn.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
    });

    document.getElementById('settingsBtn').addEventListener('click', () => {
        document.getElementById('settingsModal').style.display = 'flex';
    });

    document.getElementById('closeSettings').addEventListener('click', () => {
        document.getElementById('settingsModal').style.display = 'none';
    });

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
