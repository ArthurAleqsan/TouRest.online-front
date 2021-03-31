import React, { useState } from 'react';
import { message, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { isEmail, isValidObject } from '../../util/helpers';
import { sendEmail } from '../../store/global/global.actions';


const ContactUs = ({ visible, close }) => {
    const { t } = useTranslation();
    const [data, setData] = useState({
        name: '',
        surname: '',
        email: '',
        message: '',
    });
    const handleChange = (name, value) => {
        setData({ ...data, [name]: value });
    };
    const handleSubmit = () => {
        if(isValidObject(data)) {
            if(!isEmail(data.email)) {
                return message.error(t('Please fill valid email'));
            } else {
                sendEmail(data);
            }
        } else {
            return message.error(t('Please fill all required fileds'));
        }
        close()
    };
    return (
        <div>
            <Modal
                visible={visible}
                onCancel={close}
                centered={true}
                className='contact-us'
                footer={null}
                maskStyle={{ background: 'rgba(0, 0, 0, 0.85)' }}

            >
                <div className='contact-us-body'>
                    <div className='form-input-container'>
                        <div className='contact-header'>{t('Contact Us')}</div>
                        <form className='form' autoComplete='off'>
                            <div className='contact-input'>
                                <label className='label'>{t('Name')}*</label>
                                <input
                                    name='name'
                                    value={data.name}
                                    type='text'
                                    className='form-input'
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </div>
                            <div className='contact-input'>
                                <label className='label'>{t('Surname')}*</label>
                                <input
                                    name='surname'
                                    value={data.surname}
                                    type='text'
                                    className='form-input'
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </div>
                            <div className='contact-input'>
                                <label className='label'>{t('Email')}*</label>
                                <input
                                    name='email'
                                    type='email'
                                    value={data.email}
                                    className='form-input'
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </div>
                            <div className='contact-input'>
                                <label className='label'>{t('Message')}*</label>
                                <input
                                    name='message'
                                    type='type'
                                    value={data.message}
                                    className='form-input'
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                            </div>
                        </form>
                        <div className='form-footer' onClick={() => handleSubmit()}>
                            <div className='send-buuton'>{t('Send')}</div>
                        </div>
                    </div>
                    <div className='contact-footer'>
                        <address><a href='mailto:info@tourest.online'>info@tourest.online</a></address>
                        <address> <span>{t('Yerevan Armenia')}</span></address>
                        <address> <a href='tel: +374 93 245235'>+374 93 245235</a></address>
                    </div>
                </div>
            </Modal>
        </div >
    )
};


export default ContactUs;