---
layout: '~/layouts/TestnetLayout.astro'
title: CLI Cheatsheet
icon : selfchain
---
<!--
please modify this according to the chain
node name and icon : selfchain
chain id : self-1
Binary Name : selfchaind
Binary Home : $HOME/.selfchain
Staking Denom : uslf
systemd name : selfchaind 
-->

<style>
  .my-pre {
    background-color: #111827;
    color: #c9d1d9;
    font-size: 15px;
    padding: 10px;
    position: relative;
  }

  .input-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .input-col {
    width: 48%;
  }

  .input-group {
    margin-bottom: 20px;
  }

  .input-group label {
    display: block;
    margin-bottom: 5px;
  }

  .input-group input {
    background-color: #0f172a;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 0.5rem; /* 8px */
    font-size: 13px;
  }

  .input-group input:focus {
    outline: none;
    border-color: rgb(0, 0, 0);
  }

  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-color: rgb(45, 212, 191);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .popup-content {
    background-color: black;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    font-size: 16px;
    max-width: 80%;
    max-height: 80%;
    overflow: auto;
    color: black;
  }

  .closebtn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }

  .input-moci {
    width: calc(50% - 20px);
    margin-bottom: 20px;
  }

  .input-moci label {
    display: block;
    margin-bottom: 5px;
  }

  .input-moci input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }
.copy-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: #1f2937;
  color: white;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.copy-btn:before {
  content: '\f0c5'; /* Kode ikon salin dari Font Awesome */
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
}

.copy-btn.show-check:before {
  content: '\f00c'; /* Kode ikon centang dari Font Awesome */
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
}
  h3[for="iwallet"],
  h3[for="imoniker"] {
    color: #e5e5e5; /* Warna teks */
    font-size: 1.3rem; /* Ukuran teks */
  }

.copy-btn i {
  font-size: 0.75rem;
}

.copy-btn.hidden {
  display: none;
}
  .input-group input::placeholder {
    color: #cbd5e1; /* Warna teks placeholder */
    font-size: 13px; /* Ukuran teks placeholder */
  }

</style>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

<h3 for="iwallet">Wallet Management</h3>
<div class="input-group">
  <input id="iwallet" type="text" placeholder="Enter wallet name" oninput="updatePre()" />
</div>

<label for="iwallet" style="vertical-align: top;">• Create New Wallet</label>
<pre class="my-pre" id="pre1" style="margin-top: 5px;">selfchaind keys add <span class="rwallet1"></span> 
  <button class="copy-btn" id="copy1" data-clipboard-text="" onclick="copyText(1)"></button>
</pre>

<label for="iwallet" style="vertical-align: top;">• Recovery New Wallet</label>
<pre class="my-pre" id="pre2" style="margin-top: 5px;">selfchaind keys add <span class="rwallet2"></span> --recover  
  <button class="copy-btn" id="copy2" data-clipboard-text="" onclick="copyText(2)"></button>
</pre>

<label for="iwallet" style="vertical-align: top;">• List All Wallet</label>
<pre class="my-pre" id="pre3" style="margin-top: 5px;">selfchaind keys list <span class="rwallet3"></span> 
  <button class="copy-btn" id="copy3" data-clipboard-text="" onclick="copyText(3)"></button>
</pre>

<label for="iwallet" style="vertical-align: top;">• Delete Wallet</label>
<pre class="my-pre" id="pre4">selfchaind keys delete <span class="rwallet4"></span> 
  <button class="copy-btn" id="copy4" data-clipboard-text="" onclick="copyText(4)"></button>
</pre>

<label for="iwallet" style="vertical-align: top;">• Export Wallet</label>
<pre class="my-pre" id="pre5">selfchaind keys export <span class="rwallet5"></span> 
  <button class="copy-btn" id="copy5" data-clipboard-text="" onclick="copyText(5)"></button>
</pre>

<label for="iwallet" style="vertical-align: top;">• Import key</label>
<pre class="my-pre" id="pre6">selfchaind keys import <span class="rwallet6"></span>.backup 
  <button class="copy-btn" id="copy6" data-clipboard-text="" onclick="copyText(6)"></button>
