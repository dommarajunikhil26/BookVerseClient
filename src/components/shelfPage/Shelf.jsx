import { useState } from "react";
import Loans from "./Loans";
import NavBar from "./NavBar";
import PurchaseHistory from "./PurchaseHistory";


const Shelf = () => {
    const [activeTab, setActiveTab] = useState('loans');

    return (
        <>
            <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'loans' && <Loans />}
            {activeTab === 'history' && <PurchaseHistory />}
        </>
    )
};

export default Shelf;
