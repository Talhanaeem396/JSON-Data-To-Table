document.addEventListener("DOMContentLoaded", async () => {
    const cryptoapi = 'https://api.coincap.io/v2/assets'; //This is the APi for Crypto
    const currencyapi = 'https://open.er-api.com/v6/latest/USD'; //This is the APi for Crypto

    const fetchJson = async (url) => (await fetch(url)).json(); 

    const cryptodata = (await fetchJson(cryptoapi)).data.slice(0, 25); //Fetching Top 25 Currencies
    const rates = (await fetchJson(currencyapi)).rates; //Fetching Rates

    const tableBody = document.querySelector("#table tbody");
    tableBody.innerHTML = cryptodata.map(crypto => {
        const usd = parseFloat(crypto.priceUsd).toFixed(2); //USD Price round of by 2
        const gbp = (usd * rates.GBP).toFixed(2); //Converting USD Price to GBP and round of by 2
        const eur = (usd * rates.EUR).toFixed(2); //Converting USD Price to EUR and round of by 2
        const aed = (usd * rates.AED).toFixed(2); //Converting USD Price to AED and round of by 2

        //Returning Data to Table
        return `
            <tr> 
                <td>${crypto.rank}</td>
                <td>${crypto.id}</td>
                <td>${crypto.symbol}</td>
                <td><a href="https://coincap.io/assets/${crypto.id}" target="_blank">Link</a></td>
                <td>$${usd}</td>
                <td>£${gbp}</td>
                <td>€${eur}</td>
                <td>AED ${aed}</td>
            </tr>
        `;
    }).join('');
});
