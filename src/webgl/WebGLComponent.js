import React from 'react';
import GLCommander from './GLCommander'

export default class WebGLComponent extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
       /*console.log("canvas: " + JSON.stringify(this.canvas));*/
       this.canvas = document.querySelector("#glCanvas");
       GLCommander.init(this.canvas.getContext("webgl"));
       GLCommander.clear(1,0,0,1);

    }
    render(){
        return <canvas id="glCanvas" width="400" height="400" style={{border: '1px solid black'}}></canvas>
    }
}