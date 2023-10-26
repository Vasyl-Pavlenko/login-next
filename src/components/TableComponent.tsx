"use client"

import React, { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addObject, fetchData, updateData, handleSearchModalSearch } from '@/redux/actions';
import { SearchModal, CreateModal } from './index';
import { Data, RootState, TableItem } from '@/redux/types';
import { isFieldValid, saveDataToLocalStorage, sortData, SearchData } from '../utils';

export const TableComponent: React.FC = () => {
  const [editedData, setEditedData] = useState<{ [key: number]: { [key: string]: string } }>({});
  const [sortedData, setSortedData] = useState<Data[] | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<string | null>(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const items = useSelector((state: RootState) => state.table.items);
  const isLoading = useSelector((state: RootState) => state.table.isLoading);
  const currentPage = useSelector((state: RootState) => state.table.currentPage);
  const totalPages = useSelector((state: RootState) => state.table.totalPages);
  const [showError, setShowError] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Data[] | null>(null);

  const dispatch = useDispatch();

  const fetchDataAndSetState = async () => {
    //@ts-ignore
    await dispatch(fetchData({ page: currentPage }));
    saveDataToLocalStorage('items', items);

  };

  useEffect(() => {
    fetchDataAndSetState();
    // saveDataToLocalStorage('items', items);
  }, [currentPage]);  

  const handleEdit = (id: number, field: string, value: string) => {
    setShowError(false)
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [id]: {
        ...prevEditedData[id],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    const updates = [];
    const validationErrors = [];

    for (const key in editedData) {
      for (const field in editedData[key]) {
        const value = editedData[key][field];
        const id = parseInt(key);

        const isValid = isFieldValid(field, value);

        if (!isValid) {
          validationErrors.push(`Field "${field}" not accepted: ${value}`);
        } else {
          updates.push({ id, field, value });
        }
      }
    }

    if (validationErrors.length > 0) {
      setErrorMessages(validationErrors);
      setShowError(true);
    } else if (updates.length > 0) {
      //@ts-ignore
      await dispatch(updateData(updates));
      setEditedData({});
      fetchDataAndSetState();
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    if (items && sortField) {
      const sortedData = sortData(items, sortField, sortOrder);
      setSortedData(sortedData);
    }
  }, [items, sortField, sortOrder]);

  const handleShowSearchModal = () => {
    setShowSearchModal(true);
  };

  const handleHideSearchModal = () => {
    setShowSearchModal(false);
  };

  const handleSearch = (searchData: SearchData) => {
    handleSearchModalSearch(searchData)
      .then((searchResults) => {
        setSearchResults(searchResults);
      })
      .catch((error) => {
        console.error('Search error:', error);
      });
    setShowSearchModal(false);
  };

  const handleCreateObject = (newObject: TableItem) => {
    //@ts-ignore
    dispatch(addObject(newObject));
    setShowCreateModal(false); 
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      //@ts-ignore
      dispatch(fetchData({ page: currentPage - 1 }));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      //@ts-ignore
      dispatch(fetchData({ page: currentPage + 1 }));
    }
  };

  // DeleteForbidden
  // const handleDelete = async (id: number) => {
  //   if (window.confirm('Are you sure you want to delete this item?')) {
  //     try {
  //       await dispatch(deleteData(id));
  //       fetchDataAndSetState();
  //     } catch (error) {
  //       console.error('Failed to delete item:', error);
  //     }
  //   }
  // };

  const displayedData = searchResults || (sortedData || items);

  return (
    <div className="mt-3" style={{ position: 'relative', height: '100vh' }}>
      {showError && (
        <Alert
          variant="danger"
          onClose={() => setShowError(false)}
          dismissible
        >
          <Alert.Heading>
            Error
          </Alert.Heading>

          <ul>
            {errorMessages.map((message, index) => (
              <li key={index}>
                {message}
              </li>
            ))}
          </ul>
        </Alert>
      )}

      {isLoading ? (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Container>
          <Row>
            <Col md={11} className="mx-auto">
              <div className="mb-3">
                <Row>
                  <Col md={6}>
                    <Button
                      variant="primary"
                      onClick={handleShowSearchModal}
                    >
                      Search
                    </Button>

                    <SearchModal
                      show={showSearchModal}
                      onHide={handleHideSearchModal}
                      onSearch={handleSearch}
                    />
                  </Col>

                    <Col md={6}>
                    <Button
                      variant="primary"
                      onClick={() => setShowCreateModal(true)}
                    >
                      Create
                    </Button>

                    <CreateModal
                      show={showCreateModal}
                      onHide={() => setShowCreateModal(false)}
                      onCreateObject={handleCreateObject}
                    />
                  </Col>
                </Row>
              </div>
                
              <Table striped bordered hover responsive="sm">
                <thead>
                  <tr>
                    {['name', 'email', 'birthday_date', 'phone_number', 'address'].map((field) => (
                      <th
                        key={field}
                        onClick={() => handleSort(field)}
                      >
                        {field[0].toUpperCase() + field.slice(1)}{' '}
                        {field === sortField ? (sortOrder === 'asc' ? '↑' : '↓') : null}
                      </th>
                    ))}
                  </tr>
                  </thead>
                  
                <tbody>
                  {displayedData?.map((item: Data) => (
                    <tr key={item.id}>
                      {['name', 'email', 'birthday_date', 'phone_number', 'address'].map((field) => (
                        <td key={field}>
                          <Form.Group as={InputGroup}>
                            <Form.Control
                              type="text"
                              //@ts-ignore
                              value={editedData[item.id]?.[field] ?? item[field]}
                              onChange={(e) => handleEdit(item.id, field, e.target.value)}
                            />
                          </Form.Group>
                        </td>
                      ))}

                      {/* Delete not allowed
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </td> */}
                    </tr>
                  ))}
                    
                </tbody>
              </Table>
                
              <Row>
                <Col md={8}>
                  <Button
                    variant="primary"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </Col>

                <Col md={4}>
                  <Button
                    variant={currentPage !== 1 ? 'primary' : 'secondary'}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  <span className="mx-1">
                    Page {currentPage} of {totalPages}
                  </span>

                  <Button
                    variant={currentPage !== totalPages ? 'primary' : 'secondary'}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};
