import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ListGroup from './listgroup.jsx';

class Annotator extends React.Component{
    constructor(props){
        super(props);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.handleMouseOn = this.handleMouseOn.bind(this);
        this.toggleHoverState = this.toggleHoverState.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.setDefault = this.setDefault.bind(this);
        var cInfo = props.char_info;
        var setDefault = false;
        var firstMiddle = 0;
        for(var a = 0; a < cInfo.length; a++){
            if(cInfo[a].source === "modern"){
                cInfo[a].pinyin = this.getPinyin(cInfo[a]);
            }
            else if(!setDefault){
                setDefault = true;
                firstMiddle= a;
            }
        }
        this.state = {
            char_info: cInfo,
            isHovering: false,
            default: firstMiddle,
            left: 0,
            top: 0,
            clicked: false,
            invalid: false,
            pref: -1
        };
        this.labelRef = React.createRef();
    }
    render(){
        var toneMarking = "|";
        if(this.state.char_info[this.state.default].tone < 3){
            toneMarking = "⎯";
        }
        return(
            <div>
                <div onMouseEnter={this.handleMouseHover} 
                    onMouseLeave={this.handleMouseHover} 
                    onMouseOver={this.handleMouseOn}
                    onClick={this.handleOnClick}
                    align="center" class="h-100 w-100 pb-1 d-inline-block maskHover" id="parent">
                    <div class={this.getToneMarkColor()}>
                        <div class="d-flex justify-content-center align-items-center h-100">
                            <div class="noselect mt-3 mb-3">
                                <p class="m-0">{this.state.char_info[this.state.default].pinyin} {this.props.regulated && toneMarking}</p>
                                <p class='m-0'>{this.state.char_info[this.state.default].simplified}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        {this.state.isHovering &&
                        <div class="card onTop border border-dark customCard" ref={el => this.cardRef = el} id="card" align="left">
                            <div class="card-body">
                                {this.renderCharInfo()}
                            </div>
                        </div>}
                    </div>
                </div>
                <Modal
                    show={this.state.clicked}
                    onHide={this.handleClose}
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Set value</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <ListGroup char_info={this.state.char_info} click={this.setDefault} current={this.state.default}></ListGroup>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
    
    handleClose(){
        this.setState({clicked: false, isHovering: false});
    }

    handleShow(){
        this.setState({clicked: true}, this.setState({isHovering: false}));
    }

    handleOnClick(e){
        this.handleShow();
    }
    
    handleMouseOn(){
        this.setState({isHovering: true});
    }

    setDefault(n){
        this.setState({default: n, invalid: false}, this.props.update());
    }

    handleMouseHover(e){
        this.setState(this.toggleHoverState);
    }

    componentDidUpdate(){
        if(this.state.isHovering){
            var card = document.getElementById('card');
            if(card !== undefined && card !== null){
                var bounding = card.getBoundingClientRect();
                var intres = 0;
                if(bounding.bottom > window.innerHeight){
                    intres= bounding.top + window.pageYOffset - bounding.bottom + window.innerHeight;
                    card.style.top = intres + "px";
                }
                else if(bounding.bottom > document.documentElement.clientHeight){
                    intres= bounding.top + window.pageYOffset - bounding.bottom + document.documentElement.clientHeight;
                    card.style.top = intres + "px";
                }
                if(bounding.right > window.innerWidth){
                    intres= bounding.left + window.pageXOffset - bounding.right + window.innerWidth;
                    card.style.left = intres + "px";
                }
                else if(bounding.right > document.documentElement.clientWidth){
                    intres= bounding.left + window.pageXOffset - bounding.right + document.documentElement.clientWidth;
                    card.style.left = intres + "px";
                }
            }
            this.render()
        }
    }

    toggleHoverState(state){
        return{
            isHovering: !state.isHovering,
        };
    }

    renderCharInfo(){
        var rContent = [];
        var middle = [];
        var modern = [];
        var aCount = 0;
        for(var j = 0; j < this.state.char_info.length; j++){
            if(this.state.char_info[j].source === "middle"){
                middle.push(this.state.char_info[j]);
            }
            else{
                modern.push(this.state.char_info[j]);
            }
        }
        if(middle.length > 0){
            rContent.push(
                <div key={aCount}>
                    <h5 class="card-title">Middle Chinese:</h5>
                </div>
            );
            aCount++;
            for(var i = 0; i < middle.length; i++){
                rContent.push(
                    <div key={aCount}>
                        <h5 class="card-title">{middle[i].simplified}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{middle[i].pinyin}</h6>
                        <h6 class="card-subtitle mb-2 text-muted">{middle[i].middle}</h6>
                        <p class="card-text">{middle[i].english}</p>
                    </div>
                )
                aCount++;
            }
        }
        if(modern.length > 0){
            rContent.push(
                <div key={aCount}>
                    <h5 class="card-title">Modern Chinese:</h5>
                </div>
            );
            aCount++;
            for(i = 0; i < modern.length; i++){
                rContent.push(
                    <div key={aCount}>
                        <h5 class="card-title">{modern[i].simplified}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{modern[i].pinyin}</h6>
                        <p class="card-text">{modern[i].english}</p>
                    </div>
                );
                aCount++;
            }
        }
        return rContent;
    }

    /*
    *  Returns pinyin of a character as a string with tone mark
    */
    getPinyin(char){
        var vowels = ['a', 'e', 'i', 'o', 'u'];
        var toneMarks = [
            ['ā', 'ē', 'ī', 'ō', 'ū'],
            ['á', 'é', 'í', 'ó', 'ú'],
            ['ǎ', 'ě', 'ǐ', 'ǒ', 'ǔ'],
            ['à', 'è', 'ì', 'ò', 'ù']
        ]
        var py = char.pinyin;
        if(isNaN(py[py.length - 1])){
            return py;
        }
        var tone = parseInt(py[py.length - 1]) - 1;
        py = py.slice(0, py.length - 1);
        if(tone === 4){
            return py;
        }
        for(var i = 0; i < py.length; i++){
            if(vowels.includes(py[i])){
                switch(py[i]){
                    case "a":
                        return this.replaceAt(py, i, toneMarks[tone][0]);
                    case "e":
                        return this.replaceAt(py, i, toneMarks[tone][1]);
                    case "i":
                        if(i < py.length){
                            switch(py[i+1]){
                                case "a":
                                    return this.replaceAt(py, i+1, toneMarks[tone][0]);
                                case "e":
                                    return this.replaceAt(py, i+1, toneMarks[tone][1]);
                                case "i":
                                    return this.replaceAt(py, i+1, toneMarks[tone][2]);
                                case "o":
                                    return this.replaceAt(py, i+1, toneMarks[tone][3]);
                                case "u":
                                    return this.replaceAt(py, i+1, toneMarks[tone][4]);
                                default:
                                    return this.replaceAt(py, i, toneMarks[tone][2]);
                            }
                        }
                        else{
                            return this.replaceAt(py, i, toneMarks[tone][2]);
                        }
                    case "o":
                        return this.replaceAt(py, i, toneMarks[tone][3]);
                    case "u":
                        if(i < py.length){
                            switch(py[i+1]){
                                case "a":
                                    return this.replaceAt(py, i+1, toneMarks[tone][0]);
                                case "e":
                                    return this.replaceAt(py, i+1, toneMarks[tone][1]);
                                case "i":
                                    return this.replaceAt(py, i+1, toneMarks[tone][2]);
                                case "o":
                                    return this.replaceAt(py, i+1, toneMarks[tone][3]);
                                case "u":
                                    return this.replaceAt(py, i+1, toneMarks[tone][4]);
                                default:
                                    return this.replaceAt(py, i, toneMarks[tone][4]);
                            }
                        }
                        else{
                            return this.replaceAt(py, i, toneMarks[tone][4]);
                        }
                    default:
                        break;
                }
            }
        }
        return "Error: Annotator.getPinyin()";
    }

    /*
    *  Replaces character in string at index, returns new string
    */
    replaceAt(string, index, replacement) {
        return string.substr(0, index) + replacement + string.substr(index + 1);
    }

    /*
    *  Returns correct tone tone color formatting based on number of character
    */
    getToneMarkColor(){
        if(this.state.pref >= 0 && this.props.regulated && Math.floor(this.state.char_info[this.state.default].tone / 3.0) !== this.state.pref){
            return "invalidToneFormatting";
        }
        if(this.props.regulated){
            if(this.state.char_info[this.state.default].tone < 3){
                return "levelToneFormatting";
            }
            return "obliqueToneFormatting";
        }
        return "";
    }
}

export default Annotator;