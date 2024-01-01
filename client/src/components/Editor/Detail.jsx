import React from 'react'
import parse from "html-react-parser";

const Detail = ({description}) => {
  return (
    <>
      <div className="ProseMirror" 
        style={{minHeight:"0px",padding:"0px"}}>{parse(description)}</div>
    </>
  )
}

export default Detail