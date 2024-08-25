---
title: Installation Node
layout: '~/layouts/TestnetLayout.astro'
network: Testnet
icon: chainflip
---

- Adding Chainflip APT Repo

<div class="code-block-wrapper">
  <pre><code>sudo mkdir -p /etc/apt/keyrings
curl -fsSL repo.chainflip.io/keys/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/chainflip.gpg</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Verify the key's authenticity:
<div class="code-block-wrapper">
  <pre><code>gpg --show-keys /etc/apt/keyrings/chainflip.gpg</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

Important: Make sure you see the following output from the terminal:
<div class="code-block-wrapper">
  <pre><code>pub rsa3072 2022-11-08 [SC] [expires: 2024-11-07]
BDBC3CF58F623694CD9E3F5CFB3E88547C6B47C6
uid Chainflip Labs GmbH &lt;dev@chainflip.io&gt;
sub rsa3072 2022-11-08 [E] [expires: 2024-11-07]</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
After that, add Chainflip's Repo to apt sources list:
<div class="code-block-wrapper">
  <pre><code>echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/chainflip.gpg] https://repo.chainflip.io/perseverance/$(lsb_release -c -s) $(lsb_release -c -s) main" | sudo tee /etc/apt/sources.list.d/chainflip.list</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Installing The Packages
<div class="code-block-wrapper">
  <pre><code>sudo apt update
sudo apt install -y chainflip-cli chainflip-node chainflip-engine1.1</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Generating Validator Keys
<div class="code-block-wrapper">
  <pre><code>chainflip-cli generate-keys --path /etc/chainflip/keys</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
Make sure to back up your Seed Phrase and make a note of the public keys and account ID. You will need the Seed Phrase if you ever need to restore your node or recover your funds if you lose access to the node. DO NOT LOSE THIS.**
And you must ensure that the public Ethereum address generated above has at least 0.1 gETH. Make sure you send 0.1 gETH to this account's address before trying to add funds to your validator node

- Create the engine config file

Replace IP_ADDRESS_OF_YOUR_NODE with your server's public IP Address.
Additionally, provide the ws_endpoint and http_endpoint specific to your chosen Ethereum client. The format varies based on the client you're using.
```
# Default configurations for the CFE
[node_p2p]
node_key_file = "/etc/chainflip/keys/node_key_file"
ip_address = "IP_ADDRESS_OF_YOUR_NODE"
port = "8078"
 
[state_chain]
ws_endpoint = "ws://127.0.0.1:9944"
signing_key_file = "/etc/chainflip/keys/signing_key_file"
 
[eth]
# Ethereum private key file path. This file should contain a hex-encoded private key.
private_key_file = "/etc/chainflip/keys/ethereum_key_file"
 
[eth.rpc]
ws_endpoint = "wss://my_local_geth_node:8546"
http_endpoint = "https://my_local_geth_node:8545"
 
# Optional
# [eth.backup_rpc]
# ws_endpoint = "wss://some_public_rpc.com:443/<secret_access_key>"
# http_endpoint = "https://some_public_rpc.com:443/<secret_access_key>"
 
[dot.rpc]
ws_endpoint = "wss://rpc-pdot.chainflip.io:443"
http_endpoint = "https://rpc-pdot.chainflip.io:443"
 
# Optional
# [dot.backup_rpc]
# ws_endpoint = "wss://rpc-pdot2.chainflip.io:443"
# http_endpoint = "https://rpc-pdot2.chainflip.io:443"
 
[btc.rpc]
basic_auth_user = "flip"
basic_auth_password = "flip"
http_endpoint = "http://a108a82b574a640359e360cf66afd45d-424380952.eu-central-1.elb.amazonaws.com"
 
# Optional
# [btc.backup_rpc]
# basic_auth_user = "flip2"
# basic_auth_password = "flip2"
# http_endpoint = "http://second-node-424380952.eu-central-1.elb.amazonaws.com"
 
# Optional (default: 36079)
# [logging]
# command_server_port = 36079
```

- Start the Node
<div class="code-block-wrapper">
  <pre><code>sudo systemctl start chainflip-node</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
check the service status 
<div class="code-block-wrapper">
  <pre><code>systemctl status chainflip-node</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
At this point, you will need to wait for your node to catch up with the latest block. You can find the latest block on our [Block Explorer](https://blocks-perseverance.chainflip.io/)

- Check the Node:
<div class="code-block-wrapper">
  <pre><code>journalctl -f -u chainflip-node.service</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>
The node will ouput the following when started:

```
2023-03-24 08:21:30 💻 Memory: 7957MB
2023-03-24 08:21:30 💻 Kernel: 5.4.0-122-generic
2023-03-24 08:21:30 💻 Linux distribution: Ubuntu 20.04.4 LTS
2023-03-24 08:21:30 💻 Virtual machine: yes
2023-03-24 08:21:30 📦 Highest known block at #0
2023-03-24 08:21:30 〽️ Prometheus exporter started at 127.0.0.1:9615
2023-03-24 08:21:30 Running JSON-RPC HTTP server: addr=127.0.0.1:9933, allowed origins=Some(["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"])
2023-03-24 08:21:30 Running JSON-RPC WS server: addr=127.0.0.1:9944, allowed origins=Some(["http://localhost:*", "http://127.0.0.1:*", "https://localhost:*", "https://127.0.0.1:*", "https://polkadot.js.org"])
2023-03-24 08:21:30 🔍 Discovered new external address for our node: /ip4/178.128.36.211/tcp/30333/p2p/12D3KooWMDs3oyT2YpQw88V7TdmN1dJa73D1jrfQorLaBovh7Kim
2023-03-24 08:21:35 ⏩ Warping, Downloading finality proofs, 7.99 Mib (10 peers), best: #0 (0x2d00…c9b3), finalized #0 (0x2d00…c9b3), ⬇ 1.6MiB/s ⬆ 27.8kiB/s
2023-03-24 08:21:40 ⏩ Warping, Downloading finality proofs, 15.97 Mib (14 peers), best: #0 (0x2d00…c9b3), finalized #0 (0x2d00…c9b3), ⬇ 1.7MiB/s ⬆ 25.8kiB/s
2023-03-24 08:21:45 ⏩ Warping, Downloading finality proofs, 23.97 Mib (16 peers), best: #0 (0x2d00…c9b3), finalized #0 (0x2d00…c9b3), ⬇ 1.7MiB/s ⬆ 24.6kiB/s
```

- Restart the Node
<div class="code-block-wrapper">
  <pre><code>sudo systemctl restart chainflip-node</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Check Node Logs
<div class="code-block-wrapper">
  <pre><code>sudo journalctl -u chainflip-node -f</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

after all is done Funding & Bidding your account by following the instructions [here](https://docs.chainflip.io/testnet/funding/funding-and-bidding)