</pre>

<label for="iwallet" style="vertical-align: top;">• Check balance</label>
<pre class="my-pre" id="pre7">selfchaind q bank balances $(selfchaind keys show <span class="rwallet7"></span> -a)
  <button class="copy-btn" id="copy7" data-clipboard-text="" onclick="copyText(7)"></button>
</pre>

<h3 for="imoniker">Validator Management</h3>
<label for="ivalidator" style="vertical-align: top;">• Create New Validator</label>
<div class="input-row">
  <!-- Col 1 -->
  <div class="input-col">
    <div class="input-group">
      <label for="imoniker">Moniker</label>
      <input id="imoniker" type="text" placeholder="Enter Moniker" oninput="updatePre()" />
    </div>
    <div class="input-group">
      <label for="iidentity">Identity</label>
      <input id="iidentity" type="text" placeholder="Enter Identity" oninput="updatePre()" />
    </div>
    <div class="input-group">
      <label for="idetails">Details</label>
      <input id="idetails" type="text" placeholder="Enter Details" oninput="updatePre()" />
    </div>
  </div>
  <!-- Col 2 -->
  <div class="input-col">
    <div class="input-group">
      <label for="iwebsite">Website</label>
      <input id="iwebsite" type="text" placeholder="Enter Website" oninput="updatePre()" />
    </div>
    <div class="input-group">
      <label for="icontact">Contact</label>
      <input id="icontact" type="text" placeholder="Enter Contact" oninput="updatePre()" />
    </div>
    <div class="input-group">
      <label for="iamount">Amount</label>
      <input id="iamount" type="text" placeholder="Enter Amount" oninput="updatePre()" />
    </div>
    <div class="input-group">
      <label for="icommission">Commission</label>
      <input id="icommission" type="text" placeholder="Enter Commission" oninput="updatePre()" />
    </div>
  </div>
</div>

<pre class="my-pre" id="pre8">
selfchaind tx staking create-validator \
--amount=<span class="ramount1"></span>0000000uslf \
--moniker="<span class="rmoniker1"></span>" \
--pubkey=$(selfchaind tendermint show-validator) \
--identity="<span class="ridentity1"></span>" \
--details="<span class="rdetails1"></span>" \
--website="<span class="rwebsite1"></span>" \
--security-contact=<span class="rcontact1"></span> \
--chain-id=self-1 \
--commission-rate=<span class="rcommission1"></span> \
--commission-max-rate=0.20 \
--commission-max-change-rate=0.01 \
--min-self-delegation=1 \
--from=<span class="rwallet8"></span> \
--gas=auto  \
--gas-prices="0uslf"<button class="copy-btn" id="copy8" data-clipboard-text="" onclick="copyText(8)"></button>
</pre>


<label for="imoniker">• Edit Validator</label>
<div class="container">
  <div class="input-group">
    <label for="ieditmoniker">New Moniker</label>
    <input id="ieditmoniker" type="text" placeholder="Enter New Moniker" oninput="updatePre()" />
  </div>
  <div class="input-group">
    <label for="ieditidentity">New identity</label>
    <input id="ieditidentity" type="text" placeholder="Enter New identity" oninput="updatePre()" />
  </div>
  <div class="input-group">
    <label for="ieditdetails">New Details</label>
    <input id="ieditdetails" type="text" placeholder="Enter New Details" oninput="updatePre()" />
  </div>
  <div class="input-group">
    <label for="ieditweb">New Website</label>
    <input id="ieditweb" type="text" placeholder="Enter New Website" oninput="updatePre()" />
  </div>
</div>

<pre class="my-pre" id="pre9">
selfchaind tx staking edit-validator \
--new-moniker="<span class="reditmoniker1"></span>" \
--identity="<span class="reditidentity1"></span>" \
--details="<span class="reditdetails1"></span>" \
--website="<span class="reditweb1"></span>" \
--chain-id=self-1 \
--commission-rate=0.07 \
--from=<span class="rwallet9"></span> \
--gas=auto  \
--gas-prices="0uslf"<button class="copy-btn" id="copy9" data-clipboard-text="" onclick="copyText(9)"></button>
</pre>

