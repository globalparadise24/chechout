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
    const cryptoLabel = document.getElementById('crypto-label');
    const cryptoAmount = document.getElementById('crypto-amount');
    const cryptoConversion = document.getElementById('crypto-usd-conversion');
    const usdAmount = document.getElementById('usd-amount-input');
    const usdConversion = document.getElementById('usd-crypto-conversion');

    if (inputType === 'btc' || inputType === 'eth' || inputType === 'bnb') {
        cryptoLabel.innerText = inputType.toUpperCase();
        document.getElementById('crypto-input').classList.remove('hidden');
        document.getElementById('usd-input').classList.add('hidden');
        updateUSDEquivalent();
    } else {
        document.getElementById('crypto-input').classList.add('hidden');
        document.getElementById('usd-input').classList.remove('hidden');
        updateCryptoEquivalent();
    }
}

function updateUSDEquivalent() {
    const amount = document.getElementById('crypto-amount').value;
    const inputType = document.getElementById('input-type').value;

    if (amount && inputType) {
        const usdEquivalent = amount * prices[inputType];
        document.getElementById('crypto-usd-conversion').innerText = `= $${usdEquivalent.toFixed(2)}`;
    } else {
        document.getElementById('crypto-usd-conversion').innerText = '';
    }
}

function updateCryptoEquivalent() {
    const amount = document.getElementById('usd-amount-input').value;
    const currency = document.getElementById('currency').value;

    if (amount && currency) {
        const cryptoEquivalent = amount / prices[currency];
        document.getElementById('usd-crypto-conversion').innerText = `= ${cryptoEquivalent.toFixed(8)} ${currency.toUpperCase()}`;
    } else {
        document.getElementById('usd-crypto-conversion').innerText = '';
    }
}

function updateEquivalents() {
    const inputType = document.getElementById('input-type').value;
    if (inputType === 'btc' || inputType === 'eth' || inputType === 'bnb') {
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
    const cryptoAmount = document.getElementById('crypto-amount').value;
    const usdAmount = document.getElementById('usd-amount-input').value;
    const amount = cryptoAmount || usdAmount;
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

