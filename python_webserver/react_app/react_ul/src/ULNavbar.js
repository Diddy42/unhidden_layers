import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";


class ULNavbar extends React.Component{
    render(){ 
        return <>
                <Navbar bg="dark" variant="dark">
                    <Container fluid>
                        <Link to="/">
                            <Navbar.Brand>Unhidden layers</Navbar.Brand>
                        </Link>

                        <Nav className="mr-auto">
                            <Link to="/explanation">
                                <Nav.Link href="/explanation">What's this?</Nav.Link>
                            </Link>
                        </Nav>
                    </Container>
                    </Navbar>
            </>
    }
}


export default ULNavbar;

