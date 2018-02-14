import React from 'react';

export default class Button extends React.Component {
  render () {

    const { text, link } = this.props 

    return (
      <span><a class="btn btn-lg btn-primary" href={link} role="button">{text}</a>&nbsp;</span>
    );
  }
}
