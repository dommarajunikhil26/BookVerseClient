import { useState } from "react"
import NavBar from "../utility/NavBar"
import AddNewBooks from './AddNewBooks';
import ChangeBookQuantity from './ChangeBookQuantity';
import Messages from "./Messages";

const ManageLibraryPage = () => {
    const [activeTab, setActiveTab] = useState('Add new book');
    const tabs = ['Add new book', 'Change quantity', 'Messages'];

    return (
        <div>
            <NavBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'Add new book' && (<AddNewBooks />)}
            {activeTab === 'Change quantity' && (<ChangeBookQuantity />)}
            {activeTab === 'Messages' && (<Messages />)}
        </div>
    )
}

export default ManageLibraryPage