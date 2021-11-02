import React, {Component,useRef, useState, useEffect} from "react";


import "./inputMsg.css"
function InputMsg(props){

  const inputRef = useRef();

  const keyPressEnter = (ev)=>{
    if (ev.key == 'Enter' && !(ev.altKey)){
      ev.preventDefault();
      props.onEnter();
    }
  }

  const pasteHandler = (ev)=>{
    ev.preventDefault();
    var  clipboardData = ev.clipboardData.getData('text');
    if (document.queryCommandSupported('insertText')) {
        document.execCommand('insertText', false, clipboardData);
    } else {
        // Insert text at the current position of caret
        const range = document.getSelection().getRangeAt(0);
        range.deleteContents();

        const textNode = document.createTextNode(clipboardData);
        range.insertNode(textNode);
        range.selectNodeContents(textNode);
        range.collapse(false);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
  }

  useEffect(()=>{
    props.setRef(inputRef);
  },[])

  return(
    <div className="container-gen-inputmsg">
      <div onPaste={pasteHandler} onKeyPress={keyPressEnter} ref={inputRef} className="input-inputmsg" role="textbox" contentEditable></div>
    </div>
  )
}

export default InputMsg