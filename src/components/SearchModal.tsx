"use client"

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface SearchData {
  name: string;
  birthday_date: string;
  email: string;
  phone_number: string;
  address: string;
}

interface SearchModalProps {
  show: boolean;
  onHide: () => void;
  onSearch: (searchData: SearchData) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ show, onHide, onSearch }) => {
  const [searchData, setSearchData] = useState<SearchData>({
    name: '',
    birthday_date: '',
    email: '',
    phone_number: '',
    address: '',
  });

  const handleSearch = () => {
    onSearch(searchData);
    onHide();
    setSearchData({
      name: '',
      birthday_date: '',
      email: '',
      phone_number: '',
      address: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Search
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
              value={searchData.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Birthday Date
            </Form.Label>

            <Form.Control
              type="date"
              name="birthday_date"
              value={searchData.birthday_date}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Email
            </Form.Label>

            <Form.Control
              type="email"
              name="email"
              value={searchData.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Phone Number
            </Form.Label>

            <Form.Control
              type="text"
              name="phone_number"
              value={searchData.phone_number}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Address
            </Form.Label>

            <Form.Control
              type="text"
              name="address"
              value={searchData.address}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
        >
          Close
        </Button>

        <Button
          variant="primary"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
