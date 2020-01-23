import React, {useEffect, useRef, useState,} from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";

const useCalcHeight = (children) => {
/*
    const [addNewData, setAddNewData] = useState(false);


    const calcHeight = node =>{



        const {id,offsetHeight} = node || false;



        if(node){


            console.log('node',node);

            const dataToProp = {
                height:offsetHeight,
                render:node,
            };

            console.log('calcHeight',dataToProp);

            setAddNewData(dataToProp);

        }

    };



   const renderItm = () => {

    const {props,type} = children[0] || false;
    const {id} = props || false;


    return (<div
        ref={(node) => calcHeight(node)}
        id={id}
    >{
        typeof type === 'function' ? type({...props}) : false
    }
    </div>);


    };


    return renderItm();

*/



    const [height, setHeight] = useState(0)


    useEffect(() => {

        const DOMNode = ReactDOM.findDOMNode(()=>{

            const {props,type} = children[0] || false;
            const {shadow,id,weight,height} = props || false


            return type({...props});
        });

        console.log('DOMNode',DOMNode);

       // setHeight(ref.current.clientHeight)
    })

    return (

            children[0]

    )

};



export default useCalcHeight;