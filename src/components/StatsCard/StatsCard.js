import React from 'react';
import { Button, Card, CardContent } from '@material-ui/core';
import numeral from 'numeral';

import Tooltip from '../Tooltip/Tooltip';

import './StatsCard.css';



const StatsCard = ({ country, title, cases, total, onClick, active, caseType, updated }) => {

    return (
        <Tooltip title={`The total ${title.toLowerCase()} cases ${country === 'worldwide' ? 'around the world' : 'in '+country}`}>
            <Button onClick={onClick} className={`stats-card ${caseType} ${active ? 'stats-card__active' : ''}`}>
                <Card>
                    <CardContent>
                        <p className="stats-card__title">
                            {title}
                        </p>

                        <h2 className="stats-card__cases">
                            {numeral(total).format("0.0a")}
                        </h2>
                        
                        <p className="stats-card__total">
                            {
                                cases
                                ? ( cases > 0 ? "+" + numeral(cases).format("0.0a") : numeral(cases).format("0.0a") )
                                : "+0"
                            }
                        </p>
                        
                        <p className="stats-card__updated">
                            { new Date(updated).toLocaleString() }
                        </p>
                    </CardContent>
                </Card>
            </Button>
        </Tooltip>
    )
}

export default StatsCard
