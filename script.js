// script.js

const addresses = {
    btc: 'your_btc_address_here',
    eth: 'your_eth_address_here',
    bnb: 'your_bnb_address_here'
};

const qrCodes = {
    btc: 'path_to_btc_qr_code_image',
    eth: 'path_to_eth_qr_code_image',
    bnb: 'path_to_bnb_qr_code_image'
};

const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd,cad';

let prices = {
    btc: { usd: 0, cad: 0 },
    eth: { usd: 0, cad: 0 },
    bnb: { usd: 0, cad: 0 }
};

async function fetchPrices() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        prices.btc.usd = data.bitcoin.usd;
        prices.btc.cad = data.bitcoin.cad;
        prices.eth.usd = data.ethereum.usd;
        prices.eth.cad = data.ethereum.cad;
        prices.bnb.usd = data.binancecoin.usd;
        prices.bnb.cad = data.binancecoin.cad;
        
        document.getElementById('btc-price').innerText = `$${prices.btc.usd}`;
        document.getElementById('eth-price').innerText = `$${prices.eth.usd}`;
        document.getElementById('bnb-price').innerText = `$${prices.bnb.usd}`;
    } catch (error) {
        console.error('Error fetching prices:', error);
        document.getElementById('btc-price').innerText = 'Error';
        document.getElementById('eth-price').innerText = 'Error';
        document.getElementById('bnb-price').innerText = 'Error';
    }
}

function toggleInputType() {
    const inputType = document.getElementById('input-type').value;
    const fiatLabel = document.getElementById('fiat-label');

    fiatLabel.innerText = inputType.toUpperCase();
    updateCryptoEquivalent();
}

function updateCryptoEquivalent() {
    const amount = document.getElementById('fiat-amount-input').value;
    const currency = document.getElementById('currency').value;
    const inputType = document.getElementById('input-type').value;

    if (amount && currency) {
        const cryptoEquivalent = amount / prices[currency][inputType];
        document.getElementById('fiat-crypto-conversion').innerText = `= ${cryptoEquivalent.toFixed(8)} ${currency.toUpperCase()}`;
    } else {
        document.getElementById('fiat-crypto-conversion').innerText = '';
    }
}

function generateAddress() {
    const fiatAmount = document.getElementById('fiat-amount-input').value;
    const amount = fiatAmount;
    const currency = document.getElementById('currency').value;
    const address = addresses[currency];
    const qrCode = qrCodes[currency];

    if (amount && currency) {
        document.getElementById('crypto-address').innerText = address;
        document.getElementById('crypto-qr').src = qrCode;
        document.getElementById('crypto-qr').classList.remove('hidden');
        document.getElementById('address-container').classList.remove('hidden');
    } else {
        alert('Please enter an amount and select a cryptocurrency.');
    }
}

// Fetch prices when the page loads
fetchPrices();


