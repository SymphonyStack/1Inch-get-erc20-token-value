import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

async function getProfitAndLoss(walletAddress, chainId, fromTimestamp, toTimestamp, apiKey) {
    const endpoint = `https://api.1inch.dev/portfolio/portfolio/v4/overview/erc20/profit_and_loss?addresses=${walletAddress}&chain_id=${chainId}&from_timestamp=${fromTimestamp}&to_timestamp=${toTimestamp}`;
    try {
        const response = await fetch(endpoint, {
            headers: { Authorization: `Bearer ${apiKey}` }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profit and loss:', error);
        throw error;
    }
}

function getTimestamps(hours) {
    const toTimestamp = Math.floor(Date.now() / 1000);
    const fromTimestamp = toTimestamp - (hours * 3600);
    return { fromTimestamp, toTimestamp };
}

const [walletAddress, chainId, hours, apiKey] = process.argv.slice(2);
const { fromTimestamp, toTimestamp } = getTimestamps(Number(hours));

(async() => {
    try {
        const data = await getProfitAndLoss(walletAddress, chainId, fromTimestamp, toTimestamp, apiKey);
        console.log(data.result);
        let abs_return = 0
        let abs_roi = 0
        for (let i = 0; i < data.result.length; i++) {
            let protocol = data.result[i]
            if (Number(protocol.chain_id) === Number(chainId)) {
                abs_return += protocol.abs_profit_usd
                abs_roi += protocol.roi
            }
        }
        console.log("##" + JSON.stringify({ status: 200, message: "Absolute returns fetched successfully", absolute_returns: abs_return, absolute_roi: abs_roi }) + "##")
    } catch (error) {
        console.error('Error:', error);
    }
})();