import React from 'react';
import Markdown from 'react-markdown';

const DocumentViewer = ({ content, documentDetails }) => {
  return (
    <div className="flex flex-col gap-8 ">
      <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-6 mb-6 border-b-4 border-primaryColor">
        <h1 className="text-4xl font-bold text-gray-800">{documentDetails.name}</h1>
        <div className="text-2xl text-emerald-500 font-semibold">
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
            <li><strong>Created:</strong> {documentDetails.created}</li>
            <li><strong>Modified:</strong> {documentDetails.modified}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const MarkdownPage = () => {
  const sampleMarkdown = `### Inclusion Analysis\n\n- **Non-Inclusive Words**: guys, crazy\n  - Found in context: Hello **guys**, welcome to the event.\n  - Found in context: This is a **crazy** idea.\n`;

  const sampleDocumentDetails = {
    name: "User Guide",
    score: "8.5 / 10",
    size: "2.5 KB",
    type: "docx",
    created: "2024-10-15 09:00:00",
    modified: "2024-10-15 10:30:00"
  };

  return (
    <div className='flex flex-col gap-8 p-6  min-h-screen'>
      <DocumentViewer content={sampleMarkdown} documentDetails={sampleDocumentDetails} />
    </div>
  );
};

export default MarkdownPage;
