import React from 'react'
import '../styles/mystyle.editor.css'; //editor css
import TextLabel from './textlabel.jsx';

class WordBox extends React.Component{
    constructor(props){
        super(props);
        this.labelRef = React.createRef();
        this.editorRef = React.createRef();
    }
    render() {
        return (
            <div>
                <div contentEditable="true" className="textBox" ref={el => this.editorRef = el} onInput={ (e) => this.updateState(e)}>
                </div>
                <TextLabel ref={el => this.labelRef = el} text="Type in the box!"/>
            </div>
        );
    }
    updateState(event){
        this.labelRef.setText(this.editorRef.textContent);
    }
}

export default WordBox;