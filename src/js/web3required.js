import React from 'react';
import Button from './button';

const isIOS = !!navigator.platform.match(/(iPhone|iPod|iPad)/i),
      isMac = !!navigator.platform.match(/(Mac)/i),
      isAndroid = !!navigator.platform.match(/Android/i),
      isWinLike = !!navigator.platform.match(/Win/i),
      isNix = !!navigator.platform.match(/(Linux|BSD|Sun)/i),
      isMetaMaskCompatible = !!navigator.userAgent.match(/(Chrome|Opera|Firefox)/i),
      downloadButtons = []

if (isIOS || isAndroid) {
  downloadButtons.push({
    text: 'Trust Wallet',
    link: 'https://trustwalletapp.com'
  }, {
    text: 'Cipher Browser',
    link: 'https://www.cipherbrowser.com'
  })
} else {
  if (isMetaMaskCompatible) {
    downloadButtons.push({
      text: 'MetaMask',
      link: 'https://metamask.io'
    })
  }

  if (isMac) {
    downloadButtons.push({
      text: 'Mist',
      link: 'https://github.com/ethereum/mist/releases/download/v0.9.3/Ethereum-Wallet-macosx-0-9-3.dmg'
    })
  } else if (isWinLike) {
    downloadButtons.push({
      text: 'Mist',
      link: 'https://github.com/ethereum/mist/releases/download/v0.9.3/Mist-installer-0-9-3.exe'
    })
  } else if (isNix) {
    downloadButtons.push({
      text: 'Mist',
      link: 'https://github.com/ethereum/mist/releases/download/v0.9.3/Mist-linux64-0-9-3.deb'
    })
  }
}

export default class DappBrowserRequired extends React.Component {
  render () {
    const buttons = downloadButtons.map((button, index) => <Button key={index} text={button.text} link={button.link} />)
    return (
      <div class="text-center">
        <h1 class="cover-heading">Dapp Browser Required</h1>
        <p class="lead">It looks like you don&apos;t have a decentralized app browser (web3) installed. There are a couple of options you can download below:</p>
        <div>{buttons}</div>
      </div>
    );
  }
}
