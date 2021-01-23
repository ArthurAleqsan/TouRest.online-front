import React from 'react';
import { withRouter } from "react-router-dom";
import Header from '../../components/common/Header';

const MainRouter = () => {

    return (
        <div className="app" style={{
            background: '#f2f2f2'
        }}
        >
            <Header />
        </div>
    );
};

export default withRouter(MainRouter);
