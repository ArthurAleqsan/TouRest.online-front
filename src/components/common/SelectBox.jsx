import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Select, DatePicker } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { setOrderData } from '../../store/order/order.actions';
import { dateFormat } from '../../util/config';

// eslint-disable-next-line react/display-name
const SelectBox = memo(({ peopleMaxCount, handleSelect, handlerChange, hasChildPrise, defaultSelectBoxValues, aviableDays }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { Option } = Select;
    const peoplesCountsArray = [];
    // const languageArray = ['En', 'Ru'];


    for (let i = 1; i < peopleMaxCount + 1; i++) {
        peoplesCountsArray.push(i);
    }
    const handleChange = (value, name) => {
        handlerChange({ ...defaultSelectBoxValues, [name]: value });
        setOrderData(dispatch, name, value);

    };
    const onChange = (dateString) => {
        handlerChange({ ...defaultSelectBoxValues, 'firstDate': dateString.toString() });

        setOrderData('firstDate', dateString.toString());

    };
    const disabledDays = (current) => {
        if(typeof aviableDays ==='object') {
            const currentNextDay = moment(current).format(dateFormat);
            const momentAviableDates = typeof aviableDays ==='object' && aviableDays.map(d => moment(d).format(dateFormat));
            return current && current < moment().endOf('day') || !momentAviableDates.includes(currentNextDay);
        } else {
            return current && current < moment().endOf('day');
        }

      }


    return (
        <div className='selectBox-container'>
            <div className='selectBox-header'>
                {t('Select Tour Details')}
            </div>
            <div className='selectBox-content'>
                <div className='selectBox-content-elem'>
                    <Select
                        onChange={(v) => handleChange(v, 'peopleCount')}
                        defaultValue={t(`People x1`)}
                        className='select-elem'
                    >
                        {peoplesCountsArray.map(p => (
                            <Option key={p} value={p} >{t(`People x${p}`)}</Option>
                        ))}
                    </Select>
                </div>
                {hasChildPrise && <div className='selectBox-content-elem'>
                    <Select
                        onChange={(v) => handleChange(v, 'childCount')}
                        defaultValue={t(`Child x1`)}
                        className='select-elem'
                    >
                        {peoplesCountsArray.map(p => (
                            <Option key={p} value={p} >{t(`Child x${p}`)}</Option>
                        ))}
                    </Select>
                </div>}
                <div className='selectBox-content-elem'>
                    <DatePicker
                        onChange={onChange}
                        format={dateFormat}
                        disabledDate = {disabledDays}
                    />
                </div>
                {/* <div className='selectBox-content-elem' >
                    <Select onChange={(v) => handleChange(v, 'language')}
                        defaultValue={'Language'}
                        className='select-elem'
                    >
                        {languageArray.map(lng =>
                            (<Option key={lng} value={lng}>{lng}</Option>
                            ))}
                    </Select>
                </div> */}
            </div>
            <div className='selectBox-btn btn-style link' onClick={handleSelect}>
                {t('Add to cart')}
            </div>
        </div>
    )
});
SelectBox.propTypes = {
    peopleMaxCount: PropTypes.number.isRequired,
    handleSelect: PropTypes.func.isRequired,
    handlerChange: PropTypes.func.isRequired,
    setOrderData: PropTypes.func.isRequired,
    hasChildPrise: PropTypes.number,
    defaultSelectBoxValues: PropTypes.object,
    aviableDays: PropTypes.any,
};

export default SelectBox;
