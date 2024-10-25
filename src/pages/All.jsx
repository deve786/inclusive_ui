import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFilePdf, FaFileExcel, FaFileWord, FaFileAlt, FaFilePowerpoint, FaList, FaThLarge } from 'react-icons/fa';
import { PiEyeBold } from 'react-icons/pi';
import { BASE_URL } from '../Constants';
import axios from 'axios';
import moment from 'moment';

function All() {
    const [viewMode, setViewMode] = useState("grid");
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    console.log(documents);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/Document`);
            setDocuments(response.data);
        } catch (err) {
            console.log('Something went wrong, please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleProductClick = (id) => {
        navigate(`/document/${id}`);
    };

    const handleGrid = () => {
        setViewMode("grid");
    };

    const handleCard = () => {
        setViewMode("card");
    };

    const getIcon = (type) => {
        switch (type) {
            case "pdf":
                return <FaFilePdf className="text-red-600 text-xl" />;
            case "Excel":
                return <FaFileExcel className="text-green-600" />;
            case "Word":
                return <FaFileWord className="text-blue-500" />;
            case "txt":
                return <FaFileAlt className="text-gray-600 text-xl" />;
            case "PowerPoint":
                return <FaFilePowerpoint className="text-orange-500" />;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <img src="./loading.svg" />

            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5 ">
            <div className='flex justify-between '>
                <h2 className='font-bold md:text-3xl text-primaryColor'>Document List</h2>

                <div className='flex gap-2 justify-end pe-2'>
                    <button onClick={handleGrid} className={`rounded-md py-1 md:px-5 px-2 h-10 flex gap-1 ${viewMode === "grid" ? "bg-primaryColor text-white" : "bg-secondaryColor"} items-center`}>
                        <FaList />
                    </button>
                    <button onClick={handleCard} className={`rounded-md py-1 md:px-5 px-2  h-10 flex gap-1 ${viewMode === "card" ? "bg-primaryColor text-white" : "bg-secondaryColor"} items-center`}>
                        <FaThLarge />
                    </button>
                </div>
            </div>

            {
                viewMode === 'grid' ?
                <div className="w-full overflow-x-auto">
                <div className="max-w-[180px] md:max-w-full">
                    <table className="w-full text-sm text-left text-gray-500 border rounded-md">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-primaryColor">Document Name</th>
                                <th scope="col" className="px-6 py-3 text-primaryColor">Size</th>
                                <th scope="col" className="px-6 py-3 text-primaryColor">Type</th>
                                <th scope="col" className="px-6 py-3 text-primaryColor">Date</th>
                                <th scope="col" className="px-6 py-3 text-primaryColor">Score</th>
                                <th scope="col" className="px-6 py-3 text-primaryColor">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((document, index) => (
                                <tr
                                    onClick={() => handleProductClick(document.id)}
                                    key={index}
                                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 cursor-pointer"
                                >
                                    <td className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap flex items-center">
                                        {getIcon(document.type)}
                                        <span className="ml-2">{document.fileName}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{document.fileSize} KB</td>
                                    <td className="px-6 py-4 whitespace-nowrap uppercase">{document.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{moment(document.uploadedAt).format("DD-MMM-YYYY")}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{document.score}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className='py-1 px-4 rounded-sm bg-primaryColor text-white hover:bg-primaryColor hover:opacity-80'>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
                    :
                    <div className='grid md:grid-cols-3 gap-5 grid-cols-1'>
                        {documents.map((document, index) => (
                            <div
                                onClick={() => handleProductClick(document.id)}
                                key={index}
                                className="block max-w-sm p-6 cursor-pointer bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-200 transition-all"
                            >
                                <div className='flex justify-between items-center'>
                                    <p className='text-2xl font-bold'>{getIcon(document.type)}</p>
                                    <h2 className='text-3xl font-bold text-primaryColor'>8.2</h2>
                                </div>
                                <div className='flex justify-between items-end gap-5'>
                                    <h5 className="text-2xl font-bold text-primaryColor">{document.fileName}</h5>
                                </div>
                                <p className="font-normal text-gray-700 dark:text-gray-400">Size: {document.fileSize}</p>
                                <p className="font-normal text-gray-700 dark:text-gray-400">Type: {document.type}</p>
                                <p className="font-normal text-gray-700 dark:text-gray-400">Date: {moment(document.creationDate).format("DD-MMM-YYYY")}</p>
                            </div>
                        ))}
                    </div>
            }
        </div>
    );
}

export default All;
