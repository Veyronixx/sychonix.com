---
title: Installation Node

network: Testnet
icon: gaianet
---

- Create t3rn directory
<div class="code-block-wrapper">
  <pre><code>mkdir t3rn
cd t3rn</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Download Binary
<div class="code-block-wrapper">
  <pre><code>curl -s https://api.github.com/repos/t3rn/executor-release/releases/latest | \
grep -Po '"tag_name": "\K.*?(?=")' | \
xargs -I {} wget https://github.com/t3rn/executor-release/releases/download/{}/executor-linux-{}.tar.gz
</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Extract the archive
<div class="code-block-wrapper">
  <pre><code>tar -xzf executor-linux-*.tar.gz
</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Configure RPC URL
```
echo 'RPC_ENDPOINTS="{\"l2rn\": [\"https://b2n.rpc.caldera.xyz/http\"], \"arbt\": [\"https://arbitrum-sepolia.drpc.org\", \"https://sepolia-rollup.arbitrum.io/rpc\"], \"bast\": [\"https://base-sepolia-rpc.publicnode.com\", \"https://base-sepolia.drpc.org\"], \"opst\": [\"https://sepolia.optimism.io\", \"https://optimism-sepolia.drpc.org\"], \"unit\": [\"https://unichain-sepolia.drpc.org\", \"https://sepolia.unichain.org\"]}"' | sudo tee /etc/t3rn-executor.env > /dev/null
```

- Create a service
<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/t3rn-executor.service > /dev/null &lt;&lt;EOF
[Unit]
Description=t3rn Executor Service
After=network.target
[Service]
User=root
WorkingDirectory=/root/t3rn/executor/executor/bin
ExecStart=/root/t3rn/executor/executor/bin/executor
Restart=always
RestartSec=10
Environment=ENVIRONMENT=testnet
Environment=LOG_LEVEL=debug
Environment=LOG_PRETTY=false
Environment=EXECUTOR_PROCESS_BIDS_ENABLED=true
Environment=EXECUTOR_PROCESS_ORDERS_ENABLED=true
Environment=EXECUTOR_PROCESS_CLAIMS_ENABLED=true
Environment=EXECUTOR_MAX_L3_GAS_PRICE=100
Environment=PRIVATE_KEY_LOCAL=your_private_key
Environment=ENABLED_NETWORKS=arbitrum-sepolia,base-sepolia,optimism-sepolia,l2rn
EnvironmentFile=/etc/t3rn-executor.env
Environment=EXECUTOR_PROCESS_PENDING_ORDERS_FROM_API=true
[Install]
WantedBy=multi-user.target
EOF</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Enable and Start the t3rn Executor Node Service
<div class="code-block-wrapper">
  <pre><code>sudo systemctl daemon-reload
sudo systemctl enable t3rn-executor.service
sudo systemctl start t3rn-executor.service</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Check Logs
<div class="code-block-wrapper">
  <pre><code>sudo journalctl -u t3rn-executor.service -f --no-hostname -o cat</code></pre>
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