<label for="iwallet" style="vertical-align: top;">• Unjail Validator</label>
<pre class="my-pre" id="pre10">
selfchaind tx slashing unjail --from <span class="rwallet10"></span> --chain-id self-1 --gas-prices 0.00025uslf --gas-adjustment 1.5 --gas auto -y<button class="copy-btn" id="copy10" data-clipboard-text="" onclick="copyText(10)"></button>
</pre>

<label for="iwallet" style="vertical-align: top;">• Jail Reason</label>
<pre class="my-pre" id="pre11">
selfchaind query slashing signing-info $(selfchaind tendermint show-validator)<button class="copy-btn" id="copy11" data-clipboard-text="" onclick="copyText(11)"></button>
</pre>

<label for="iwallet" style="vertical-align: top;">• View validator details</label>
<pre class="my-pre" id="pre12">
selfchaind q staking validator $(selfchaind keys show <span class="rwallet11"></span> --bech val -a) <button class="copy-btn" id="copy12" data-clipboard-text="" onclick="copyText(12)"></button>
</pre>

<h3 for="imoniker">Token Management</h3>
<label for="ivalidator" style="vertical-align: top;">• Withdraw rewards from all validators</label>
<pre class="my-pre" id="pre13">
selfchaind tx distribution withdraw-all-rewards --from <span class="rwallet12"></span> --chain-id self-1 --gas=auto  --gas-prices="0uslf" <button class="copy-btn" id="copy13" data-clipboard-text="" onclick="copyText(13)"></button>
</pre>

<label for="ivalidator" style="vertical-align: top;">• Withdraw commission and rewards from your validator</label>
<pre class="my-pre" id="pre14">selfchaind tx distribution withdraw-rewards $(selfchaind keys show <span class="rwallet13"></span> --bech val -a) --commission --from <span class="rwallet14"></span> --chain-id self-1 --gas=auto --gas-prices="0uslf"  <button class="copy-btn" id="copy14" data-clipboard-text="" onclick="copyText(14)"></button>
</pre>

<div class="input-group">

<label for="idelegetet" style="vertical-align: top;">• Delegate tokens to yourself</label>
  <input id="idelegete" type="text" placeholder="Enter Amount" oninput="updatePre()" />
</div>
 <pre class="my-pre" id="pre15" style="margin-top: 5px;">selfchaind tx staking delegate $(selfchaind keys show <span class="rwallet15"></span> --bech val -a) <span class="rdelegete1"></span>00000000uslf --from <span class="rwallet16"></span> --chain-id self-1 --gas=auto  --gas-prices="0uslf"  <button class="copy-btn" id="copy15" data-clipboard-text="" onclick="copyText(15)"></button>
</pre>

 <div class="input-group">

<label for="iredelegetet" style="vertical-align: top;">• Redelegate tokens to another validator</label>
  <input id="iredelegete" type="text" placeholder="Enter <TO_VALOPER_ADDRESS>" oninput="updatePre()" />
</div>
 <pre class="my-pre" id="pre16" style="margin-top: 5px;">selfchaind tx staking redelegate $(selfchaind keys show <span class="rwallet17"></span> --bech val -a) <span class="rredelegete1"></span> <span class="rdelegete2"></span>00000000uslf --from <span class="rwallet18"></span> --chain-id self-1 --gas=auto  --gas-prices="0uslf" <button class="copy-btn" id="copy16" data-clipboard-text="" onclick="copyText(16)"></button>
</pre>

<label for="iredelegetet" style="vertical-align: top;">• Delegate tokens to validator</label>
 <pre class="my-pre" id="pre17" style="margin-top: 5px;"> selfchaind tx staking delegate <span class="rredelegete2"></span> <span class="rdelegete3"></span>00000000uslf --from <span class="rwallet19"></span> --chain-id self-1 --gas=auto  --gas-prices="0uslf" <button class="copy-btn" id="copy17" data-clipboard-text="" onclick="copyText(17)"></button>
</pre>

