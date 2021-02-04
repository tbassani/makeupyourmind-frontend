import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';

export default function SimpleSelect(props) {
  const handleChange = (event) => {
    if (props.handleSelect) {
      props.handleSelect(event.target.value);
    }
  };

  const renderSelect = (select, index) => {
    return <option value={select.id}>{select.description}</option>;
  };

  if (props.required) {
    return (
      <Form.Control
        onChange={(e) => handleChange(e)}
        as="select"
        required
        defaultValue={props.default}
      >
        {props.data.map(renderSelect)}
      </Form.Control>
    );
  } else {
    return (
      <Form.Control onChange={(e) => handleChange(e)} as="select" defaultValue={props.default}>
        {props.data.map(renderSelect)}
      </Form.Control>
    );
  }
}
