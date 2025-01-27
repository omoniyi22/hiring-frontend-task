import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/state/store';
import Success from './Success';
import Error from './Error';
import { clearAlert } from '@/app/state/alert/alertSlice';


interface AlertModalProps {
    isVisible: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({ isVisible }) => {
    const { message, status, title } = useSelector((state: RootState) => state.alert);
    const dispatch = useDispatch<AppDispatch>();
    const closeModal = () => dispatch(clearAlert())

    if (!message || !status) return null;

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                {status === "SUCCESS" ? <Success closeModal={closeModal} message={message} title={title} /> : <Error closeModal={closeModal} message={message} title={title} />}
            </div>
        </div>
    );
};

const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',

    zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
    display: 'flex',
    marginTop: "10%",
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

export default AlertModal;
