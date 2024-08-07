// script.js

const addresses = {
    btc: 'your_btc_address_here',
    eth: 'your_eth_address_here',
    bnb: 'your_bnb_address_here'
};

const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd';

let prices = {
    btc: 0,
    eth: 0,
    bnb: 0
};

async function fetchPrices() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        prices.btc = data.bitcoin.usd;
        prices.eth = data.ethereum.usd;
        prices.bnb = data.binancecoin.usd;
        
        document.getElementById('btc-price').innerText = `$${prices.btc}`;
        document.getElementById('eth-price').innerText = `$${prices.eth}`;
        document.getElementById('bnb-price').innerText = `$${prices.bnb}`;
    } catch (error) {
        console.error('Error fetching prices:', error);
        document.getElementById('btc-price').innerText = 'Error';
        document.getElementById('eth-price').innerText = 'Error';
        document.getElementById('bnb-price').innerText = 'Error';
    }
}

function toggleInputType() {
    const inputType = document.getElementById('input-type').value;
    if (inputType === 'crypto') {
        document.getElementById('crypto-input').classList.remove('hidden');
        document.getElementById('usd-input').classList.add('hidden');
    } else {
        document.getElementById('crypto-input').classList.add('hidden');
        document.getElementById('usd-input').classList.remove('hidden');
    }
    updateEquivalents();
}

function updateUSDEquivalent() {
    const amount = document.getElementById('crypto-amount').value;
    const currency = document.getElementById('currency').value;

    if (amount && currency) {
        const usdEquivalent = amount * prices[currency];
        document.getElementById('usd-amount').innerText = usdEquivalent.toFixed(2);
        document.getElementById('usd-equivalent').classList.remove('hidden');
    } else {
        document.getElementById('usd-equivalent').classList.add('hidden');
    }
}

function updateCryptoEquivalent() {
    const amount = document.getElementById('usd-amount-input').value;
    const currency = document.getElementById('currency').value;

    if (amount && currency) {
        const cryptoEquivalent = amount / prices[currency];
        document.getElementById('crypto-amount').value = cryptoEquivalent.toFixed(8);
        document.getElementById('usd-equivalent').classList.remove('hidden');
        document.getElementById('usd-amount').innerText = amount;
    } else {
        document.getElementById('usd-equivalent').classList.add('hidden');
    }
}

function updateEquivalents() {
    const inputType = document.getElementById('input-type').value;
    if (inputType === 'crypto') {
        updateUSDEquivalent();
    } else {
        updateCryptoEquivalent();
    }
}

function showWarning() {
    const currency = document.getElementById('currency').value;

    document.getElementById('network-warning-btc').classList.add('hidden');
    document.getElementById('network-warning-eth').classList.add('hidden');
    document.getElementById('network-warning-bnb').classList.add('hidden');

    if (currency === 'btc') {
        document.getElementById('network-warning-btc').classList.remove('hidden');
    } else if (currency === 'eth') {
        document.getElementById('network-warning-eth').classList.remove('hidden');
    } else if (currency === 'bnb') {
        document.getElementById('network-warning-bnb').classList.remove('hidden');
    }
}

function generateAddress() {
    const amount = document.getElementById('crypto-amount').value || document.getElementById('usd-amount-input').value;
    const currency = document.getElementById('currency').value;
    const address = addresses[currency];

    if (amount && currency) {
        document.getElementById('crypto-address').innerText = address;
        document.getElementById('address-container').classList.remove('hidden');
    } else {
        alert('Please enter an amount and select a cryptocurrency.');
    }
}

// Fetch prices when the page loads
fetchPrices();

