import React from 'react';

function Button({ className, children, isControl, onClick }) {
  return (<button
      className={`${isControl ? 'control ' : ''}button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  isControl: false,
};

export default Button;