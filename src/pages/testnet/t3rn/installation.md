---
title: Installation Node

network: Testnet
icon: gaianet
---

- Download Binary
<div class="code-block-wrapper">
  <pre><code>curl -L -o executor-linux-v0.27.0.tar.gz https://github.com/t3rn/executor-release/releases/download/v0.27.0/executor-linux-v0.27.0.tar.gz && tar -xzvf executor-linux-v0.27.0.tar.gz && rm -rf executor-linux-v0.27.0.tar.gz && cd executor/executor/bin</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Create a service
<div class="code-block-wrapper">
  <pre><code>sudo tee /etc/systemd/system/t3rn-executor.service > /dev/null &lt;&lt;EOF
[Unit]
Description=t3rn Executor Service
After=network.target
[Service]
ExecStart=$HOME/executor/executor/bin/executor
Environment="NODE_ENV=testnet"
Environment="LOG_LEVEL=debug"
Environment="LOG_PRETTY=false"
Environment="PRIVATE_KEY_LOCAL=0xYour_private_keys"
Environment="ENABLED_NETWORKS=arbitrum-sepolia,base-sepolia,optimism-sepolia,l1rn"
Environment="EXECUTOR_PROCESS_PENDING_ORDERS_FROM_API=false"
Restart=always
RestartSec=5
User=testnet
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
