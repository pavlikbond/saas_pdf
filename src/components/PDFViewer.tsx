import React from "react";

type Props = {
  pdf_url: string;
};

const PDFViewer = ({ pdf_url }: Props) => {
  //console.log(pdf_url);

  return (
    <iframe src={`https://docs.google.com/viewer?url=${pdf_url}&embedded=true`} className="w-full h-full"></iframe>
  );
};

export default PDFViewer;
