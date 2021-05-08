import React from 'react';
import '../styles/mystyle.editor.css'; //editor css
import { characterData } from "../data/characters";
import { middleData } from "../data/middleCharacters";
import Annotator from './annotator.jsx';
import Switch from './toggleSwitch.jsx';
import TextLabel from './textlabel.jsx';

class Editor extends React.Component {
  constructor(props){
    super(props);
    this.editorRef = React.createRef();
    this.buttonRef = React.createRef();
    this.labelRef = React.createRef();
    this.annotatorRefs = [];
    this.analyzeState = this.analyzeState.bind(this);
    this.calcHeuristic = this.calcHeuristic.bind(this);
    this.toggleRegulated = this.toggleRegulated.bind(this);
    this.renderTableData = this.renderTableData.bind(this);
    this.state = {
      count: 0,
      characters : [],
      regulated: false,
      hoverDisabled: false,
      enabled: false,
    };
  }
  componentDidMount(){
    this.readToState();
  }
  render(){
    let component = (
      <div className="helper">
        <div class="container p-auto">
          <div>
            <h4 class="d-inline-block m-3">Regulated Verse Mode</h4>
            <Switch theme="graphite-small" className="d-inline align-middle" enabled={this.state.enabled} onStateChanged={this.toggleRegulated} />
          </div>
          <div class="textBox">
            <div contentEditable="true" 
            class="insideTextBox p-2" 
            suppressContentEditableWarning="true"
            ref={el => this.editorRef = el} onInput={ (e) => this.onEdit(e)}>
              國破山河在 <br></br>
              城春草木深 <br></br>
              感時花濺淚 <br></br>
              恨別鳥驚心 <br></br>
              烽火連三月 <br></br>
              家書抵萬金 <br></br>
              白頭搔更短 <br></br>
              渾欲不勝簪 <br></br>
            </div>
          </div>
          <TextLabel type="h2" text="flick the switch twice to analyze" ref={el => this.labelRef = el}/>
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

  componentDidUpdate(){
    if(this.state.regulated || this.state.enabled){
      this.analyzeState();
    }
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
    if(this.state.regulated){
      mLength = 5;
    }
    else{
      this.state.characters.forEach(l => {
        if(l.length > mLength){
          mLength = l.length;
        }
      });
    }
    this.annotatorRefs = Array.from(Array(this.state.characters.length), () => new Array(mLength));;
    for(var a = 0; a < this.state.characters.length; a++){
      for(var b = 0; b < mLength; b++){
        this.annotatorRefs[a][b] = React.createRef();
      }
    }
    this.state.characters.forEach(l => {
      var cRow = [];
      var pushed = 0;
      var currentChar = 0;
      l.forEach(ch => {
        if(pushed < 5){
          cRow.push(<td class="p-0" key={currentChar}><Annotator char_info={ch} onClick={this.annotatorOnClick}
                                        ref={this.annotatorRefs[currRow][currentChar]} 
                                        regulated={this.state.regulated} disabled={this.state.hoverDisabled}
                                        row={currRow} col={currentChar}/></td>);
          if(this.state.regulated){
            pushed++;
          }
          currentChar++;
        }
      });
      if(l.length < mLength){
        for(var i = l.length; i < mLength; i++){
          if(!this.state.regulated || i - l.length < 5){
            cRow.push(<td class="p-0" key={currentChar}></td>);
          }
          currentChar++;
        }
      }
      rTableData[currRow] = <tr class="p-0" key={currRow}>{cRow}</tr>;
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

  /*
   *  Checks if character is contained in middle chinese dictionary
   */
  middleContains(character){
    var count = 0;
    for(var j = 0; j < middleData.length; j++){
      if(middleData[j].simplified === character){
        count++;
      }
    }
    return count;
  }

  toggleRegulated(){
    this.setState({
      regulated: !this.state.regulated,
    }, () => {
      if(this.state.regulated){
        this.analyzeState();
      }
    });
  }

  analyzeState(){
    var ret = "";
    for(var a = 0; a < this.annotatorRefs.length; a += 4){
      ret += JSON.stringify(this.calcHeuristic(a)) + "\n";
    }
    this.labelRef.state.text = ret;
  }

  calcHeuristic(num){
    //forms one, two, variant one, variant two
    var forms = [[[1, 1, 0, 0, 1], [0, 0, 1, 1, 0], [0, 0, 0, 1, 1], [1, 1, 1, 0, 0]], 
                [[0, 0, 0, 1, 1], [1, 1, 1, 0, 0], [1, 1, 0, 0, 1], [0, 0, 1, 1, 0]], 
                [[1, 1, 1, 0, 0], [0, 0, 1, 1, 0], [0, 0, 0, 1, 1], [1, 1, 1, 0, 0]], 
                [[0, 0, 1, 1, 0], [1, 1, 1, 0, 0], [1, 1, 0, 0, 1], [0, 0, 1, 1, 0]]];
    var heuristics = [0, 0, 0, 0];
    var a = 0;
    while(a < 4 && num + a < this.annotatorRefs.length){
      for(var b = 0; b < 5; b++){
        var ar = this.annotatorRefs[num+a][b].current;
        if(ar !== null && ar !== undefined){
          for(var c = 0; c < 4; c++){
            if(Math.floor(ar.state.char_info[ar.state.default].tone / 3.0) === forms[c][a][b]){
              heuristics[c]++;
            }
          }
        }
      }
      a++;
    }
    return heuristics;
  }
}
export default Editor;
