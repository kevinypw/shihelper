import React from 'react';
import '../styles/mystyle.editor.css'; //editor css
import WordBox from './wordbox.jsx';
import TextLabel from './textlabel.jsx';
class Editor extends React.Component {
  constructor(props){
    super(props);
    this.editorRef = React.createRef();
    this.buttonRef = React.createRef();
    this.state = {
      count: 0
    };
    this.buttonClick.bind(this);
  }
  render(){
    let component = (
      <div>
        <button className="buttonTemp" onClick={ (e) => this.buttonClick(e) } ref={el => this.buttonRef = el}>{this.state.count}</button>
        <TextLabel text="^ This button increments when you click it!"/>
        <WordBox ref={el => this.editorRef = el}/>
      </div>
      );
    return component;
  }
  buttonClick(e){
    e.preventDefault();
    this.setState({count: this.state.count + 1});
  }
}
export default Editor;