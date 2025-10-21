import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import {Table, Button, Modal } from 'react-bootstrap';
import { Title } from './style'
import { Client } from '../../api/client';
import { VIEW, CREATE, EDIT, DELETE } from '../../utils/crud'
import { getPermissions } from '../../service/PermissionService';
import { RosaButton } from './style';

export default function DataTable(props) {

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const permissions = getPermissions()
  
  function update(item) {
    navigate('edit', { state: { item: item } })
  }

  function remove(item) {

    const url = `${props.resource}/${item.id}`
    Client.delete(url).then(response => {
      setShow(true);
    })
    .catch(error => {
      console.error(error);
    });
  }

  const handleClose = () => { 
    setShow(false)
    navigate(0); 
  }

  return (
    <>
      <Title>{props.title}</Title>
      {
        permissions[props.crud[CREATE]]
        ?
          <Button 
              style={{ backgroundColor: '#e41b97ff', borderColor: '#e41b97ff' }} 
              className="me-1" 
              onClick={() => navigate('create')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#FFF" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
              </svg>
          </Button>
        :
          null
      }
      <hr/>
      <Table striped hover>
        <thead>
          <tr>
            {
              props.rows.map((item, index) => (
                props.hide[index]
                ? 
                  <th className='d-none d-md-table-cell' key={index}> {item.toUpperCase()} </th>
                : 
                  <th key={index}> {item.toUpperCase()}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            props.data.map((element, index) => (
              <tr key={index}>
                { 
                  props.keys.map((key, index) => (
                    props.hide[index]  
                    ? 
                      <td className='d-none d-md-table-cell' key={index}> {element[key]} </td>
                    : 
                     <td key={index}>{element[key]}</td>
                  ))
                }
                {
                  props.hide[props.keys.length]
                  ? 
                    <td className='d-none d-md-table-cell'>
                      {
                        permissions[props.crud[EDIT]]
                        ?
                         <Button 
                            style={{ backgroundColor: '#e41b97ff', borderColor: '#e41b97ff' }} 
                            className="me-1" 
                            onClick={() => update(element)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFF" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                            </svg>
                        </Button>
                        :
                          null
                      }
                      {
                        permissions[props.crud[DELETE]]
                        ?
                          <Button 
                              style={{ backgroundColor: '#e41b97ff', borderColor: '#e41b97ff' }} 
                              className="me-1" 
                              onClick={() => remove(element)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFF" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                              </svg>
                          </Button>
                        :
                          null
                      }
                    </td>
                  : 
                    <td>
                     {
                        permissions[props.crud[EDIT]]
                        ? 
                          <Button 
                              style={{ backgroundColor: '#e41b97ff', borderColor: '#e41b97ff' }} 
                              className="me-1" 
                              onClick={() => update(element)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFF" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                              </svg>
                          </Button>

                        :
                          null
                      }
                      {
                        permissions[props.crud[DELETE]]
                        ?
                          <Button 
                              style={{ backgroundColor: '#e41b97ff', borderColor: '#e41b97ff' }} 
                              className="me-1" 
                              onClick={() => remove(element)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFF" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                              </svg>
                          </Button>

                        :
                          null
                      }
                    </td>
                }
              </tr>
            ))
          }
        </tbody>
      </Table>
      <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
      >
          <Modal.Header closeButton style={{ backgroundColor: '#ffe4f6' }}>
                              <Modal.Title style={{ color: '#f700adff' }}>Cliente Removido</Modal.Title>
                              </Modal.Header>
          
                              <Modal.Body style={{ backgroundColor: '#ffe4f6', color: '#f700adff' }}>
                              Remoção realizada com Sucesso!
                              </Modal.Body>
          
                              <Modal.Footer closeButton style={{ backgroundColor: '#ffe4f6' }}>
                                  <RosaButton onClick={handleClose}>OK</RosaButton>
                              </Modal.Footer>
      </Modal>
    </>
  );
}