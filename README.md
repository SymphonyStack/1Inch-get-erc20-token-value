# 1Inch-get-erc20-token-value
1Inch-get-erc20-token-value

inputs: walletaddress, chainID, 1inch api key outputs: status, message, portfolio_value

returns the absolute_returns and absolute_roi in usd for a user on a chain

"output":[
      {
        "name":"status",
        "type":"string",
    },
    {
        "name":"message",
        "type":"string",
    },
    {
        "name":"absolute_returns",
        "type":"number",
    },
    {
        "name":"absolute_roi",
        "type":"number",
    }
]

"input": [
    {
      "name": "wallet_address",
      "type": "string",
      "label": "Wallet Address"
    },
    {
      "name": "chain_id",
      "type": "string",
      "label": "Chain ID"
    },
    {
      "name": "hours",
      "type": "string",
      "label": "hours"
    },
    {
      "name": "oneInch_API_key",
      "type": "string",
      "label": "One Inch API key"
    }
  ],