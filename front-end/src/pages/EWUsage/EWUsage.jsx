import { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';

const EWUsage = () => {
    const [selectedSemester, setSelectedSemester] = useState('Fall 2023');
    const [view, setView] = useState('personal'); // 'personal' or 'block'

    const handleSemesterChange = (e) => {
        setSelectedSemester(e.target.value);
    };

    // Sample pricing data for personal usage
    const personalPricingData = [
        {
            description: 'Electricity',
            price: '$30',
        },
        {
            description: 'Water',
            price: '$15',
        },
        {
            description: 'Internet',
            price: '$20',
        },
    ];

    // Sample pricing data for block usage
    const blockPricingData = [
        {
            description: 'Electricity',
            price: '$50',
        },
        {
            description: 'Water',
            price: '$25',
        },
        {
            description: 'Internet',
            price: '$40',
        },
    ];

    const handleViewChange = (type) => {
        setView(type);
    };

    // Determine which pricing data to display based on the selected view
    const pricingData = view === 'personal' ? personalPricingData : blockPricingData;

    return (
        <div className="container mt-4">
            <h1>EW Usage</h1>

            {/* Semester Selection */}
            <Form.Group controlId="semesterSelect">
                <Form.Label>Select Semester:</Form.Label>
                <Form.Control as="select" value={selectedSemester} onChange={handleSemesterChange}>
                    <option value="Fall 2023">Fall 2023</option>
                    <option value="Spring 2024">Spring 2024</option>
                    <option value="Fall 2024">Fall 2024</option>
                </Form.Control>
            </Form.Group>

            {/* View Selection Buttons */}
            <div className="my-3">
                <Button 
                    variant={view === 'personal' ? 'primary' : 'secondary'} 
                    onClick={() => handleViewChange('personal')}
                    className="me-2"
                >
                    Personal Usage
                </Button>
                <Button 
                    variant={view === 'block' ? 'primary' : 'secondary'} 
                    onClick={() => handleViewChange('block')}
                >
                    Block Usage
                </Button>
            </div>

            {/* Pricing Table */}
            <h2 className="mt-4">Pricing Table</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {pricingData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default EWUsage;
