// src/components/common/Modal.js

import React from 'react';
import styled from 'styled-components';

const Modal = ({ title, message, onClose }) => {
    return (
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>
                    <h2>{title}</h2>
                </ModalHeader>
                <ModalBody>
                    <p>{message}</p>
                </ModalBody>
                <ModalFooter>
                    <button onClick={onClose}>Kapat</button>
                </ModalFooter>
            </ModalContent>
        </ModalOverlay>
    );
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
`;

const ModalHeader = styled.div`
    margin-bottom: 10px;
`;

const ModalBody = styled.div`
    margin-bottom: 20px;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export default Modal;
