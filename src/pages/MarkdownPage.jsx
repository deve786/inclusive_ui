import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../Constants';
import { FaFileAlt, FaFileExcel, FaFilePdf, FaFilePowerpoint, FaFileWord } from 'react-icons/fa';
import moment from 'moment';

const DocumentViewer = ({ content, documentDetails }) => {
  const getIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FaFilePdf className="text-red-600" />;
      case "Excel":
        return <FaFileExcel className="text-green-600" />;
      case "Word":
        return <FaFileWord className="text-blue-500" />;
      case "txt":
        return <FaFileAlt className="text-gray-600" />;
      case "PowerPoint":
        return <FaFilePowerpoint className="text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-2 flex-grow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white shadow-lg rounded-lg p-6 mb-6 border-b-4 border-primaryColor">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 flex gap-2 mb-4 md:mb-0">
          {getIcon(documentDetails.type)} {documentDetails.fileName}
        </h1>
        <div className="text-2xl md:text-4xl text-emerald-500 font-semibold">
          Score: {documentDetails.score}
        </div>
      </div>

      {/* Main Content and Document Info */}
      <div className="flex flex-col md:flex-row gap-5">
        {/* Markdown Content */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 w-full md:w-[80%]">
          <Markdown className="prose max-w-none">{content || "Analyzing..."}</Markdown>
        </div>

        {/* Document Info */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-[30%]">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Document Information</h3>
          <ul className="space-y-3">
            <li><strong>Size:</strong> {documentDetails.fileSize} KB</li>
            <li><strong>Type:</strong> <span className='uppercase'>{documentDetails.type || 'N/A'}</span></li>
            <li><strong>Created:</strong> {moment(documentDetails.uploadedAt).format("DD-MMM-YYYY")}</li>
            <li className='flex gap-1'>
              <strong>Current Directory:</strong>
              <span className="block text-gray-600">{documentDetails.rootDirectory || 'N/A'}</span>
            </li>
            <li className='flex gap-1'>
              <strong>Status:</strong>
              <span className={`block font-semibold ${documentDetails.status === 'Pending' ? 'text-yellow-500' : documentDetails.status === 'Approved' ? "text-green-600" : 'text-red-600'}`}>
                {documentDetails.status || 'N/A'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const MarkdownPage = () => {
  const [document, setDocument] = useState({});
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const { id } = useParams();

  useEffect(() => {
    fetchDocument();
  }, [id]);

  const fetchDocument = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const response = await axios.get(`${BASE_URL}/Document/single/${id}`);
      setDocument(response.data);
      setMarkdown(response.data.markdownReport || ''); // Set as empty string if undefined
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <div className="flex flex-col gap-8 min-h-screen p-4 md:p-8 bg-gray-50">
      {loading ? ( // Show loading indicator if loading
        <div className="flex justify-center items-center h-[80vh]">
        <img src="./loading.svg" />

    </div>
      ) : (
        <DocumentViewer content={markdown} documentDetails={document} />
      )}
    </div>
  );
};

export default MarkdownPage;
