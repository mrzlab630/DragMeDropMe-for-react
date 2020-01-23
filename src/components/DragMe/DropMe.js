/*
drag & drop
 */


import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';
import useStyles from './useStyles';

import useForceUpdate from 'use-force-update';
//import useCalcHeight from './useCalcHeight';



function reinsert(arr, from, to) {
    const _arr = arr.slice(0);
    const val = _arr[from];
    _arr.splice(from, 1);
    _arr.splice(to, 0, val);
    return _arr;
}

function clamp(n, min, max) {
    return Math.max(Math.min(n, max), min);
}

const allColors = [
    '#EF767A', '#456990', '#49BEAA', '#49DCB1', '#EEB868', '#EF767A', '#456990',
    '#49BEAA', '#49DCB1', '#EEB868', '#EF767A',
];

const DropMe = ({columns=3,
                    style,
                    children,
                  wrapperWidth,
                    height,
                    colorBack,
                    callback,
                    ...res}) =>{



    const classes = useStyles();

    //анимация
    const springSetting1 = {stiffness: 180, damping: 10};
    const springSetting2 = {stiffness: 120, damping: 17};


    const [count,setCount] = useState(children.length);
    const [itemsBlocks,setItemsBlocks] = useState(children);




    useEffect(()=>{


        setItemsBlocks(children);
        setCount(children.length);

    },[children]);


    const [heightArr, setHeightArr] = useState([]);


    const forceUpdate = useForceUpdate();

    const calcHeight = node =>{

        const {id,offsetHeight} = node || false;

 if(!id || !offsetHeight){
return false
 }


 const newitemsBlocks = itemsBlocks.map(itm =>{

     const {props,type} = itm || false;
     const {shadow,id:itmId,weight} = props || false;

     if(parseInt(itmId,10) === parseInt(id,10)){

         return {
             ...itm,
             height:offsetHeight
         }
     }
     return itm;

 }).filter(el => el);

// console.log({id,height:offsetHeight});

    //    setHeightArr({id,height:offsetHeight});

      //  setItemsBlocks([...itemsBlocks,newitemsBlocks]);
      //  forceUpdate();

    };



    const [dragging,setDragging] = useState(false);

    const [lastPress,setLastPress] = useState(null);

    const [pos,setPos] = useState({x: 0, y: 0});

    const [rel,setRel] = useState({x: 0, y: 0});

    const [order,setOrder] = useState(range(count)); //

    const detectWidth = () =>{

        const pageWidth = window.innerWidth;

        const testWidth = wrapperWidth && wrapperWidth < pageWidth ? wrapperWidth : pageWidth;

        return (testWidth / columns);


    };

    const [width, setWidth] = useState(detectWidth());

    useEffect(()=>{
        window.addEventListener("resize", ()=>setWidth(detectWidth()));
        return () =>  window.removeEventListener("resize", ()=>setWidth(detectWidth()));
    },[]);


    // indexed by visual position

    const layout = range(count).map(n => {
        const row = Math.floor(n / columns);
        const col = n % columns;
        return [width * col, height * row];
    });



    const onTouchStart =  (key,[pressX, pressY]) =>(e) =>{
        const {pageX, pageY} = e.touches[0];


        onMouseDown(key,[pressX, pressY])({pageX, pageY,button:0})
    };

    const  handleTouchMove = (e) => {
        const {pageX, pageY} = e.touches[0];
        onMouseMove({pageX, pageY});
    };

    const onMouseDown = (key,[pressX, pressY]) => ({pageX, pageY,button}) => {

        if(button !== 0){
            return false
        }

        setDragging(true);

        setLastPress(key);

        setPos({
            x: pageX - pressX,
            y: pageY - pressY
        });
        setRel({x: pressX, y: pressY});

    };


    const onMouseMove = ({pageX, pageY}) => {


        if (!dragging){
            return false;
        }

        const mouseXY ={
            x: pageX - pos.x,
            y: pageY - pos.y
        };


        const col = clamp(Math.floor(mouseXY.x / width), 0, 2);
        const row = clamp(Math.floor(mouseXY.y / height), 0, Math.floor(count / 3));
        const index = row * 3 + col;

        const newOrder = reinsert(order, order.indexOf(lastPress), index);


        setOrder(newOrder);
        setRel(mouseXY);


    };

    const onMouseUp = (e) => {
        setDragging(false);
        setPos({x: 0, y: 0});

        callback(order);
    };


    useEffect(()=>{

        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);


        return () => {
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        }


    });





    return( <div
                style={style}
                className={classes.wrapper}>
        {
            itemsBlocks && Array.isArray(itemsBlocks) ? itemsBlocks.map((itm, key)=>{

                const {props,type} = itm || false;
                const {shadow,id,weight,height} = props || false;



                let styleQ;
                let x;
                let y;
                let boxShadow;
                const visualPosition = order.indexOf(key);



                if (key === lastPress && dragging) {
                    const {x,y} = rel;

                    boxShadow = shadow ? {boxShadow:  spring((x - (3 * width - 50) / 2) / 15, springSetting1)} : null;

                    styleQ = {
                        translateX: x,
                        translateY: y,
                        scale: spring(1.2, springSetting1),
                        ...boxShadow,
                    };

                }else{
                    [x, y] = layout[visualPosition];
                    boxShadow = shadow ? {boxShadow:  spring((x - (3 * width - 50) / 2) / 15, springSetting1)} : null;

                    styleQ = {
                        translateX: spring(x, springSetting2),
                        translateY: spring(y, springSetting2),
                        scale: spring(1, springSetting1),
                        ...boxShadow,
                    };
                }


                return(
                    <Motion key={key} style={styleQ}>
                        {({translateX, translateY, scale, boxShadow}) =>
                            <div
                               // ref={(node) => calcHeight(node)}
                                id={id}
                                className={classes.item}
                                key={`renderBlocks-${key}`}
                                onMouseDown={onMouseDown(key, [x, y])}
                                onTouchStart={onTouchStart(key, [x, y])}
                                style={{
                                    width,
                                    height,
                                    backgroundColor: colorBack ? allColors[key] : `none`,
                                    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                                    zIndex: key === lastPress ? 99 : visualPosition,
                                    boxShadow: `${boxShadow}px 5px 5px rgba(0,0,0,0.5)`,
                                }}
                            >{
                              typeof type === 'function' ? type({...props}) : false
                            }</div>
                        }
                    </Motion>);

            }) : false
        }
    </div>);
};


DropMe.prototype ={
    columns:PropTypes.number,
    style:PropTypes.object,
    children:PropTypes.array,
    wrapperWidth:PropTypes.number,
    height:PropTypes.number,
    colorBack:PropTypes.bool,
    callback:PropTypes.func,
};

export default DropMe;