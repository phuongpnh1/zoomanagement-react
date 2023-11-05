import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Row, Col, Form, Card } from "react-bootstrap";
import { DateHelper } from "../../DateHelper";
function UpdateStaff() {
    const location = useLocation();
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    

    const [UserName, setUserName] = useState('');
    const [Email, setEmail] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [FullName, setFullName] = useState('');
    const [DateOfBirth, setDateOfBirth] = useState('');
    const [Gender, setGender] = useState('');
    
    //Update user info to state in order to print to screen
    useEffect(() => {
        setUserName(user.userName || '');
        setEmail(user.email || '');
        setPhoneNumber(user.phoneNumber || '');
        setFullName(user.fullName || '');
        setDateOfBirth(DateHelper.formatDateForInput(user.dateOfBirth) || '');
        setGender(user.gender || '');
    }, [user]);

    let [message, setMessage] = useState("");
    let [dirty, setDirty] = useState({
        UserName: false,
        Email: false,
        PhoneNumber: false,
        FullName: false,
        Password: false,
        ConfirmPassword: false,
    });
    let [errors, setErrors] = useState(
        {
            UserName: [],
            Email: [],
            PhoneNumber: [],
            FullName: [],
            Password: [],
            ConfirmPassword: [],
        });
    //Validation
    let validate = () => {
        let errorsData = {};
        //userName
        errorsData.UserName = [];
        if (UserName === "") {
            errorsData.UserName.push("Username is required");
        }
        //Email
        errorsData.Email = [];
        if (Email === "") {
            errorsData.Email.push("Email is required");
        }
        var emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!emailRegex.test(Email)) {
            errorsData.Email.push("Email is invalid");
        }
        //PhoneNumber
        errorsData.PhoneNumber = [];
        if (PhoneNumber === "") {
            errorsData.PhoneNumber.push("Phone Number is required");
        }
        var phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(PhoneNumber)) {
            errorsData.PhoneNumber.push("Phone Number is invalid");
        }
        //FullName
        errorsData.FullName = [];
        if (FullName === "") {
            errorsData.FullName.push("FullName is required");
        }
        setErrors(errorsData);
    }
    //Check valid before submit
    let isValid = () => {
        let valid = true;
        for (let control in errors) {
            if (errors[control].length > 0) {
                valid = false;
            }
        }
        return valid;
    }
    // Update Click event
    let onUpdateClick = async () => {
        // Set all input dirty=true
        let dirtyData = dirty;
        Object.keys(dirty).forEach((control) => {
            dirtyData[control] = true;
        });
        setDirty(dirtyData);

        //Validate all input
        validate();

        //Send response to server if valid
        if (isValid()) {
            await fetch("https://localhost:7193/api/User",
                {
                    method: "PUT",
                    body: JSON.stringify({
                        userId: user.userId,
                        userName: UserName,
                        fullName: FullName,
                        email: Email,
                        gender: Gender,
                        phoneNumber: PhoneNumber,
                        dateOfBirth: DateOfBirth,

                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "bearer " + JSON.parse(localStorage.getItem("loginUser")).token
                    }
                }).then((res) => {
                    if (res.ok) {
                        console.log("Add successfully");
                        setMessage(<span className="text-success">Add successfully</span>);
                    } else {
                        console.log("Add failed");
                        console.log(res);
                        setMessage(<span className="text-danger">Add failed</span>);
                    }
                }).catch(rejected => {
                    console.log(rejected);
                });
        }
    }
    let handleCancel = () => {
        navigate("/admin/staff");
    }    
    //Fetch user by id
    useEffect(() => {
        fetch(`https://localhost:7193/api/Staff/${location.state.id}`,
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Authorization": "bearer " + JSON.parse(localStorage.getItem("loginUser")).token
                },
            }
        )
            .then((res) => res.json())
            .then(data => {
                setUser(data);
            }).catch(rejected => {
                console.log(rejected);
            });
    }, [location.state.id]);
    //Validate when input change
    useEffect(validate, [UserName, Email, PhoneNumber, FullName]);
    return (
        <Container fluid>
            <Row className="py-5 d-flex justify-content-center align-items-center">
                <Col md={8} lg={5} xs={12}>
                    <Card className="shadow">
                        <Card.Body>
                            <div className="mb-1">
                                <div className="mb-3">
                                    <Form>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="staffAddName">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={UserName}
                                                onChange={(e) => {
                                                    setUserName(e.target.value);
                                                    validate();
                                                }}
                                                placeholder="Enter Username" />
                                            <div className="text-danger">
                                                {dirty["userName"] && errors["userName"][0] ?
                                                    errors["userName"][0] : ""}
                                            </div>
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="staffAddEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={Email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    validate();
                                                }}
                                                placeholder="Enter Email" />
                                            <div className="text-danger">
                                                {dirty["Email"] && errors["Email"][0] ?
                                                    errors["Email"][0] : ""}
                                            </div>
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="staffAddPhone">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={PhoneNumber}
                                                onChange={(e) => {
                                                    setPhoneNumber(e.target.value);
                                                    validate();
                                                }}
                                                placeholder="Enter your phone number" />
                                            <div className="text-danger">
                                                {dirty["PhoneNumber"] && errors["PhoneNumber"][0] ?
                                                    errors["PhoneNumber"][0] : ""}
                                            </div>
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="staffAddFullName">
                                            <Form.Label>Full name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={FullName}
                                                onChange={(e) => {
                                                    setFullName(e.target.value);
                                                    validate();
                                                }}
                                                placeholder="Enter full name" />
                                            <div className="text-danger">
                                                {dirty["FullName"] && errors["FullName"][0] ?
                                                    errors["FullName"][0] : ""}
                                            </div>
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="addDateofBirth">
                                            <Form.Label>Date Of Birth</Form.Label>
                                            <Form.Control
                                                type="date"
                                                value={DateOfBirth}
                                                onChange={(e) => {
                                                    setDateOfBirth(e.target.value);
                                                }} />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="addGender">
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Select
                                                value={Gender}
                                                onChange={(e) => {
                                                    setGender(e.target.value);
                                                }}
                                            >
                                                <option >Choose gender</option>
                                                <option value={"Male"}>Male</option>
                                                <option value={"Female"}>Female</option>
                                                <option value={"Other"}>Other</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Row>
                                            <Col lg={6} md={6} sm={0}>
                                            </Col>
                                            <Col lg={6} md={6} sm={12} className="d-flex justify-content-end">
                                                <Button size="sm" variant="secondary" className="mx-2" onClick={handleCancel} >
                                                    Cancel
                                                </Button>
                                                <Button size="sm" variant="primary" onClick={onUpdateClick}>
                                                    Update
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row>{message}</Row>
                                    </Form>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default UpdateStaff;