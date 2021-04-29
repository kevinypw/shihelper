import React from 'react';
import '../styles/mystyle.editor.css'; //editor css
import { characterData } from "../data/characters";
import Annotator from './annotator.jsx';

class Editor extends React.Component {
  constructor(props){
    super(props);
    this.editorRef = React.createRef();
    this.buttonRef = React.createRef();
    this.labelRef = React.createRef();
    this.state = {
      count: 0,
      characters : []
    };
  }
  componentDidMount(){
    this.readToState();
  }
  render(){
    let component = (
      <div className="helper">
        <div class="container p-auto">
          <div class="p-2 mt-2">
            <h2 class="p-auto">Type Chinese.</h2>
          </div>
          <div class="textBox">
            <div contentEditable="true" class="insideTextBox p-2" ref={el => this.editorRef = el} onInput={ (e) => this.onEdit(e)}>
            床前明月光 <br></br>
            疑是地上霜 <br></br>
            舉頭望明月 <br></br>
            低頭思故鄉 <br></br>
            </div>
          </div>
          <table class="table table-hover">
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </table>
        </div>
      </div> 
      );
    return component;
  }

  //On edit callback for onInput in textbox
  onEdit(e){
    this.readToState();
  }

  /*
   *  Reads text in editor to state in correct format
   */
  readToState(){
    var lines = this.editorRef.innerText.replace(/\r/g, "").split(/\n/); //create array containing each line
    for(var i = 0; i < lines.length; i++){
      var currentLine = [];
      for(var j = 0; j < lines[i].length; j++){
        if(!(/([A-Za-z])/).test(lines[i][j])){
          var res = this.contains(lines[i][j]);
          if(res > 0){
            res = this.fetchCharacter(lines[i][j]);
            currentLine.push(res);
          }
        }
      }
      lines[i] = currentLine;
    }
    for(var it = 0; it < lines.length; it++){ //trim empty
      if(!lines[it].length){
        lines.splice(it, 1);
        it--;
      }
    }
    this.setState({characters: lines});
  }

  /*
   *  Returns Array of React Elements for Table
   */
  renderTableData() {
    var rTableData = [];
    var currRow = 0;
    var mLength = -1;
    this.state.characters.forEach(l => {
      if(l.length > mLength){
        mLength = l.length;
      }
    });
    this.state.characters.forEach(l => {
      var cRow = [];
      l.forEach(ch => {
        cRow.push(<td><Annotator char_info={ch}/></td>);
      });
      if(l.length < mLength){
        for(var i = l.length; i < mLength; i++){
          cRow.push(<td></td>);
        }
      }
      rTableData[currRow] = <tr>{cRow}</tr>;
      currRow++;
    });
    return rTableData;
  }

  /*
   *  Fetches a character from dictionary
   */
  fetchCharacter(character){
    var results = [];
    for(var i = 0; i < characterData.length; i++){
      if(characterData[i].simplified === character || characterData[i].traditional === character){
        results.push(characterData[i]);
      }
    }
    return results;
  }

  /*
   *  Checks if character is contained in dictionary
   */
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
