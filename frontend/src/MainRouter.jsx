import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import App from './App';
import Users from './components/Users';
import User from './components/User';
import Blogs from './components/Blogs';
import SpecificBlog from './components/SpecificBlog';
import "./index.css";

const MainRouter = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const handleLinkClick = () => {
        setExpanded(false); 
    };

    return (
        <>
            <Navbar
                bg="dark grey"
                variant="dark"
                expand="lg"
                className='custom-navbar'
                expanded={expanded}
            >
                <Navbar.Brand as={Link} to="/" className='navbar-brand'>Blog App</Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    className='burger'
                    onClick={() => setExpanded(!expanded)}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/" onClick={handleLinkClick} className='text-white'>Home</Nav.Link>
                        <Nav.Link as={Link} to="/users" onClick={handleLinkClick} className='text-white'>Users</Nav.Link>
                        <Nav.Link as={Link} to="/blogs" onClick={handleLinkClick} className='text-white'>Blogs</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<SpecificBlog />} />
            </Routes>
        </>
    );
};

export default MainRouter;
