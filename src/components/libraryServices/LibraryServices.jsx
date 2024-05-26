import { useState } from "react";
import NavBar from "../utility/NavBar";
import SubmitQuestion from './SubmitQuestion';
import QuestionResponse from './QuestionResponse';

const LibraryServices = () => {
    const [activeTab, setActiveTab] = useState('Submit Question');
    const tabs = ['Submit Question', 'Q/A Response'];

    return (
        <>
            <NavBar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'Submit Question' && <SubmitQuestion />}
            {activeTab === 'Q/A Response' && <QuestionResponse />}
        </>
    )
}

export default LibraryServices