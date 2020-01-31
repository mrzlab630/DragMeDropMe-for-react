/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630pw
 * Date: 23.01.2020
 * Time: 17:17
 * About:
 *
 */
import React,{useState, useRef, useEffect} from "react";
import PropTypes from 'prop-types';

import './DragMeDropMe.scss';

import ItemDDme from './ItemDDme';

const DragMeDropMe = ({debug,
                            size={width:`80%`,height:`80%`},
                          itemslist,
                          defaultWidthItem = 150,
                          columnOffsetLeft = 10,
                          shadowEffect={opacity:0.7},
                          styleFoItms,
                          classFoItms,
                          callback,
                          children,
                          ...res}) => {

    const tableRef = useRef(null);

    const [tableSize,setTableSize] = useState({width:0,height:0});



    useEffect(() => {

        const { current:tableRefCurrent } = tableRef || {offsetWidth:0,offsetHeight:0};



        setTableSize({
                                width:tableRefCurrent.offsetWidth,
                                height:tableRefCurrent.offsetHeight
                            });

        window.addEventListener('resize', (event) => setTableSize({
                                                                                                width:tableRefCurrent.offsetWidth,
                                                                                                height:tableRefCurrent.offsetHeight
                                                                                            }));

    },[]);



    const [itemslistArr, setItemslistArr] = useState(itemslist || []);

    useEffect(()=>{
        setItemslistArr(itemslist);
    },[itemslist]);


    const [zIndexItem,setZIndexItem] = useState(1);

    const handleZindex = id => e =>{

        setItemslistArr(prev => prev.map(itm =>({
            ...itm,
            zIndex:itm.id === id ? zIndexItem + 1: itm.zIndex || 1
        })));

       setZIndexItem(prev => prev + 1);
    };



    const intersects = (m, s) => s.y0 <= m.x1 && s.x1 >= m.y0 && s.x0 <= m.y1 && s.y1 >= m.x0;
                            /*
                                s.x0 <= m.x0 && s.y1 >= m.x0 && s.y0 <= m.y0 && s.x1 >= m.y0 //left top corner;
                             || s.y0 <= m.x1 && s.x1 >= m.x1 && s.x0 <= m.x0 && s.y1 >= m.x0 //right top corner
                             || s.y1 >= m.y1 && s.x0 <= m.y1 && s.y0 <= m.y0 && s.x1 >= m.y0; // left bottom corner
                             */


    const handleMoveAction = e => {


        const {current: {children: itmL}} = tableRef || false;

        const allItmPos = [];

        for (let i = 0; i < itmL.length; i++) {

            let top = parseInt(itmL[i].dataset.positiontop, 10) || 0;
            let left = parseInt(itmL[i].dataset.positionleft, 10) || 0;
            let width = parseInt(itmL[i].offsetWidth, 10) || 0;
            let height = parseInt(itmL[i].offsetHeight, 10) || 0;

            if(itmL[i].dataset.id){
                allItmPos.push({
                    id: parseInt(itmL[i].dataset.id, 10),
                    position: {
                        top,
                        left
                    },
                    dots: {
                        x0: top,
                        y0: left,
                        x1: left + width,
                        y1: top + height,
                        z0: left + width + height,
                        z1: top + height + width
                    },
                    size: {
                        width,
                        height
                    }
                })
            }

        }


        const filtrlistAll = allItmPos.filter(st => intersects(e.dots, st.dots) && parseInt(st.id, 10) !== parseInt(e.id, 10));
       // const filtrlist = filtrlistAll[0];
        //     const foundPositionMoved = allItmPos.filter(fn => fn.id === e.id)[0];

        const numStArr = filtrlistAll.map(itm => allItmPos.indexOf(itm));

        let newItemslistArr;

        if (numStArr.length > 0) {

            newItemslistArr =  itemslistArr.map((itm,idx) => {

               let foundX = numStArr.filter(itmN => idx === itmN && itmN !== -1)[0];


               if(typeof foundX !== "undefined"){
                   return {
                       ...itm,
                       styleShadowEffect: {
                           ...shadowEffect
                       }
                   }
               }

               return {
                   ...itm,
                   styleShadowEffect:false
               }

            });


        }else{
            newItemslistArr =    itemslistArr.map((itm,idx) =>{

                return {
                    ...itm,
                    styleShadowEffect: false
                }


            });

        }

        console.log({newItemslistArr,allItmPos});

        setItemslistArr(newItemslistArr);
        callback(allItmPos);

    };




    const renderItemlist = itemslistArr.map((itm,idx) =>{

        const {id,width,coords,style,zIndex,noSelect,styleOnCapture,styleOnMove,styleOnLostCapture,styleShadowEffect} = itm || false;

        const {top:coordTopD,left:coordLeftD} = coords || false;

        const coordLeft = itemslist
                                    .slice(0,idx)
                                    .reduce((sum, current) => {
                                    const {width:currentW} = current || defaultWidthItem;
                                    return sum  + currentW + columnOffsetLeft;
                                },0);

        const lockAreaLeft = coordLeft + width > tableSize.width ? tableSize.width - width - columnOffsetLeft : coordLeft + columnOffsetLeft;

        const testlockAreaLeftFirst = lockAreaLeft > 0 ? lockAreaLeft : 0;

        return(<ItemDDme
            key={`renderItemlist-${idx}`}
            coordTop={typeof coordTopD === 'number' ? coordTopD : 0}
            coordLeft={typeof coordLeftD === 'number' && coordLeftD >= 0 ? coordLeftD : testlockAreaLeftFirst}
            movingArea={tableSize}
            className={classFoItms}
            styleOnLostCapture={{...styleOnLostCapture,zIndex:  zIndex || 1}}
            styleOnCapture={{...styleOnCapture,zIndex: zIndexItem + 1}}
            styleOnMove={styleOnMove}
            style={{...styleFoItms,...style,...styleShadowEffect}}
          onGotCaptureCallback={handleZindex(id)}
            onMoveCallback={handleMoveAction}
            noSelect={noSelect}

            {...{width,id}}
        >
            {
                itm.data
            }
        </ItemDDme>)

    });


    return (<div
        style={size}
        className={`DragMeDropMe`}
    >

        <div
            ref={tableRef}
            className={`table`}

            {...res}
        >
            {
                debug
                ? <div  className={`debug`}>
                        table size: width:{ tableSize.width  } - height:{ tableSize.height  }
                    </div>
                    : null
            }
            <div className={`info`} dangerouslySetInnerHTML={{__html: children}}/>
            {
                renderItemlist
            }
        </div>
    </div>);
};




DragMeDropMe.prototype = {
    size:PropTypes.object,
    debug:PropTypes.bool,
    shadowEffect:PropTypes.object,
    itemslist:PropTypes.array,
    defaultWidthItem:PropTypes.number,
    columnOffsetLeft:PropTypes.number,
    callback: PropTypes.func,
    styleFoItms:PropTypes.object,
    classFoItms:PropTypes.string,
    children:PropTypes.node
};


export default DragMeDropMe;