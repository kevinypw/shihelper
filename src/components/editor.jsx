import React from 'react';
import '../styles/mystyle.editor.css'; //editor css
import { characterData } from "../data/characters";
import { middleData } from "../data/middleCharacters";
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
            <h1 class="display-4">ShiHelper</h1>
          </div>
          <div class="textBox">
            <div contentEditable="true" 
            class="insideTextBox p-2" 
            suppressContentEditableWarning="true"
            ref={el => this.editorRef = el} onInput={ (e) => this.onEdit(e)}>
            床前明月光 <br></br>
            疑是地上霜 <br></br>
            舉頭望明月 <br></br>
            低頭思故鄉 <br></br>
            </div>
          </div>
          <table class="table p-0">
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
          var ret = [];
          var res = this.contains(lines[i][j]);
          if(res > 0){
            res = this.fetchCharacter(lines[i][j]);
            ret = ret.concat(res);
          }
          var result = this.middleContains(lines[i][j]);
          if(result > 0){
            result = this.fetchCharacterMiddle(lines[i][j]);
            ret = ret.concat(result);
          }
          if(ret.length > 0){
            currentLine.push(ret);
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
        cRow.push(<td class="p-0"><Annotator char_info={ch}/></td>);
      });
      if(l.length < mLength){
        for(var i = l.length; i < mLength; i++){
          cRow.push(<td class="p-0"></td>);
        }
      }
      rTableData[currRow] = <tr class="p-0">{cRow}</tr>;
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
        var temp = characterData[i];
        temp.source = "modern";
        results.push(characterData[i]);
      }
    }
    return results;
  }

  fetchCharacterMiddle(character){
    var results = [];
    for(var i = 0; i < middleData.length; i++){
      if(middleData[i].simplified === character){
        var temp = middleData[i];
        temp.source = "middle";
        results.push(middleData[i]);
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

  middleContains(character){
    var count = 0;
    for(var j = 0; j < middleData.length; j++){
      if(middleData[j].simplified === character){
        count++;
      }
    }
    return count;
  }
}
export default Editor;
