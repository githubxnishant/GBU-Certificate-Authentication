import React, { useState } from 'react';
import HomeContent from './Components/HomeContent';
import ValidContent from './Components/ValidContent';
import ErrorContent from './Components/ErrorContent';
import Header from './Components/Header';
import Footer from './Components/Footer';

const App = () => {
    const [certificate, setCertificate] = useState(null);
    const [sharedID, setSharedID] = useState('')

    const authenticateCertificate = (id) => {
        if (id === "123") {
            setCertificate('valid');
        } else {
            setCertificate('notValid');
        }
    };

    const sendCertificateID = (ID) => {
        setSharedID(ID);
    }

    return (
        <>
            <Header />
            {!certificate && <HomeContent authenticateCertificate={authenticateCertificate} storeCertificateID={sendCertificateID}/>}
            {certificate === 'valid' && <ValidContent setCertificate={setCertificate} sharedID={sharedID} />}
            {certificate === 'notValid' && <ErrorContent setCertificate={setCertificate} sharedID={sharedID} />}
            <Footer />
        </>
    );
};

export default App;
