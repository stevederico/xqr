// X.com QR Code Generator
import qrcode from 'qrcode-generator';

function getUsername() {
  const path = window.location.pathname;
  return path.length > 1 ? path.substring(1) : null;
}

function createQRCode(username) {
  const url = `https://x.com/${username}`;
  
  // Create QR code using local library
  const qr = qrcode(0, 'L');
  qr.addData(url);
  qr.make();
  
  // Create canvas and draw QR code
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const modules = qr.getModuleCount();
  const cellSize = 8;
  const margin = 4;
  
  canvas.width = (modules + margin * 2) * cellSize;
  canvas.height = (modules + margin * 2) * cellSize;
  canvas.className = 'mx-auto rounded-lg shadow-lg border border-border';
  
  // Fill background white
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw QR code modules
  ctx.fillStyle = '#000000';
  for (let row = 0; row < modules; row++) {
    for (let col = 0; col < modules; col++) {
      if (qr.isDark(row, col)) {
        ctx.fillRect(
          (col + margin) * cellSize,
          (row + margin) * cellSize,
          cellSize,
          cellSize
        );
      }
    }
  }
  
  showResult(canvas, url, username);
}

function showResult(canvas, url, username) {
document.body.innerHTML = `
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            
            <p class="text-gray-600 mb-2">x.com/${username}</p>
            
            <div class="mb-2" id="qr-container"></div>
            <h1 class="text-5xl font-bold mb-12">@${username}</h1>
            
            <div class="pt-4 border-t">
                <p class="text-gray-600 mb-2">1. Screenshot this</p>
                <p class="text-gray-600 mb-2">2. Set as lock screen</p>
                <p class="text-gray-600 mb-2">3. Use it at meetups</p>
                <p class="text-gray-600">🚀 Make your own at <a href="https://xqr.bixbyapps.com" class="text-blue-600 hover:underline">xqr.bixbyapps.com</a></p>
            </div>
        </div>
    </div>
`;
  
  document.getElementById('qr-container').appendChild(canvas);
}

function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4';
  errorDiv.textContent = message;
  document.querySelector('form').insertBefore(errorDiv, document.querySelector('form').firstChild);
}

function showForm() {
  document.body.innerHTML = `
    <div class="min-h-screen flex items-center justify-center p-4">
      <div class="bg-white border rounded-lg shadow-lg p-8 max-w-md w-full">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold mb-2">X.com QR Generator</h1>
        </div>
        
        <form id="qr-form" class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium mb-2">Username</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">@</span>
              <input 
                type="text" 
                id="username" 
                placeholder="elonmusk"
                class="w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
            </div>
          </div>
          
          <button 
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Generate QR Code
          </button>
        </form>
        
        <div class="mt-6 pt-6 border-t">
          <p class="text-sm text-gray-500 text-center">
            enter username or go to : <code class="bg-gray-100 px-1 rounded">xqr.bixbyapps.com/username</code>
          </p>
        </div>
      </div>
    </div>
  `;

  document.getElementById('qr-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    if (username) createQRCode(username);
  });
}

// Main logic
const username = getUsername();
username ? createQRCode(username) : showForm();
