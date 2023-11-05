import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Form, Button,Pagination } from 'react-bootstrap';
import SpeciesTable from './SpeciesTable';

function SpeciesManaging() {
    const [species, setSpecies] = useState([]); 
    
    //Dummy state to re-rendering
    const [reload, setReload] = useState(false);

    useEffect(() => {
        fetch(`https://vietnamzoo.azurewebsites.net/api/Species/GetAllSpecies`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "bearer " + localStorage.getItem("token")
            },
        })
            .then((res) => res.json())
            .then(data => {
                setSpecies(data);
            }).catch(rejected => {
                console.log(rejected);
            });
    }, [reload]);

    return (
        <Container fluid>
            <Row className="vh-20 d-flex justify-content-center mt-3 pb-1 border-bottom">
                {/*Start add button*/}
                <Col lg={6} md={6} sm={12} className="mb-3 d-grid">
                    <Button href='/admin/species/add' variant="outline-primary" size="lg">Add new Species</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {/*Start Table*/}
                    <SpeciesTable speciesList={species} reloadState={{reload, setReload}} />
                    {/*Start Table*/}
                </Col>
            </Row>
        </Container>
    )
}

export default SpeciesManaging;