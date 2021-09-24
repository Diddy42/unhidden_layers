import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'


class ULNavbar extends React.Component{
    render(){ 
        return <>
                <Navbar bg="dark" variant="dark">
                    <Container fluid>
                        <Navbar.Brand >Unhidden layers</Navbar.Brand>
                        
                    </Container>
                    </Navbar>
            </>
    }
}


export default ULNavbar;

