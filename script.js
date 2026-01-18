// Level configuration
const levels = {
  1: { rows: 3, cols: 3, pairs: 4 },   // 3x3 = 9 cards (4 pairs)
  2: { rows: 4, cols: 4, pairs: 8 },   // 4x4 = 16 cards (8 pairs)
  3: { rows: 5, cols: 4, pairs: 10 },  // 4x5 = 20 cards (10 pairs)
  4: { rows: 8, cols: 6, pairs: 24 }   // 6x8 = 48 cards (24 pairs - all tokens)
};

// Memory game tokens - all 24 tokens from images/ folder
const allTokens = [
  { name: 'AAVE', image: 'images/aave.png' },
  { name: 'AERO', image: 'images/aero.png' },
  { name: 'APT', image: 'images/apt.png' },
  { name: 'ARB', image: 'images/arb.png' },
  { name: 'BASE', image: 'images/base.png' },
  { name: 'BNB', image: 'images/bnb.png' },
  { name: 'BRETT', image: 'images/brett.png' },
  { name: 'BTC', image: 'images/btc.png' },
  { name: 'DEGEN', image: 'images/degen.png' },
  { name: 'ETH', image: 'images/eth.png' },
  { name: 'FARC', image: 'images/farc.png' },
  { name: 'HYPE', image: 'images/hype.png' },
  { name: 'OP', image: 'images/op.png' },
  { name: 'PEPE', image: 'images/pepe.png' },
  { name: 'PONKE', image: 'images/ponke.png' },
  { name: 'SOL', image: 'images/sol.png' },
  { name: 'SUI', image: 'images/sui.png' },
  { name: 'TOBY', image: 'images/toby.png' },
  { name: 'TON', image: 'images/ton.png' },
  { name: 'TOSHI', image: 'images/toshi.png' },
  { name: 'UNI', image: 'images/uni.png' },
  { name: 'USDC', image: 'images/usdc.png' },
  { name: 'USDT', image: 'images/usdt.png' },
  { name: 'XRP', image: 'images/xrp.png' }
];

const board = document.getElementById('gameBoard');
const levelMenu = document.getElementById('levelMenu');
const gameContainer = document.getElementById('gameContainer');
const currentLevelSpan = document.getElementById('currentLevel');
const movesCountSpan = document.getElementById('movesCount');

let currentLevel = 1;
let flippedCards = [];
let matchedPairs = 0;
let levelTokens = [];
let moves = 0;
let currentLevelMoves = 0; // Move counter for current level

// Leaderboard - load from localStorage
function getLeaderboard() {
  const stored = localStorage.getItem('leaderboard');
  return stored ? JSON.parse(stored) : { 1: [], 2: [], 3: [], 4: [] };
}

function saveLeaderboard(leaderboard) {
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function addToLeaderboard(level, moves, walletAddress) {
  const leaderboard = getLeaderboard();
  const entry = {
    moves: moves,
    wallet: walletAddress || 'Anonymous',
    date: new Date().toISOString()
  };
  
  leaderboard[level].push(entry);
  // Sort by number of moves (less = better)
  leaderboard[level].sort((a, b) => a.moves - b.moves);
  // Keep only top-10
  leaderboard[level] = leaderboard[level].slice(0, 10);
  
  saveLeaderboard(leaderboard);
}

function isTopResult(level, moves) {
  const leaderboard = getLeaderboard();
  const topResults = leaderboard[level];
  
  // If table is empty or has less than 10 entries - always top
  if (topResults.length < 10) return true;
  
  // Check if result is better than the worst in top-10
  const worstTopResult = topResults[topResults.length - 1];
  return moves <= worstTopResult.moves;
}

// Level selection button handlers
document.querySelectorAll('.level-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentLevel = parseInt(btn.dataset.level);
    startLevel(currentLevel);
  });
});

