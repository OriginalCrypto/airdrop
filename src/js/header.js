import React from 'react';

export default class Header extends React.Component {
  render () {
    const imgStyle = {
      maxWidth: "25%"
    }
    return (
      <div class="row bg-dark justify-content-between"> <div class="col-4"><a href="https://originalcryptocoin.com"><img style={imgStyle} alt="Logo" src="./images/crypto-logo-white.png" /></a></div>
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
    );
  }
}

