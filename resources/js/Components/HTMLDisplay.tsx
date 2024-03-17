import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const HTMLDisplay = ({ htmlContent }: { htmlContent: any }) => {
    return <div>{ReactHtmlParser(htmlContent)}</div>;
}

export default HTMLDisplay;
