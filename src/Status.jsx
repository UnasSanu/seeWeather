import React, { useState, useEffect } from 'react';
import styles from '../src/status.module.css'
const Status = () => {
    const [dayoftoday, setDayoftoday] = useState('');

    const setDatetoday = () => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        if (currentHour >= 6 && currentHour < 18) {
            setDayoftoday('morning');
        } else {
            setDayoftoday('night');
        }
    };

    useEffect(() => {
        setDatetoday();
    }, []);

    return (
        <div className={styles.aniIcon}>
            {dayoftoday === 'morning' ? (
                <div icon="sunny" data-label="Sunny">
                    <span className={styles.sun}></span>
                </div>
            ) : (
                <div icon="supermoon" data-label="Cool!">
                    <span className={styles.moon}></span>
                    <span className={styles.meteor}></span>
                </div>
            )}
        </div>
    );
};

export default Status;
