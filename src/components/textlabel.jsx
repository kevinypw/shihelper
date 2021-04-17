import React from 'react'
import '../styles/mystyle.editor.css'; //editor css

class TextLabel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: props.text
        }
        this.labelRef = React.createRef();
    }
    render(){
        return(
            <h1 className="label" ref={el => this.labelRef = el}>{this.state.text}</h1>
        );
    }
    setText(val){
        this.setState({text: val});
    }
}

export default TextLabel;