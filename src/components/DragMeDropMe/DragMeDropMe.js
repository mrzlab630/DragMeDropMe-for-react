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

const DragMeDropMe = ({debug,Itemslist,defaultWidthItem = 150,columnOffsetLeft = 10,callback, ...res}) => {

    const tableRef = useRef(null);

    const [tableSize,setTableSize] = useState({width:0,height:0});

    const [itmListData, setItmListData] = useState(null);



    useEffect(() => {

        const { current:tableRefCurrent } = tableRef || {offsetWidth:0,offsetHeight:0};

        setTableSize({
                                width:tableRefCurrent.offsetWidth,
                                height:tableRefCurrent.offsetHeight
                            });



    },[]);



    const [ItemslistArr, setItemslistArr] = useState(Itemslist || []);

    useEffect(()=>{
        setItemslistArr(Itemslist);
    },[Itemslist]);


    const [zIndexItem,setZIndexItem] = useState(1);

    const handleZindex = id => e =>{

        setItemslistArr(prev => prev.map(itm =>({
            ...itm,
            zIndex:itm.id === id ? zIndexItem + 1: itm.zIndex || 1
        })));

       setZIndexItem(prev => prev + 1);
    };



    const intersects = (m, s) => s.y0 <= m.x1 && s.x1 >= m.y0 && s.x0 <= m.y1 && s.y1 >= m.x0
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


            allItmPos.push({
                key: i,
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


        const filtrlistAll = allItmPos.filter(st => intersects(e.dots, st.dots) && parseInt(st.id, 10) !== parseInt(e.id, 10));
        const filtrlist = filtrlistAll[0];
        //     const foundPositionMoved = allItmPos.filter(fn => fn.id === e.id)[0];

        const numStArr = filtrlistAll.map(itm => allItmPos.indexOf(itm));

        let newItemslistArr;

        if (numStArr.length > 0) {

            newItemslistArr =  ItemslistArr.map((itm,idx) => {

               let foundX = numStArr.filter(itmN => idx === itmN && itmN !== -1)[0];


               if(typeof foundX !== "undefined"){
                   return {
                       ...itm,
                       style: {
                           opacity:0.5
                       }
                   }
               }

               return {
                   ...itm,
                   style:false
               }

            });


        }else{
            newItemslistArr =    ItemslistArr.map((itm,idx) =>{

                return {
                    ...itm,
                    style: false
                }


            });

        }

        setItemslistArr(newItemslistArr);


    };




    const renderItemlist = ItemslistArr.map((itm,idx) =>{

        const {id,width,coords,style,zIndex} = itm || false;

        const {top:coordTopD,left:coordLeftD} = coords || false;

        const coordLeft = Itemslist
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
            coordLeft={typeof coordLeftD === 'number' && coordLeftD >= 0 || testlockAreaLeftFirst}
            movingArea={tableSize}
            styleOnLostCapture={{zIndex:  zIndex || 1}}
            styleOnCapture={{opacity: 0.9,zIndex: zIndexItem + 1}}
            styleOnMove={{color:'green'}}
            style={{...style}}
          onGotCaptureCallback={handleZindex(id)}
            onMoveCallback={handleMoveAction}
            noSelect={true}

            {...{width,id}}
        >
            Item id:{itm.id}
            <br/>
            {
                itm.data
            }
        </ItemDDme>)

    });


    return (<div className={`DragMeDropMe`}>

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



{
    renderItemlist
}


        </div>



    </div>);
};

DragMeDropMe.prototype = {
    debug:PropTypes.bool,
    Itemslist:PropTypes.array,
    defaultWidthItem:PropTypes.number,
    columnOffsetLeft:PropTypes.number,
    callback: PropTypes.func
};


export default DragMeDropMe;