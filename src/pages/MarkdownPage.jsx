import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../Constants';
import { FaFileAlt, FaFileExcel, FaFilePdf, FaFilePowerpoint, FaFileWord } from 'react-icons/fa';
import moment from 'moment';
import { BiLeftArrowCircle } from 'react-icons/bi';

const DocumentViewer = ({ content, documentDetails }) => {
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
    <div className="flex flex-col gap-8 ">
      <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-6 mb-6 border-b-4 border-primaryColor">
        <h1 className="text-4xl font-bold text-gray-800 flex gap-2">{getIcon(documentDetails.type)}{documentDetails.name}</h1>
        <div className="text-4xl text-emerald-500 font-semibold">
          Score: {documentDetails.score}
        </div>
      </div>

      <div className='flex gap-5'>

        <div className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden p-6 w-full md:w-[70%]">
          <Markdown className="prose max-w-none">
            {content}
          </Markdown>
        </div>


        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-[30%]">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Document Information</h3>
          <ul className="space-y-3">
            <li><strong>Size:</strong> {documentDetails.size}</li>
            <li><strong>Type:</strong> {documentDetails.type}</li>
            <li><strong>Created:</strong> {moment(documentDetails.created).format("MMM Do YYYY")}</li>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

const MarkdownPage = () => {

  const [document, setDocument] = useState([])
  const { id } = useParams()
  useEffect(() => {
    fetchDocument()
  }, [])

  const fetchDocument=async()=>{
    const response=await axios.get(`${BASE_URL}/document/${id}`)
    console.log(response.data);
    setDocument(response.data)
    
    
  }

  const sampleMarkdown = `### Inclusion Analysis\n\n- **Non-Inclusive Words**: guys, crazy\n  - Found in context: Hello **guys**, welcome to the event.\n  - Found in context: This is a **crazy** idea.\n`;

  const sampleDocumentDetails = {
    name: document.filename,
    score: document.score,
    size: document.size,
    type: document.type,
    created: "12-OCT-2024",
    
  };

  return (
    <div className='flex flex-col gap-8   min-h-screen'>
      <h2 className='font-bold text-3xl text-primaryColor flex gap-3 items-center'>Document Insight</h2>
      <DocumentViewer content={sampleMarkdown} documentDetails={sampleDocumentDetails} />
    </div>
  );
};

export default MarkdownPage;
