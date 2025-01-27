import React from 'react';
import { ActionItemTable } from '../../types/actionItemTable';

interface ItemsActionsTableProps {
    headers: Array<Record<string, string>>;
    data: any[];
    parsed: (data: any) => any;
    actions: (item: any) => ActionItemTable[];
}

const ItemsActionsTable: React.FC<ItemsActionsTableProps> = ({ headers, data, parsed, actions }) => {
    const transformedData = data.map(parsed);

    return (
            <div className="bg-white max-w-full overflow-x-auto rounded-lg">
                <table className="w-full text-center table-auto">
                    <thead>
                        <tr className="bg-black text-center dark:bg-meta-4 text-white">
                            {headers.map((header, index) => (
                                <th key={index} className="py-4 px-4 font-medium text-white ">
                                    {header.title}
                                </th>
                            ))}
                            <th className="py-4 px-4 font-medium text-white">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transformedData.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {headers.map((header, colIndex) => (
                                    <td key={colIndex} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {!!item[header.key] ? item[header.key] : '-'}
                                        </p>
                                    </td>
                                ))}
                                <td className="flex border-b justify-center  border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        {actions(item).map((action, actionIndex) => (
                                        <button
                                            key={actionIndex}
                                            onClick={() => action.onClick(item)}
                                            className="hover:text-primary flex items-center space-x-1"
                                        >
                                            {action.icon && <span>{action.icon}</span>}
                                            <span>{action.label}</span>
                                        </button>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    );
};

export default ItemsActionsTable;
