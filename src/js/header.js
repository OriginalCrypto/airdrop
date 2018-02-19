import React from 'react';

export default class Header extends React.Component {
  render () {
    const imgStyle = {
      maxWidth: '100%',
      maxHeight: 'auto'
    }
    return (
      <div class="bg-dark">
        <div class="col-xs-4 col-sm-6 col-lg-3">
          <a href="https://originalcryptocoin.com">
            <img class="img-fluid" style={imgStyle} alt="Logo" src="./images/crypto-logo-white.png" />
          </a>
        </div>
        <ul class="nav col-xs-8 col-sm-9 col-lg-9">
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
    );
  }
}

