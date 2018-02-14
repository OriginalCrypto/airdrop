import React from 'react';

export default class Campaign extends React.Component {
  render () {
    const imgStyle = {
      maxWidth: "25%"
    }
    return (
      <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
        <main role="main" class="inner cover">
          <div class="row bg-dark justify-content-between">
            <div class="col-4"><a href="https://originalcryptocoin.com"><img style={imgStyle} alt="Logo" src="./images/crypto-logo-white.png" /></a></div>
            <ul class="nav col-4">
              <li class="nav-item">
                <a class="text-light nav-link" href="https://originalcryptocoin.com">Home</a>
              </li>
              <li class="nav-item">
                <a class="text-light nav-link" href="https://originalcryptocoin.com/faq/">FAQ</a>
              </li>
              <li class="nav-item">
                <a class="text-light nav-link" href="https://originalcryptocoin.com/knowledgebase">Knowledge Base</a>
              </li>
              <li class="nav-item">
                <a class="text-light nav-link" href="https://originalcryptocoin.com/crypto-glossary">Glossary</a>
              </li>
            </ul>
          </div>
          <div class="text-center">
            <h1 class="cover-heading">Registration</h1>
            <p class="lead">If you're using MetaMask or a local web3 provider please be sure to check <a href="https://ethgasstation.info/">ETH Gas Station</a> to stay in full control of your gas usage.</p>
            <div class="qr">
              <img class="qr img-thumbnail" alt="qrcode of account" src="./images/eth.svg" />
            </div>
            <h3><span class="account">[some account]</span>&nbsp;<span class="badge rounded-0 badge-warning"><span class="balance">0</span> OCC</span></h3>
            <div class="lead">
              <div class="d-none alert alert-warning alert-dismissible fade show registered" role="alert">
                <strong>Looks like you're already registered.</strong> That's great, now share the love and let others know about OCC's airdrop!
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <button type="button" class="btn btn-lg btn-dark rounded-0 get-coins">Get Coins</button>
              <div class="d-none container waiting"></div>
              <div class="d-none alert alert-danger registration-failure alert-dismissible fade show" role="alert">
                Uh oh. Something went wrong, you can check a <a href="#" class="alert-link explorer">blockchain explorer</a> for more details.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="d-none alert alert-success alert-dismissible fade show" role="alert">
                They're on their way! You can check a <a href="#" class="alert-link explorer">blockchain explorer</a> for more details.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="d-none alert alert-danger failure alert-dismissible fade show" role="alert">
                Uh oh. Something went wrong: <span class="failure-message">&nbsp;</span>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <hr />
            <p>This app has been tested using <a href="https://github.com/ethereum/mist">Mist</a>, <a href="https://metamask.io/">MetaMask</a>, <a href="https://trustwalletapp.com">Trust Wallet</a>, and <a href="https://www.cipherbrowser.com/">Cipher Browser</a>.</p>
            <a class="download-web3" href="https://github.com/ethereum/mist"><img alt="metamask" src="./images/download-metamask.png" /></a>
            <hr />
            <p>Ethereum Network: <span class="network">Unknown</span></p>
          </div>
        </main>
      </div>
    );
  }
}

