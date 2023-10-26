"use client"

import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { isFieldValid } from '../utils';

interface CreateProps {
  show: boolean;
  onHide: () => void;
  onCreateObject: (newObject: any) => void;
}

export const CreateModal: React.FC<CreateProps> = ({ show, onHide, onCreateObject }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthday_date: '',
    phone_number: '',
    address: '',
  });

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationErrors({})
    let { name, value } = e.target;

    if (name === 'birthday_date') {
      const parts = value.split('-');
      if (parts.length === 3) {
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        value = `20${year}-${month}-${day}`;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = () => {
    const errors: { [key: string]: string } = {};

    for (const field in formData) {
      //@ts-ignore
      const value = formData[field];

      if (!isFieldValid(field, value)) {
        errors[field] = `Invalid ${field}`;
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      axios
        .post('https://technical-task-api.icapgroupgmbh.com/api/table/', formData)
        .then((response) => {
          if (response.status === 201) {
            onCreateObject(response.data);
            setFormData({
              name: '',
              email: '',
              birthday_date: '',
              phone_number: '',
              address: '',
            });
            onHide();

          }
        })
        .catch((error) => {
          console.error('Error while creating:', error);
        });
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Create
        </Modal.Title>        
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>
              Name
            </Form.Label>

            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {validationErrors.name && <Alert variant="danger">{validationErrors.name}</Alert>}
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Email
            </Form.Label>

            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {validationErrors.email && <Alert variant="danger">{validationErrors.email}</Alert>}
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Birthday Date
            </Form.Label>

            <Form.Control
              type="number"
              name="birthday_date"
              value={formData.birthday_date}
              onChange={handleInputChange}
            />
            {validationErrors.birthday_date && <Alert variant="danger">{validationErrors.birthday_date}</Alert>}
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Phone Number
            </Form.Label>

            <Form.Control
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
            {validationErrors.phone_number && <Alert variant="danger">{validationErrors.phone_number}</Alert>}
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Address
            </Form.Label>

            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {validationErrors.address && <Alert variant="danger">{validationErrors.address}</Alert>}
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          onClick={handleCreate}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
