---
title: Installation Node

network: Testnet
icon: gaianet
---

- Install GaiaNet node
<div class="code-block-wrapper">
  <pre><code>curl -sSfL 'https://github.com/GaiaNet-AI/gaianet-node/releases/latest/download/install.sh' | bash
source ~/.bashrc</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Init with the Qwen2-0.5B-chat model
<div class="code-block-wrapper">
  <pre><code>gaianet init --config https://raw.githubusercontent.com/GaiaNet-AI/node-configs/main/qwen2-0.5b-instruct/config.json</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

- Start the node
<div class="code-block-wrapper">
  <pre><code>gaianet start
gaianet info</code></pre>
  <button class="copy-btn"><i class="fas fa-copy"></i></button>
</div>

join our domain sychonix.gaia.domains
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
