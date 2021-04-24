import React from 'react';
import '../styles/mystyle.editor.css'; //editor css
import TextLabel from './textlabel.jsx';
import { characterData } from "../data/characters";

class Editor extends React.Component {
  constructor(props){
    super(props);
    this.editorRef = React.createRef();
    this.buttonRef = React.createRef();
    this.labelRef = React.createRef();
    this.state = {
      count: 0
    };
  }
  render(){
    let component = (
      <div className="helper">
        <div class="container">
          <TextLabel text="Terrible translation. Type Chinese in the box!"/>
          <div contentEditable="true" className="textBox card-body" ref={el => this.editorRef = el} onInput={ (e) => this.onEdit(e)}>
          </div>
          <TextLabel ref={el => this.labelRef = el} text=""/>
        </div>
      </div> 
      );
    return component;
  }
  onEdit(e){
    this.labelRef.setText("");
    var content = "";
    for(var a = 0; a < this.editorRef.innerText.length; a++){
      if((/\n/).test(this.editorRef.innerText[a])){
        content = content + '\n';
      }
      else if(!(/([A-Za-z])/).test(this.editorRef.innerText[a])){
        var res = this.contains(this.editorRef.innerText[a]);
        if(res === 1){
          res = this.fetchCharacter(this.editorRef.innerText[a]);
          content = content + res[0].english + " ";
        }
        else if(res > 1){
          res = this.fetchCharacter(this.editorRef.innerText[a]);
          content = content + res[0].english + " ";
        }
      }
      else{
        content = content + this.editorRef.innerText[a];
      }
    }
    this.labelRef.setText(content);
  }
  fetchCharacter(character){
    var results = [];
    for(var i = 0; i < characterData.length; i++){
      if(characterData[i].simplified === character || characterData[i].traditional === character){
        results.push(characterData[i]);
      }
    }
    return results;
  }
  contains(character){
    var count = 0;
    for(var i = 0; i < characterData.length; i++){
      if(characterData[i].simplified === character || characterData[i].traditional === character){
        count++;
      }
    }
    return count;
  }
}
export default Editor;
