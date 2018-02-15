import ReactDOM         from 'react-dom';
import React            from 'react';
import Campaign         from './campaign';
import Web3Required     from './web3required';

const appContainer = document.getElementById('app'),
      context =  window || global


ReactDOM.render(!!context.web3 ? <Campaign /> : <Web3Required />, appContainer)
