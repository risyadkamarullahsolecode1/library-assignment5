import React from 'react';
import Button from 'react-bootstrap/Button';

const CustomButton = ({ variant = 'primary', size = 'md', children, ...props }) => {
  return (
    <Button variant={variant} size={size} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
