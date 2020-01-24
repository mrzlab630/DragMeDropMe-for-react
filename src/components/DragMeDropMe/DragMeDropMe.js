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

const DragMeDropMe = ({debug,callback, ...res}) => {

    const tableRef = useRef(false);

    const [tableSize,setTableSize] = useState({width:0,height:0});


    useEffect(() => {

        const { current:tableRefCurrent } = tableRef || {offsetWidth:0,offsetHeight:0};

        setTableSize({
                                width:tableRefCurrent.offsetWidth,
                                height:tableRefCurrent.offsetHeight
                            });

    },[]);


    const renderItemlist = [{id:1,data:'Praesent turpis. Fusce egestas elit eget lorem.'},
                            {id:2,data:`Phasellus magna.Donec orci lectus  hendrerit rutrum. Nunc nec neque. Maecenas nec `},
                            {id:3,data:`Suspendisse non nisl sit amet velit hendrerit rutrum. Nunc nec neque. Maecenas nec odio et ante tincidunt tempus. Praesent nonummy mi in odio. Fusce egestas elit eget lorem. 1`},
        {id:4,data:'Praesent turpis. Fusce egestas elit eget lorem.turpis. Fusce egestas elit eget lorem.turpis. Fusce egestas elit eget lorem.'},
        {id:5,data:`Phasellus magna.Donec orci lectus  hendrerit rutrum. Nunc nec neque. Maecenas nec Nunc nec neque. Maecenas nec Nunc nec neque. Maecenas nec Nunc nec neque. Maecenas nec `},
        {id:6,data:`Suspendisse non nisl sit amet velit hendrerit rutrum. Nunc nec neque. Maecenas nec odio et ante tincidunt tempus. Praesent nonummy mi in odio. Fusce egestas elit eget lorem. 1Suspendisse non nisl sit amet velit hendrerit rutrum. Nunc nec neque. Maecenas nec odio et ante tincidunt tempus. Praesent nonummy mi in odio. Fusce egestas elit eget lorem. 2`},





    ].map((itm,idx) =>(

        <ItemDDme
            key={`renderItemlist-${idx}`}
            id={itm.id}
            movingArea={tableSize}
            styleOnCapture={{opacity: 0.9}}
            styleOnMove={{color:'green'}}
            noSelect={true}
            coordTop={10}
            coordLeft={10}
        >
          Item id:{itm.id}
          <br/>
            {
                itm.data
            }
        </ItemDDme>
    ));


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
    callback: PropTypes.func
};


export default DragMeDropMe;