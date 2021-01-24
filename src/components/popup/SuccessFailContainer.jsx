import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import SuccessFailContent from '../common/SuccessFailContent';

const SuccessFailContainer = ({ visibleModal, setVisibleModal, handleClick, isFromCartPage, isSuccess, text }) => {
    return (
        <div>
            <Modal
                className={'modal-container-antd'}
                visible={visibleModal}
                setVisible={setVisibleModal}
                onCancel={() => handleClick()}
                closable={false}
                centered={true}
                footer={null}
            >
                <SuccessFailContent
                    handleClick={handleClick}
                    isFromCartPage={isFromCartPage}
                    isSuccess={isSuccess}
                    text= {text}
                />
            </Modal>
        </div>
    )
};

SuccessFailContainer.propTypes = {
    visibleModal: PropTypes.bool.isRequired,
    setVisibleModal: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    isFromCartPage: PropTypes.bool.isRequired,
    isSuccess: PropTypes.bool.isRequired,
};

export default SuccessFailContainer;
