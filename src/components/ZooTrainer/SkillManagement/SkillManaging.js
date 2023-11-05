import React, { useLayoutEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import SkillContent from "./SkillContent";
function SkillManaging() {
    const userId = JSON.parse(localStorage.getItem("loginUser")).userId;
    const [user, setUser] = useState({});
    const [skills, setSkills] = useState([]);
    const [skillAdd, setSkillAdd] = useState("");

    //Dummy state for rendering
    const [reload, setReload] = useState(false);
    let handleAddSkill = () => {
        fetch(`https://localhost:7193/api/User`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + JSON.parse(localStorage.getItem("loginUser")).token
            },
            body: JSON.stringify({
                userId: userId,
                userName: user.userName,
                fullName: user.fullName,
                gender: user.gender,
                email: user.email,
                phoneNumber: user.phoneNumber,
                skills: [
                    ...skills,
                    { skillId: 0, skillName: skillAdd, userId: userId }
                ]
            })
        })
            .then((res) => {
                if (res.ok) {
                    setReload(!reload);
                    setSkillAdd("");
                }
                else {
                    alert("Add skill failed");
                }
            })
    }
    let handleUpdateSkill = (skillID, updatedSkill) => {
        fetch(`https://localhost:7193/api/User`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + JSON.parse(localStorage.getItem("loginUser")).token
            },
            body: JSON.stringify({
                userId: userId,
                userName: user.userName,
                fullName: user.fullName,
                gender: user.gender,
                email: user.email,
                phoneNumber: user.phoneNumber,
                skills: [
                    { skillId: skillID, skillName: updatedSkill, userId: userId }
                ]
            })
        })
            .then((res) => {
                if (res.ok) {
                    setReload(!reload);
                }
                else {
                    alert("Update skill failed");
                }
            }).catch((rejected) => {
                console.log(rejected);
            });
    }

    useLayoutEffect(() => {
        document.title = "Skill Managing";
        //Get user
        fetch(`https://localhost:7193/api/User/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setSkills(data.skills);
            }).catch((rejected) => {
                console.log(rejected);
            });
    }, [reload]);
    return (
        <Container fluid>
            <Row className="d-flex justify-content-center mt-5">
                <Col lg={8} md={8} sm={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title as={"h2"} className="mb-4">Your Skills</Card.Title>
                            {skills.map((skill, index) => {
                                return (
                                    <SkillContent 
                                        key={index} 
                                        skill={skill} 
                                        updateSkill={handleUpdateSkill}
                                        reloadState={{reload, setReload}} />
                                )
                            })}
                        </Card.Body>
                    </Card>
                    <Card className="mt-4">
                        <Card.Body>
                            <Card.Title as={"h5"} className="mb-1 text-uppercase">Add new skill</Card.Title>
                            <Row>
                                <Col lg={10} md={10} sm={10}>
                                    <Form.Control
                                        type="text"
                                        value={skillAdd}
                                        onChange={(e) => setSkillAdd(e.target.value)}
                                        placeholder="Enter skill detail" />
                                </Col>
                                <Col className="d-grid">
                                    <Button variant="outline-success" size="md" onClick={handleAddSkill}>  Add  </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default SkillManaging;