---
title: Installation Node

network: Testnet
chain id: dancebox
icon: tanssi
---

- Update and install packages

<div class="code-block-wrapper">
  <pre><code>apt update && apt upgrade -y
apt install curl iptables build-essential git wget jq make gcc nano tmux htop nvme-cli pkg-config libssl-dev libleveldb-dev libgmp3-dev tar clang bsdmainutils ncdu unzip llvm libudev-dev make protobuf-compiler -y</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Binary

<div class="code-block-wrapper">
  <pre><code>wget https://github.com/moondance-labs/tanssi/releases/download/v0.5.1/tanssi-node && \
chmod +x ./tanssi-node</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create tanssi-data

<div class="code-block-wrapper">
  <pre><code>adduser tanssi_service --system --no-create-home
mkdir /var/lib/tanssi-data
sudo chown -R tanssi_service /var/lib/tanssi-data
mv ./tanssi-node /var/lib/tanssi-data</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create a Systemd Service

<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/tanssi.service > /dev/null &lt;&lt; EOF
[Unit]
Description="Tanssi systemd service"
After=network.target
StartLimitIntervalSec=0
[Service]
Type=simple
Restart=on-failure
RestartSec=10
User=tanssi_service
SyslogIdentifier=tanssi
SyslogFacility=local7
KillSignal=SIGHUP
ExecStart=/var/lib/tanssi-data/tanssi-node \
--chain=dancebox \
--name=YOUR_NODE_NAME \
--sync=warp \
--base-path=/var/lib/tanssi-data/para \
--state-pruning=2000 \
--blocks-pruning=2000 \
--collator \
--telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \
--database paritydb \
-- \
--name=tanssi-appchain \
--base-path=/var/lib/tanssi-data/container \
--telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \
-- \
--chain=westend_moonbase_relay_testnet \
--name=YOUR_NODE_NAME \
--sync=fast \
--base-path=/var/lib/tanssi-data/relay \
--state-pruning=2000 \
--blocks-pruning=2000 \
--telemetry-url='wss://telemetry.polkadot.io/submit/ 0' \
--database paritydb \
[Install]
WantedBy=multi-user.target
EOF</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable service and Start the Node

<div class="code-block-wrapper">
  <pre><code>systemctl enable tanssi.service
systemctl daemon-reload
systemctl restart tanssi.service && journalctl -f -u tanssi.service</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create new wallet

<div class="code-block-wrapper">
  <pre><code>./tanssi-node key generate -w24</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll('.code-block-wrapper').forEach(wrapper => {
        const button = wrapper.querySelector('.copy-btn');
        const code = wrapper.querySelector('pre code');
    
        if (button && code) {
          button.addEventListener('click', () => {
            // Gunakan navigator.clipboard.writeText untuk metode yang lebih modern
            navigator.clipboard.writeText(code.textContent)
              .then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => button.innerHTML = '<i class="fas fa-copy"></i>', 2000);
              })
              .catch(err => {
                console.error('Failed to copy: ', err);
                // Untuk fallback jika navigator.clipboard.writeText gagal
                const range = document.createRange();
                range.selectNode(code);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => button.innerHTML = '<i class="fas fa-copy"></i>', 2000);
              });
          });
        }
      });
    });
    </script>
