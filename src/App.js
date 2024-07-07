import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Login from './components/Login';
import Register from './components/Register';
import CreateAccount from './components/CreateAccount';
import AccountDetails from './components/AccountDetails';
import TransferMoney from './components/TransferMoney';
import TransactionHistory from './components/TransactionHistory';

const Nav = styled.nav`
  background-color: #333;
  padding: 1rem;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li``;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;

  &:hover {
    background-color: #555;
  }
`;

const Content = styled.div`
  padding: 2rem;
`;

const App = () => {
  return (
      <Router>
        <Nav>
          <NavList>
            <NavItem>
              <StyledLink to="/">Home</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/login">Login</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/register">Register</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/create-account">Create Account</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/account-details">Account Details</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/transfer-money">Transfer Money</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/transaction-history">Transaction History</StyledLink>
            </NavItem>
          </NavList>
        </Nav>
        <Content>
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/account-details" element={<AccountDetails />} />
            <Route path="/transfer-money" element={<TransferMoney />} />
            <Route path="/transaction-history" element={<TransactionHistory />} />
          </Routes>
        </Content>
      </Router>
  );
};

export default App;
