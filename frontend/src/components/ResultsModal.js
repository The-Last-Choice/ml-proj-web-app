import React from 'react';
import { Button, Modal, Spinner, Table } from 'react-bootstrap';
import { CSVLink } from 'react-csv';

const ResultsModal = ({ results, show, handleClose, loading }) => {

    const headers = Object.keys(results[0]);
    const orderedHeaders = ['attack_type', ...headers.filter(col => col !== 'attack_type')];
    const csvHeaders = orderedHeaders.map(header => ({ label: header, key: header }));
    const modal_max_items = 7;

    const renderTable = () => {
        return (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        {orderedHeaders.map(header => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {results.slice(0, modal_max_items)
                        .map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {orderedHeaders.map(header => (
                                    <td key={header}>
                                        {header === 'attack_type' ? <strong>{row[header]}</strong> : row[header]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </Table>
        );
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName='modal' centered>
            <Modal.Header closeButton>
                <Modal.Title>Prediction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div class='d-flex justify-content-center  align-items-center mt-5'>
                        <Spinner animation='border' variant='light' />
                    </div>
                ) : (
                    <>
                        {
                            results.length > modal_max_items && (
                                <p style={{ textAlign: 'center', marginBottom: '10px', fontStyle: 'italic' }}>
                                    Results limited. Download CSV for full results.
                                </p>
                            )
                        }
                        {renderTable()}
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={handleClose}>Close</Button>
                <CSVLink
                    data={results}
                    headers={csvHeaders}
                    filename='cyberattack_prediction.csv'
                    className='btn btn-action'
                >
                    Download CSV
                </CSVLink>
            </Modal.Footer>
        </Modal >
    );
};

export default ResultsModal;
