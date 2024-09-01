import React from 'react';
import styles from './LoadingBar.module.css';

/**
 * A dynamic loading bar component.
 *
 * @param {number} percentage - The percentage of the loading bar's progress (0 to 100).
 * @param {string} description - The description to be displayed above the loading bar.
 * @returns {JSX.Element} The loading bar component.
 */
const LoadingBar: React.FC<{ percentage: number; description: string }> = ({percentage, description}) => {
    return (
        <div className={styles.container}>
            <div className={styles.description}>{description}</div>
            <div className={styles.barContainer}>
                <div
                    className={styles.bar}
                    style={{width: `${percentage}%`}}
                />
            </div>
        </div>
    );
};

export default LoadingBar;
