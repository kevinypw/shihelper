import React from 'react';
import '../styles/mystyle.editor.css'; //editor css
import { characterData } from "../data/characters";
import { middleData } from "../data/middleCharacters";
import Annotator from './annotator.jsx';
import Switch from './toggleSwitch.jsx';
import CellDisplay from './celldisplay.jsx';

class Editor extends React.Component {
  constructor(props){
    super(props);
    this.editorRef = React.createRef();
    this.buttonRef = React.createRef();
    this.annotatorRefs = [];
    this.cellDisplayRefs = [];
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
            <h4 class="d-inline-block m-3 font-weight-normal">Regulated Verse Mode</h4>
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
          <div class="m-4">
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

  componentDidUpdate(){
    if(this.state.regulated || this.state.enabled){
      this.analyzeState();
      var pattern = ["NP", "P", "P", "NP"]; //1 np, 0 p
      for(var a = 0; a < this.cellDisplayRefs.length; a +=8){
        if(this.cellDisplayRefs.length - a < 8){
          var len = (Math.ceil((this.cellDisplayRefs.length - a)/2.0)) * 2;
          var diff = (this.cellDisplayRefs.length - a) % 2;
          for(var tc = len; tc > 0; tc-=2){
            if(tc === len && diff === 1){
              this.cellDisplayRefs[a+tc-2].current.setState({parallel: pattern[tc/2-1]});
            }else{
              this.cellDisplayRefs[a+tc-2].current.setState({parallel: pattern[tc/2-1]});
              this.cellDisplayRefs[a+tc-1].current.setState({parallel: pattern[tc/2-1]});
            }
          }
        }else{
          for(var tb = 8; tb > 0; tb-=2){
            this.cellDisplayRefs[a+tb-2].current.setState({parallel: pattern[tb/2-1]});
            this.cellDisplayRefs[a+tb-1].current.setState({parallel: pattern[tb/2-1]});
          }
        }
      }
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
    if(this.state.regulated){
      this.cellDisplayRefs = [];
      for(var f = 0; f < this.state.characters.length; f++){
        this.cellDisplayRefs[f] = React.createRef();
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
                                        row={currRow} col={currentChar} update={this.analyzeState}/></td>);
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
      if(this.state.regulated){
        cRow.push(<td class="p-0" key={currentChar}><CellDisplay ref={this.cellDisplayRefs[currRow]} content={" A"}/></td>);
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
    var formsrhyme = [[0, 1, 0, 1], [0, 1, 0, 1], [1, 1, 0, 1], [1, 1, 0, 1]];
    var formsparallel = [[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1]];
    var forms = [[[1, 1, 0, 0, 1], [0, 0, 1, 1, 0], [0, 0, 0, 1, 1], [1, 1, 1, 0, 0]], 
                [[0, 0, 0, 1, 1], [1, 1, 1, 0, 0], [1, 1, 0, 0, 1], [0, 0, 1, 1, 0]], 
                [[1, 1, 1, 0, 0], [0, 0, 1, 1, 0], [0, 0, 0, 1, 1], [1, 1, 1, 0, 0]], 
                [[0, 0, 1, 1, 0], [1, 1, 1, 0, 0], [1, 1, 0, 0, 1], [0, 0, 1, 1, 0]]];
    for(var a = 0; a < this.annotatorRefs.length; a += 4){
      var res = this.calcHeuristic(a);
      var mv = 0;
      var loc = 0;
      for(let b = 0; b < 4; b++){
        if(res[b] > mv){
          loc = b;
          mv = res[b];
        }
      }
      for(var c = 0; c < 4; c++){
        for(var b = 0; b < 5; b++){
          if(this.annotatorRefs[a+c] !== undefined && this.annotatorRefs[a+c] !== null && this.annotatorRefs[a+c][b] !== undefined && this.annotatorRefs[a+c][b] !== null){
            var ar = this.annotatorRefs[a+c][b].current;
            if(ar !== null){
              if(ar.state.pref !== forms[loc][c][b]){
                ar.setState({pref: forms[loc][c][b]});
              }
              else{
                ar.forceUpdate();
              }
            }
          }
        }
        var r = ". ";
        var p = "";
        if(formsrhyme[loc][c] === 1){
          r = "△ ";
        }
        if(formsparallel[loc][c] === 1){
          p = "||";
        }
        else if(formsparallel[loc][c] === 0){
          p = "⎯⎯";
        }
        if(this.cellDisplayRefs[a+c] !== undefined){
          this.cellDisplayRefs[a+c].current.setState({rhyme: r+p});
        }
      }
    }
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
