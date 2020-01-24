/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630pw
 * Date: 24.01.2020
 * Time: 9:48
 * About:
 *
 */
import React,{useState, useRef, useEffect} from "react";
import PropTypes from 'prop-types';
import './DragMeDropMe.scss';



const ItemDDme = ({
                      id,
                      debug,
                      coordTop,
                      coordLeft,
                      width,
                      movingArea,
                      children,
                          style,
                          className,
                        styleOnCapture,
                        classOnCapture,
                        styleOnMove,
                        classOnMove,
                        noSelect,
                      onMoveCallback = e => false,
                      onDownCallback = e => false,
                      onUpCallback = e => false,
                      onGotCaptureCallback = e => false,
                      onLostCaptureCallback = e => false,
                      ...res
                    }) => {

    const itemRef = useRef(false);

    const [tableSize,setTableSize] = useState(false);

    const [itemSize,setItemSize] = useState({width:0,height:0});

    const [positionLeft,setPositionLeft] = useState(0);

    const [positionTop,setPositionTop] = useState(0);


    useEffect(() =>{
        if(coordLeft){
            setPositionLeft(coordLeft);
        }

    },[coordLeft]);

    useEffect(() =>{

        if(coordTop){
            setPositionTop(coordTop);
        }

    },[coordTop]);



    const [previousPositionLeft,setPreviousPositionLeft] = useState(0);

    const [previousPositionTop,setPreviousPositionTop] = useState(0);

    const [isDragging,setIsDragging] = useState(false);

    const [hasCapture,setHasCapture] = useState(false);


    const extractPositionDelta = e =>{

        const left = e.pageX;
        const top = e.pageY;

        const delta = {
            left: left - previousPositionLeft,
            top: top - previousPositionTop,
        };

        setPreviousPositionLeft(left);
        setPreviousPositionTop(top);

        return delta;
    };

    const onDown = e =>{

        setIsDragging(true);
        e.target.setPointerCapture(e.pointerId);

        extractPositionDelta(e);

         onDownCallback({
                        onDown:true,
                        id,
                        position:{
                            top:positionTop,
                            left:positionLeft
                        },
                        size:itemSize});

    };

    const onMove = e =>{

        if (!isDragging) {
            return;
        }

        const {width:itemWidth,height:itemHeight} = itemSize;
        const {width:tableWidth,height:tableHeight} = tableSize;

        const {left, top} = extractPositionDelta(e);

        const newTop = positionTop + top;
        const lockMoveTop = newTop < 0 ? 0 : newTop;
        const lockMoveTopBottom = lockMoveTop + itemHeight > tableHeight ? tableHeight - itemHeight : lockMoveTop;


        const newLeft = positionLeft + left;
        const lockMoveLeft = newLeft < 0 ? 0 : newLeft;
        const lockmMoveLeftRight = lockMoveLeft + itemWidth > tableWidth ? tableWidth - itemWidth : lockMoveLeft;


        setPositionTop(tableHeight ? lockMoveTopBottom : newTop);
        setPositionLeft(tableWidth ? lockmMoveLeftRight : newLeft);

        onMoveCallback({
            onMove:true,
            id,
            position:{
                        top:newTop,
                        left:newLeft
                    },
            size:itemSize});

    };

    const onUp = e => {

        setIsDragging(false);

        onUpCallback({
            onUp:true,
            id,
            position:{
                top:positionTop,
                left:positionLeft
            },
            size:itemSize});
    };

    const onGotCapture = e => {

        setHasCapture(true);

        onGotCaptureCallback({
                                onGotCapture:true,
                                id,
                                position:{
                                    top:positionTop,
                                    left:positionLeft
                                },
                                size:itemSize});
    };

    const onLostCapture = e => {

        setHasCapture(false);

        onLostCaptureCallback({
                                onGotCapture:true,
                                id,
                                position:{
                                    top:positionTop,
                                    left:positionLeft
                                },
                                size:itemSize});

    };


    useEffect(() =>{

        const {width:tableWidth,height:tableHeight} = movingArea || false;

        if(tableWidth && tableHeight){
            setTableSize(movingArea);
        }

    },[movingArea]);

    useEffect(() => {

        const { current:itemRefCurrent } = itemRef || {offsetWidth:0,offsetHeight:0};

        setItemSize({
            width:itemRefCurrent.offsetWidth,
            height:itemRefCurrent.offsetHeight
        });

    },[]);

    const addStyleOnCapture = hasCapture && styleOnCapture ? styleOnCapture : null;
    const addClassOnCapture = hasCapture && classOnCapture ? classOnCapture : '';


    const addStyleOnMove = isDragging && styleOnMove ? styleOnMove : null;
    const addClassOnMove = isDragging && classOnMove ? classOnMove : '';


    return (<div
                id={id}
                ref={itemRef}
                className={`item ${className || ''} ${hasCapture ? 'onCapture' : ''} ${addClassOnCapture} ${addClassOnMove} ${noSelect ? 'noSelect' : ''}`}
                style={{
                    transform: `translate3d(${positionLeft}px, ${positionTop}px, 0)`,
                    width,
                    ...style,
                    ...addStyleOnCapture,
                    ...addStyleOnMove,
                }}
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}
                onPointerCancel={onUp}
                onGotPointerCapture={onGotCapture}
                onLostPointerCapture={onLostCapture}
                {...res}
                >
        {
            debug
                ? <div className={`debug`}>
                    size: width:{ itemSize.width  }px - height:{ itemSize.height  }px
                    <br/>
                    position: top:{positionTop} - left:{positionLeft}
                </div>
                : null
        }
                {children}

            </div>);
};

ItemDDme.prototype = {
    id:PropTypes.oneOfType([
                            PropTypes.string,
                            PropTypes.number
                                            ]),
    width:PropTypes.number,
    coordTop:PropTypes.number,
    coordLeft:PropTypes.number,
    movingArea:PropTypes.object,
    debug:PropTypes.bool,
    children:PropTypes.node,
    noSelect:PropTypes.bool,
    style:PropTypes.object,
    className:PropTypes.string,
    styleOnCapture:PropTypes.object,
    classOnCapture:PropTypes.string,
    styleOnMove:PropTypes.object,
    classOnMove:PropTypes.string,
    onMoveCallback: PropTypes.func,
    onDownCallback: PropTypes.func,
    onUpCallback: PropTypes.func,
    onGotCaptureCallback: PropTypes.func,
    onLostCaptureCallback: PropTypes.func,
};


export default ItemDDme;