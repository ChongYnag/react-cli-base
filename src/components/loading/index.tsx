import React from "react";
import styles from './index.module.scss';
const Loading = () => {
    return (
        <div className={styles.loading}>
            <div className='bg' />
            <div className='loadContainer'>
                加载中...
            </div>
        </div>
    );
};

export default Loading;
