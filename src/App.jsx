import React, { useState } from 'react';
import HomeContent from './Components/HomeContent';
import ValidContent from './Components/ValidContent';
import ErrorContent from './Components/ErrorContent';
import Header from './Components/Header';
import Footer from './Components/Footer';

const App = () => {
    const [certificate, setCertificate] = useState(null);

    const authenticateCertificate = (id) => {
        if (id === "123") {
            setCertificate('valid');
        } else {
            setCertificate('notValid');
        }
    };

    return (
        <>
            <Header />
            {!certificate && <HomeContent authenticateCertificate={authenticateCertificate} />}
            {certificate === 'valid' && <ValidContent />}
            {certificate === 'notValid' && <ErrorContent />}
            <Footer />
        </>
    );
};

export default App;