<label for="iredelegetet" style="vertical-align: top;">• Unbond tokens from your validator</label>
 <pre class="my-pre" id="pre18" style="margin-top: 5px;">selfchaind tx staking unbond $(selfchaind keys show <span class="rwallet20"></span> --bech val -a) <span class="rdelegete4"></span>00000000uslf --from <span class="rwallet21"></span> --chain-id self-1 --gas=auto  --gas-prices="0uslf"<button class="copy-btn" id="copy18" data-clipboard-text="" onclick="copyText(18)"></button>
</pre>


<div class="input-group">
  <label for="idelegetet" style="vertical-align: top;">• Send tokens to Any wallet</label>
  <input id="itoken" type="text" placeholder="Enter Address Wallet" oninput="updatePre()" />
</div>
<pre class="my-pre" id="pre19" style="margin-top: 5px;">
selfchaind tx bank send<span class="rwallet22"></span> <span class="rtoken1"></span> <span class="rdelegete5"></span>000000000uslf --from <span class="rwallet23"></span> --chain-id self-1 --gas=auto  --gas-prices="0uslf"<button class="copy-btn" id="copy19" data-clipboard-text="" onclick="copyText(19)"></button>
</pre>



<h4 for="iwallet" style="color: white;">• Custom Port</h4>
<div class="input-group ">
  <input id="iport" type="text" placeholder="Enter Custom Port" oninput="updatePre()" />
</div>
 <pre class="my-pre" id="pre20" style="margin-top: 5px;">CUSTOM_PORT=<span class="rport1"></span>
sed -i.bak -e "s%^proxy_app = \"tcp://127.0.0.1:26658\"%proxy_app = \"tcp://127.0.0.1:${CUSTOM_PORT}658\"%; s%^laddr = \"tcp://127.0.0.1:26657\"%laddr = \"tcp://127.0.0.1:${CUSTOM_PORT}657\"%; s%^pprof_laddr = \"localhost:6060\"%pprof_laddr = \"localhost:${CUSTOM_PORT}060\"%; s%^laddr = \"tcp://0.0.0.0:26656\"%laddr = \"tcp://0.0.0.0:${CUSTOM_PORT}656\"%; s%^prometheus_listen_addr = \":26660\"%prometheus_listen_addr = \":${CUSTOM_PORT}660\"%" $HOME/.selfchain/config/config.toml
sed -i.bak -e "s%^address = \"tcp://0.0.0.0:1317\"%address = \"tcp://0.0.0.0:${CUSTOM_PORT}317\"%; s%^address = \":8080\"%address = \":${CUSTOM_PORT}080\"%; s%^address = \"0.0.0.0:9090\"%address = \"0.0.0.0:${CUSTOM_PORT}090\"%; s%^address = \"0.0.0.0:9091\"%address = \"0.0.0.0:${CUSTOM_PORT}091\"%" $HOME/.selfchain/config/app.toml<button class="copy-btn"  id="copy20" data-clipboard-text="" onclick="copyText(20)"></button>
</pre>  </div>
 </div>

<label for="iwallet" style="vertical-align: top;">• Remove Node</label>
<pre class="my-pre" id="pre21">sudo systemctl stop selfchaind && sudo systemctl disable selfchaind && sudo rm /etc/systemd/system/selfchaind.service && sudo systemctl daemon-reload && rm -rf $HOME/.selfchain && rm -rf self-1 && sudo rm -rf $(which selfchaind)<button class="copy-btn" id="copy21" data-clipboard-text="" onclick="copyText(21)"></button>


