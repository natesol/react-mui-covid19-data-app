import React from 'react';
import numeral from 'numeral';

import './Table.css';


const Table = ({ title, countries }) => {
    return (
        <div className='data-table'>
            <h3>{title}</h3>
            <table>
                <tbody>
                    { countries.map(({ country, cases }, i) => (
                        <tr key={i}>
                            <td>{country}</td>
                            <td>{numeral(cases).format('0,0')}</td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
};

export default Table;
