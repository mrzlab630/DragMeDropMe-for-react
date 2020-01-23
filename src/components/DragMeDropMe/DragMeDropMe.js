/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630pw
 * Date: 23.01.2020
 * Time: 17:17
 * About:
 *
 */
import React,{useState} from "react";
import PropTypes from 'prop-types';

import './DragMeDropMe.scss';

const DragMeDropMe = ({callback, ...res}) => {

    const [positionX,setPositionX] = useState(0);

    const [positionY,setPositionY] = useState(0);

    const [previousPositionX,setPreviousPositionX] = useState(0);

    const [previousPositionY,setPreviousPositionY] = useState(0);

    const [isDragging,setIsDragging] = useState(false);

    const [hasCapture,setHasCapture] = useState(false);



    const extractPositionDelta = e =>{

        const left = e.pageX;
        const top = e.pageY;

        const delta = {
            left: left - positionX,
            top: top - positionY,
        };

        setPreviousPositionX(left);
        setPreviousPositionY(top);

        return delta;
    };


    const onDown = e =>{
console.log(`onDown`,e);

        setIsDragging(true);
        e.target.setPointerCapture(e.pointerId);

        extractPositionDelta(e);

    };

    const onMove = e =>{
console.log(`onMove`,e);

        if (!isDragging) {
            return;
        }

        const {left, top} = extractPositionDelta(e);

        setPositionY(positionY + top);
        setPositionX( positionX + left);

    };

    const onUp = e => setIsDragging(false);

    const onGotCapture = e => setHasCapture(true);

    const onLostCapture = e => setHasCapture(false);





    return (<div className={`DragMeDropMe`}>

        <div className={`table`}>

        <div
            className={`item`}
            style={{
                top:positionY,
                left:positionX
            }}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onGotPointerCapture={onGotCapture}
            onLostPointerCapture={onLostCapture}
        />


        </div>



    </div>);
};

DragMeDropMe.prototype = {
    callback: PropTypes.func
};


export default DragMeDropMe;