<script>
  function updatePre() {
    const walletInput = document.getElementById('iwallet').value.trim();
    document.querySelector('.rwallet1').textContent = walletInput;
    document.querySelector('.rwallet2').textContent = walletInput;
    document.querySelector('.rwallet3').textContent = walletInput;
    document.querySelector('.rwallet4').textContent = walletInput;
    document.querySelector('.rwallet5').textContent = walletInput;
    document.querySelector('.rwallet6').textContent = walletInput;
    document.querySelector('.rwallet7').textContent = walletInput;
    document.querySelector('.rwallet8').textContent = walletInput;
    document.querySelector('.rwallet9').textContent = walletInput;
    document.querySelector('.rwallet10').textContent = walletInput;
    document.querySelector('.rwallet11').textContent = walletInput;
    document.querySelector('.rwallet12').textContent = walletInput;
    document.querySelector('.rwallet13').textContent = walletInput;
    document.querySelector('.rwallet14').textContent = walletInput;
     document.querySelector('.rwallet15').textContent = walletInput;
      document.querySelector('.rwallet16').textContent = walletInput;
        document.querySelector('.rwallet17').textContent = walletInput;
          document.querySelector('.rwallet18').textContent = walletInput;
          document.querySelector('.rwallet19').textContent = walletInput;
          document.querySelector('.rwallet20').textContent = walletInput;
          document.querySelector('.rwallet21').textContent = walletInput;
          document.querySelector('.rwallet22').textContent = walletInput;
          document.querySelector('.rwallet23').textContent = walletInput;

    const monikerInput = document.getElementById('imoniker').value.trim();
    document.querySelector('.rmoniker1').textContent = monikerInput;

     const identityInput = document.getElementById('iidentity').value.trim();
    document.querySelector('.ridentity1').textContent = identityInput;
   
   const detailsInput = document.getElementById('idetails').value.trim();
    document.querySelector('.rdetails1').textContent = detailsInput;

    const websiteInput = document.getElementById('iwebsite').value.trim();
    document.querySelector('.rwebsite1').textContent = websiteInput;

    const contactInput = document.getElementById('icontact').value.trim();
    document.querySelector('.rcontact1').textContent = contactInput;

    const amountInput = document.getElementById('iamount').value.trim();
    document.querySelector('.ramount1').textContent = amountInput;
    
    const commissionInput = document.getElementById('icommission').value.trim();
    document.querySelector('.rcommission1').textContent = commissionInput;

    const editmonikerInput = document.getElementById('ieditmoniker').value.trim();
    document.querySelector('.reditmoniker1').textContent = editmonikerInput;
    
    const editidentityInput = document.getElementById('ieditidentity').value.trim();
    document.querySelector('.reditidentity1').textContent = editidentityInput;

     const editdetailsInput = document.getElementById('ieditdetails').value.trim();
    document.querySelector('.reditdetails1').textContent = editdetailsInput;

    const editwebInput = document.getElementById('ieditweb').value.trim();
    document.querySelector('.reditweb1').textContent = editwebInput;

    const delegeteInput = document.getElementById('idelegete').value.trim();
    document.querySelector('.rdelegete1').textContent = delegeteInput;
      document.querySelector('.rdelegete2').textContent = delegeteInput;
document.querySelector('.rdelegete3').textContent = delegeteInput;
document.querySelector('.rdelegete4').textContent = delegeteInput;
document.querySelector('.rdelegete5').textContent = delegeteInput;
    const redelegeteInput = document.getElementById('iredelegete').value.trim();
    document.querySelector('.rredelegete1').textContent = redelegeteInput;
       document.querySelector('.rredelegete2').textContent = redelegeteInput;

const tokenInput = document.getElementById('itoken').value.trim();
    document.querySelector('.rtoken1').textContent = tokenInput;

    const portInput = document.getElementById('iport').value.trim();
    document.querySelector('.rport1').textContent = portInput;
  }

function copyText(preIndex) {
  const textToCopy = document.querySelector(`#pre${preIndex}`).innerText;
  const button = document.querySelector(`#copy${preIndex}`);

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      button.classList.add('show-check'); // Tampilkan ikon centang
      setTimeout(() => {
        button.classList.remove('show-check'); // Kembalikan ke ikon salin setelah 2 detik
      }, 2000);
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
      // Fallback jika navigator.clipboard.writeText gagal
      const range = document.createRange();
      range.selectNode(document.querySelector(`#pre${preIndex}`));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      button.classList.add('show-check'); // Tampilkan ikon centang
      setTimeout(() => {
        button.classList.remove('show-check'); // Kembalikan ke ikon salin setelah 2 detik
      }, 2000);
    });
}
</script>
