import React from 'react';

import styles from './ResumeSection.module.scss';

const ResumeSection = ({title, children}) => (
    <div className={styles.resumeSection}>
        <div className={styles.title}>
            <h2>{title}</h2>
        </div>
        <div className={styles.body + ' typography'}>{children}</div>
    </div>
);

export default ResumeSection;
