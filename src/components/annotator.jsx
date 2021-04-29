import React from 'react';

class Annotator extends React.Component{
    constructor(props){
        super(props);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
            char_info: props.char_info,
            isHovering: false,
        };
    }
    render(){
        return(
            <div onMouseEnter={this.handleMouseHover} 
                onMouseLeave={this.handleMouseHover} 
                align="center">
                <p class="noselect">{this.state.char_info[0].simplified}</p>
                {this.state.isHovering &&
                <div class="card onTop bigCenter border border-dark" align="left">
                    <div class="card-body">
                        {this.renderCharInfo()}
                    </div>
                </div>
                }
            </div>
        );
    }

    handleMouseHover(){
        this.setState(this.toggleHoverState);
    }

    toggleHoverState(state){
        return{
            isHovering: !state.isHovering,
        };
    }

    renderCharInfo(){
        var rContent = [];
        for(var i = 0; i < this.state.char_info.length; i++){
            rContent[i] = (
                <div>
                    <h5 class="card-title">{this.state.char_info[i].simplified}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{this.state.char_info[i].pinyin}, Tone: {this.state.char_info[i].tone}</h6>
                    <p class="card-text">{this.state.char_info[i].english}</p>
                </div>
            );
        }
        return rContent;
    }
}

export default Annotator;