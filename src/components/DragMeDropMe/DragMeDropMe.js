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

    const tableRef = useRef(false);

    const [tableSize,setTableSize] = useState({width:0,height:0});


    useEffect(() => {

        const { current:tableRefCurrent } = tableRef || {offsetWidth:0,offsetHeight:0};

        setTableSize({
                                width:tableRefCurrent.offsetWidth,
                                height:tableRefCurrent.offsetHeight
                            });

    },[]);


    const [ItemslistArr, setItemslistArr] = useState(Itemslist);


    const [zIndexItem,setZIndexItem] = useState({id:false,count:ItemslistArr.length});

    const handleZindex = id => () =>{
       setZIndexItem({count:zIndexItem.count + 1,id});
    };


    const renderItemlist = ItemslistArr.map((itm,idx) =>{

        const {id,width,coords} = itm || false;

        const {top:coordTopD,left:coordLeftD} = coords || false;

        const coordLeft = Itemslist
                                    .slice(0,idx)
                                    .reduce((sum, current) => {
                                    const {width:currentW} = current || defaultWidthItem;
                                    return sum  + currentW + columnOffsetLeft;
                                },0);

        const lockAreaLeft = coordLeft + width > tableSize.width ? tableSize.width - width - columnOffsetLeft : coordLeft + columnOffsetLeft;

        const testlockAreaLeftFirst = lockAreaLeft > 0 ? lockAreaLeft : 0;

        const {id:zIndexItemId, count: zIndexItemCount} = zIndexItem || false;


        return(<ItemDDme
            key={`renderItemlist-${idx}`}
            coordTop={typeof coordLeftD === 'number' && coordTopD >= 0 || 0}
            coordLeft={typeof coordLeftD === 'number' && coordLeftD >= 0 || testlockAreaLeftFirst}
            movingArea={tableSize}
            styleOnCapture={{opacity: 0.9}}
            styleOnMove={{color:'green'}}
            style={
                {zIndex:  zIndexItemId === id ? zIndexItemCount : 1}
                                    }
            onGotCaptureCallback={handleZindex(id)}
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