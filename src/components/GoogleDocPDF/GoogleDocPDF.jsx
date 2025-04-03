import React from "react";



const GoogleDocPDF = ({ docLink, children }) => {
  const handleClick = () => {
    // Extract the document ID from the Google Doc link
    const docId = docLink.match(/\/d\/(.*?)\//)?.[1];
    if (!docId) {
      alert("Invalid Google Doc link.");
      return;
    }

    // Construct the PDF export URL
    const pdfUrl = `https://docs.google.com/document/d/${docId}/export?format=pdf`;

    // Open the latest version of the PDF in a new tab
    const viewerUrl = `https://docs.google.com/viewer?srcid=${docId}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`;

    // Open the document in a new tab
    const newTab = window.open();
    if (newTab) {
      newTab.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Rebecca Chen</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
              iframe { width: 100%; height: 100%; border: none; }
            </style>
          </head>
          <body>
            <iframe src="${viewerUrl}" frameborder="0"></iframe>
          </body>
        </html>
      `);
      newTab.document.close();
    } else {
      alert("Unable to open a new tab. Please check your browser settings.");
    }
  };

  return (
    <button onClick={handleClick} className="google-doc-btn" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
      {children}
    </button>
  );
};

export default GoogleDocPDF;
