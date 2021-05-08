import React from 'react';

class ListGroup extends React.Component{
    handleClick = (val) => {
        this.props.click(val);
    }
    render(){
        var rContent = [];
        for(let a = 0; a < this.props.char_info.length; a++){
            if(a === this.props.current){
                if(this.props.char_info[a].source === "middle"){
                    rContent.push(<div onClick={() => this.handleClick(a)} key={a} class="list-group-item list-group-item-action active">
                                <h5 class="card-title">{this.props.char_info[a].simplified}</h5>
                                <h6 class="card-subtitle mb-2">{this.props.char_info[a].pinyin}</h6>
                                <h6 class="card-subtitle mb-2">{this.props.char_info[a].middle}</h6>
                                <p class="card-text">{this.props.char_info[a].english}</p>
                            </div>);
                }
                else{
                    rContent.push(<div onClick={() => this.handleClick(a)} key={a} class="list-group-item list-group-item-action active">
                                <h5 class="card-title">{this.props.char_info[a].simplified}</h5>
                                <h6 class="card-subtitle">{this.props.char_info[a].pinyin}</h6>
                                <p class="card-text">{this.props.char_info[a].english}</p>
                            </div>);
                }
            }
            else{
                if(this.props.char_info[a].source === "middle"){
                    rContent.push(<div onClick={() => this.handleClick(a)} key={a} class="list-group-item list-group-item-action">
                                <h5 class="card-title">{this.props.char_info[a].simplified}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{this.props.char_info[a].pinyin}</h6>
                                <h6 class="card-subtitle mb-2 text-muted">{this.props.char_info[a].middle}</h6>
                                <p class="card-text">{this.props.char_info[a].english}</p>
                            </div>);
                }
                else{
                    rContent.push(<div onClick={() => this.handleClick(a)} key={a} class="list-group-item list-group-item-action">
                                <h5 class="card-title">{this.props.char_info[a].simplified}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{this.props.char_info[a].pinyin}</h6>
                                <p class="card-text">{this.props.char_info[a].english}</p>
                            </div>);
                }
            }
        }
        return(rContent);
    }
}

export default ListGroup;