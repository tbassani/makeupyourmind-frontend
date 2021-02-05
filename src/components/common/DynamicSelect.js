import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';

export default function DynamicSelect(props) {
  const handleChange = (event) => {
    if (props.handleSelect && event.target.value !== '') {
      props.handleSelect(event.target.value);
    } else if (props.handleSelect && event.target.value === '') {
    }
  };

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    var str = s.charAt(0).toUpperCase() + s.slice(1);
    return str.replaceAll('-', ' ');
  };

  const renderSelect = (select, index) => {
    return (
      <option value={select.id} key={select.id}>
        {capitalize(select.description)}
      </option>
    );
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
