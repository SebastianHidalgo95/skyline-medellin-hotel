import React, { useState } from 'react';

interface TabPanelProps {
    tabs: { label: string; content: React.ReactNode }[];
}

const TabPanel: React.FC<TabPanelProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className="flex border-b">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`py-2 px-4 ${activeTab === index ? 'border-b-2 border-primary' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="p-4">
                {tabs[activeTab].content}
            </div>
        </div>
    );
};

export default TabPanel;