function startLevel(level) {
  // Hide menu, show game
  levelMenu.style.display = 'none';
  gameContainer.style.display = 'block';
  currentLevelSpan.textContent = level;
  
  // Reset state
  flippedCards = [];
  matchedPairs = 0;
  currentLevelMoves = 0;
  board.innerHTML = '';
  updateMovesDisplay();
  
  // Get level configuration
  const levelConfig = levels[level];
  
  // Select required number of tokens for level
  levelTokens = allTokens.slice(0, levelConfig.pairs);
  const cards = [...levelTokens, ...levelTokens];
  
  // Set grid size
  board.style.gridTemplateColumns = `repeat(${levelConfig.cols}, 100px)`;
  
  // Shuffle cards
  const shuffledCards = shuffle([...cards]);
  
  // Create cards
  shuffledCards.forEach((token, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = token.name;

    card.innerHTML = `
      <div class="card-front">
        <img src="${token.image}" alt="${token.name}" onerror="this.style.display='none'; this.parentElement.innerHTML='${token.name}'">
      </div>
      <div class="card-back">?</div>
    `;

    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function updateMovesDisplay() {
  movesCountSpan.textContent = currentLevelMoves;
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      // Increment move counter when opening second card
      currentLevelMoves++;
      updateMovesDisplay();
      checkMatch();
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedPairs++;
    flippedCards = [];

    const levelConfig = levels[currentLevel];
    if (matchedPairs === levelConfig.pairs) {
      // Level completed
      setTimeout(() => {
        const isTop = isTopResult(currentLevel, currentLevelMoves);
        
        if (currentLevel < 4) {
          let message = `Congratulations! Level ${currentLevel} completed! 🎉\nMoves: ${currentLevelMoves}`;
          if (isTop) {
            message += '\n\nYour result is on the leaderboard!';
          }
          message += '\n\nMove to next level?';
          
          if (confirm(message)) {
            if (isTop) {
              showAuthModal(currentLevel, currentLevelMoves, () => {
                currentLevel++;
                startLevel(currentLevel);
              });
            } else {
              currentLevel++;
              startLevel(currentLevel);
            }
          } else {
            if (isTop) {
              showAuthModal(currentLevel, currentLevelMoves, () => {
                resetToMenu();
              });
            } else {
              resetToMenu();
            }
          }
        } else {
          // All levels completed
          if (isTop) {
            showAuthModal(currentLevel, currentLevelMoves, () => {
              alert('🎉 Congratulations! You completed all levels! You are a true degen! 🚀');
              setTimeout(() => resetToMenu(), 2000);
            });
          } else {
            alert(`🎉 Congratulations! You completed all levels! You are a true degen! 🚀\nMoves: ${currentLevelMoves}`);
            setTimeout(() => resetToMenu(), 2000);
          }
        }
      }, 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

function resetToMenu() {
  levelMenu.style.display = 'block';
  gameContainer.style.display = 'none';
  board.innerHTML = '';
  flippedCards = [];
  matchedPairs = 0;
  currentLevelMoves = 0;
  moves = 0;
}

// Authentication modal
function showAuthModal(level, moves, callback) {
  document.getElementById('authLevel').textContent = level;
  document.getElementById('authMoves').textContent = moves;
  document.getElementById('authModal').style.display = 'block';
  window.authCallback = callback;
}

function closeAuthModal() {
  document.getElementById('authModal').style.display = 'none';
}

function skipAuth() {
  closeAuthModal();
  if (window.authCallback) {
    window.authCallback();
  }
}

// Wallet connection
async function connectWallet() {
  try {
    if (typeof window.ethereum !== 'undefined') {
      // MetaMask is available
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      
      // Get data from modal
      const level = parseInt(document.getElementById('authLevel').textContent);
      const moves = parseInt(document.getElementById('authMoves').textContent);
      
      // Save to leaderboard
      addToLeaderboard(level, moves, address);
      
      alert(`Wallet connected! Result saved to leaderboard! 🎉\nAddress: ${address.substring(0, 6)}...${address.substring(38)}`);
      
      closeAuthModal();
      if (window.authCallback) {
        window.authCallback();
      }
    } else {
      alert('MetaMask is not installed! Please install MetaMask browser extension.');
    }
  } catch (error) {
    console.error('Wallet connection error:', error);
    alert('Wallet connection error. Please try again.');
  }
}

// Leaderboard
let currentLeaderboardLevel = 1;

function showLeaderboard() {
  document.getElementById('leaderboardModal').style.display = 'block';
  showLeaderboardLevel(1);
}

function closeLeaderboard() {
  document.getElementById('leaderboardModal').style.display = 'none';
}

function showLeaderboardLevel(level) {
  currentLeaderboardLevel = level;
  
  // Update active tab
  document.querySelectorAll('.tab-btn').forEach((btn, index) => {
    if (index + 1 === level) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Load data
  const leaderboard = getLeaderboard();
  const levelData = leaderboard[level] || [];
  
  // Display table
  const table = document.getElementById('leaderboardTable');
  
  if (levelData.length === 0) {
    table.innerHTML = '<p class="no-results">No results yet</p>';
    return;
  }
  
  let html = '<table><thead><tr><th>#</th><th>Wallet Address</th><th>Moves</th><th>Date</th></tr></thead><tbody>';
  
  levelData.forEach((entry, index) => {
    const rank = index + 1;
    const wallet = entry.wallet === 'Anonymous' 
      ? 'Anonymous' 
      : `${entry.wallet.substring(0, 6)}...${entry.wallet.substring(38)}`;
    const date = new Date(entry.date).toLocaleDateString('en-US');
    
    html += `<tr>
      <td>${rank}</td>
      <td>${wallet}</td>
      <td>${entry.moves}</td>
      <td>${date}</td>
    </tr>`;
  });
  
  html += '</tbody></table>';
  table.innerHTML = html;
}

// Close modals when clicking outside them
window.onclick = function(event) {
  const leaderboardModal = document.getElementById('leaderboardModal');
  const authModal = document.getElementById('authModal');
  
  if (event.target === leaderboardModal) {
    closeLeaderboard();
  }
  if (event.target === authModal) {
    closeAuthModal();
  }
}
