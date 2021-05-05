import React from 'react'
import '../styles/mystyle.editor.css'; //editor css

class TextLabel extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: props.text,
            type: props.type
        }
        this.labelRef = React.createRef();
    }
    render(){
        return(
            <div class="m-2">
                <p class={this.state.type} ref={el => this.labelRef = el}>{this.state.text}</p>
            </div>
        );

    }
    setText(val){
        this.setState({text: val});
    }
    getText(val){
        return this.state.text;
    }
}

export default TextLabel;