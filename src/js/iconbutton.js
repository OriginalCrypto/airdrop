import React from 'react';

export default class Button extends React.Component {
  render () {

    const { text, link, icon } = this.props 

    const iconClass = `fab ${icon}`

    return (
      <span>
        <a class="btn btn-lg btn-primary" href={link} role="button">
          <i class={iconClass}></i>
          {text}
        </a>&nbsp;
      </span>
    );
  }
}
