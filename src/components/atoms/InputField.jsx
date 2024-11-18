import React from 'react';
import Form from 'react-bootstrap/Form';

const InputField = ({ label, type, value, onChange, error }) => (
  <Form.Group controlId={label}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      value={value}
      onChange={onChange}
      isInvalid={!!error}
    />
    <Form.Control.Feedback type="invalid">
      {error}
    </Form.Control.Feedback>
  </Form.Group>
);

export default InputField;
