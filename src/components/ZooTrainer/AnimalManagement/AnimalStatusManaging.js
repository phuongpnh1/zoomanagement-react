import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Pagination, Col, Row, Container, Form, Button } from "react-bootstrap";
import AnimalStatusTable from "./AnimalStatusTable";

function AnimalStatusManaging() {

    const [animalList, setAnimalList] = useState([]);
    const [searchBy, setSearchBy] = useState("AnimalName");
    const [searchString, setSearchString] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const trainerId = JSON.parse(localStorage.getItem("loginUser")).userId;
    const navigate = useNavigate();
    //Dummy state to force re-render
    const [reload, setReload] = useState(false);

    //#region Pagination
    // let PaginationLoad = () => {
    //     let items = [];
    //     if (totalPages > 1) {
    //         for (let page = 1; page <= totalPages; page++) {
    //             items.push(<Pagination.Item key={page} onClick={onPaginationClick}>{page}</Pagination.Item>)
    //         }
    //     }
    //     return items;
    // }

    // const onPaginationClick = (e) => {
    //     setCurrentPage(e.target.text);
    // }
    //#endregion

    useEffect(() => {
        fetch(`https://localhost:7193/api/AnimalUser/user/${trainerId}`,{
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "bearer " + JSON.parse(localStorage.getItem("loginUser")).token
            },
        })
            .then((res) => res.json())
            .then(data => {
                setAnimalList(data);
                console.log(data, "data");
                console.log(animalList, "animalList");
                console.log(trainerId, "id");
            }).catch(rejected => {
                console.log(rejected);
            });
    }, [reload, currentPage, searchBy, searchString]);

    return ( 
        <Container fluid>
            <Row className="vh-20 d-flex justify-content-center align-items-center m-3 pb-1 border-bottom">
            {/*Start search*/}
                {/*Search filter */}
                <Col lg={3} md={3} xs={12}>
                    <Form.Group className="mb-3" controlId="search">
                        <Form.Select
                            value={searchBy}
                            onChange={(e) => {
                                setSearchBy(e.target.value)
                            }}
                        >
                            <option value={"FullName"}>Animal Name</option>
                            <option>Name</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                {/*Search filter */}
                {/*Search bar */}
                <Col lg={8} md={8} xs={11}>
                    <Form.Group className="mb-3" controlId="search">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            value={searchString}
                            onChange={(e) => { setSearchString(e.target.value) }}>
                        </Form.Control>
                    </Form.Group>
                </Col>
                {/*Search bar */}
            {/*End search*/}
            </Row>
            <Row>
                <Col>
                    {/*Start Table*/}
                    <AnimalStatusTable animalList={animalList} reloadState={{reload, setReload}} />
                    {/*Start Table*/}
                </Col>
            </Row>
        </Container>
     )
}

export default AnimalStatusManaging;