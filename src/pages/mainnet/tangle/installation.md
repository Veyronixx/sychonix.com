---
title: Installation Node
layout: '~/layouts/TestnetLayout.astro'
network: Testnet
icon: tangle
---

- Install Dependencies

<div class="code-block-wrapper">
  <pre><code>sudo apt install -y git clang curl libssl-dev llvm libudev-dev make protobuf-compiler</code></pre>
  <button class="copy-btn" data-target="sudo apt install -y git clang curl libssl-dev llvm libudev-dev make protobuf-compiler"><i class="fas fa-copy"></i></button>
</div>

- Download Binary

<div class="code-block-wrapper">
  <pre><code>cd $HOME
wget -O tangle https://github.com/webb-tools/tangle/releases/download/v1.0.11/tangle-default-linux-amd64
sudo chmod +x tangle
sudo mv tangle /usr/local/bin/
mkdir -p $HOME/.tangle/data</code></pre>
  <button class="copy-btn" data-target="cd $HOME\nwget -O tangle https://github.com/webb-tools/tangle/releases/download/v1.0.11/tangle-default-linux-amd64\nsudo chmod +x tangle\nsudo mv tangle /usr/local/bin/\nmkdir -p $HOME/.tangle/data"><i class="fas fa-copy"></i></button>
</div>

- Create a service

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/tangle.service > /dev/null &lt;&lt;EOF
[Unit]
Description=tangle node service
After=network-online.target
[Service]
User=$USER
Restart=always
RestartSec=3
LimitNOFILE=65535
ExecStart=$(which tangle) start
    --base-path "$HOME/.tangle/data" \
    --chain tangle-mainnet \
    --name "YourName" \
    --telemetry-url "wss://telemetry.polkadot.io/submit/ 1" \
    --validator \
    --no-mdns
[Install]
WantedBy=multi-user.target
EOF</code></pre>
  <button class="copy-btn" data-target="sudo tee /etc/systemd/system/tangle.service > /dev/null &lt;&lt;EOF\n[Unit]\nDescription=tangle node service\nAfter=network-online.target\n[Service]\nUser=$USER\nRestart=always\nRestartSec=3\nLimitNOFILE=65535\nExecStart=$(which tangle) start\n    --base-path \"$HOME/.tangle/data\" \n    --chain tangle-mainnet \n    --name \"YourName\" \n    --telemetry-url \"wss://telemetry.polkadot.io/submit/ 1\" \n    --validator \n    --no-mdns\n[Install]\nWantedBy=multi-user.target\nEOF"><i class="fas fa-copy"></i></button>
</div>

- Enable service

<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable tangle
sudo systemctl start tangle</code></pre>
  <button class="copy-btn" data-target="sudo systemctl daemon-reload\nsudo systemctl enable tangle\nsudo systemctl start tangle"><i class="fas fa-copy"></i></button>
</div>

- Check the logs

<div class="code-block-wrapper">
  <pre><code>sudo journalctl -u tangle -f --no-hostname -o cat</code></pre>
  <button class="copy-btn" data-target="sudo journalctl -u tangle -f --no-hostname -o cat"><i class="fas fa-copy"></i></button>
</div>

Example Output after sync:

```
2024-01-17 15:50:48 ✨ Imported #115248 (0x7a1e…219e)
2024-01-17 15:50:53 💤 Idle (9 peers), best: #115248 (0x7a1e…219e), finalized #115246 (0xa61e…5f6b), ⬇ 436.7kiB/s ⬆ 603.3kiB/s
2024-01-17 15:50:54 ✨ Imported #115249 (0xb687…7b26)
2024-01-17 15:50:54 ♻️  Reorg on #115249,0xb687…7b26 to #115249,0x3787…9cef, common ancestor #115248,0x7a1e…219e
2024-01-17 15:50:54 ✨ Imported #115249 (0x3787…9cef)
2024-01-17 15:50:58 💤 Idle (9 peers), best: #115249 (0x3787…9cef), finalized #115247 (0x9e42…004b), ⬇ 224.4kiB/s ⬆ 771.8kiB/s
2024-01-17 15:51:00 ✨ Imported #115250 (0x7f47…a17d)
2024-01-17 15:51:03 💤 Idle (9 peers), best: #115250 (0x7f47…a17d), finalized #115248 (0x7a1e…219e), ⬇ 437.9kiB/s ⬆ 399.8kiB/s
2024-01-17 15:51:06 ✨ Imported #115251 (0xed59…f167)
2024-01-17 15:51:08 💤 Idle (9 peers), best: #115251 (0xed59…f167), finalized #115249 (0x3787…9cef), ⬇ 243.4kiB/s ⬆ 537.2kiB/s
2024-01-17 15:51:12 ✨ Imported #115252 (0x98ae…797a)
2024-01-17 15:51:13 💤 Idle (9 peers), best: #115252 (0x98ae…797a), finalized #115249 (0x3787…9cef), ⬇ 314.1kiB/s ⬆ 527.8kiB/s
```

Start validating your node by following this [Guide](https://docs.tangle.tools/operators/validator/introduction) 
