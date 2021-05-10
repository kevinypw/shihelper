import React from 'react';

class ListDisplay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rhyme: this.props.content,
            parallel: "",
        }
    }
    render(){
        return(
            <div>
                <div align="center" class="h-100 w-100 pb-1 d-inline-block maskHover" id="parent">
                    <div>
                        <div class="d-flex justify-content-center align-items-center h-100">
                            <div class="noselect mt-3 mb-3">
                                <p class="m-0">{this.state.rhyme}</p>
                                <p class="m-0">{this.state.parallel}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
}

export default ListDisplay;