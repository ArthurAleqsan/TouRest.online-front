import React from 'react';
import { useSelector } from 'react-redux';
import { privacy } from '../../util/config';
import { getLngKey } from '../../util/helpers';

const replaceSimbolToBR = str => str.split('~n~').map((item, i) => <div key={i}><span>{item}</span></div>);

const Privacy = () => {
    const { lng } = useSelector(s => s.globals);

    return (
        <div className='privacy-container'>
            {privacy[`${getLngKey(lng)}_titles`].map((title, i) => {
                return <div key={'privacy-' + i} className='privacy-item'>
                    <p className='item-title'>{title}</p>
                    <article>{replaceSimbolToBR(privacy[`${getLngKey(lng)}_desc`][i])}</article>
                </div>
            })}
        </div>
    )
};

export default Privacy;