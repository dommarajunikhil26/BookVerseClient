import { useState } from "react";
import Loans from "./Loans";
import NavBar from "../utility/NavBar";
import PurchaseHistory from "./PurchaseHistory";


const Shelf = () => {
    const [activeTab, setActiveTab] = useState('loans');
    const tabs = ['loans', 'history'];

    return (
        <>
            <NavBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'loans' && <Loans />}
            {activeTab === 'history' && <PurchaseHistory />}
        </>
    )
};

export default Shelf;
