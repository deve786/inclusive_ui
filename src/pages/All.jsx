import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFilePdf, FaFileExcel, FaFileImage, FaFileWord, FaFileAlt, FaFilePowerpoint } from 'react-icons/fa';

function All() {
    const navigate = useNavigate();
    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    const documentList = [
        { id: 1, filename: "Project_Plan.pdf", size: "2 MB", type: "PDF", date: "2024-10-10" },
        { id: 2, filename: "Financial_Report.xlsx", size: "3 MB", type: "Excel", date: "2024-09-15" },
      
        { id: 3, filename: "User_Guide.docx", size: "1 MB", type: "Word", date: "2024-08-23" },
        { id: 4, filename: "Meeting_Notes.txt", size: "500 KB", type: "Text", date: "2024-07-19" },
        { id: 5, filename: "Sales_Presentation.docx", size: "4 MB", type: "Word", date: "2024-06-30" },
    ];

    // Function to get the appropriate icon based on file type
    const getIcon = (type) => {
        switch (type) {
            case "PDF":
                return <FaFilePdf className="text-red-600" />;
            case "Excel":
                return <FaFileExcel className="text-green-600" />;
            
            case "Word":
                return <FaFileWord className="text-blue-500" />;
            case "Text":
                return <FaFileAlt className="text-gray-600" />;
            case "PowerPoint":
                return <FaFilePowerpoint className="text-orange-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="w-full overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 border rounded-md">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-primaryColor">
                                Document Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-primaryColor">
                                Size
                            </th>
                            <th scope="col" className="px-6 py-3 text-primaryColor">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3 text-primaryColor">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {documentList.map((document, index) => (
                            <tr 
                                onClick={() => handleProductClick(document.id)} 
                                key={index} 
                                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center">
                                    {getIcon(document.type)}
                                    <span className="ml-2">{document.filename}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{document.size}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{document.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{document.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default All;
