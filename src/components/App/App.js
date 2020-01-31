/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630pw
 * Date: 23.01.2020
 * Time: 14:02
 * About:
 *
 */
import React from "react";
import './App.scss';

import {DragMeDropMe,ItemDDme} from '../DragMeDropMe';
import {
    DragMe,
    DropMe,
} from "../DragMe";



const App = () => {


    const itemslistForDragMeDropMe = [
        {id:6,
            width:150,
            coords:{top:140,left:false},
            noSelect:true,
            style:{background: `tomato`,color: `wheat`,cursor: `pointer`},
            styleOnLostCapture:{background: `red`,color: `wheat`,cursor: `grab`},
            styleOnMove:{ background: `green`,color: `wheat`,boxShadow: `10px 10px 5px 0px rgba(0,0,0,0.75)`,cursor: `grabbing`},
            styleOnCapture:false,
            data:`<div style="padding: 10px">Suspendisse non nisl sit amet velit hendrerit rutrum. Nunc nec neque. Maecenas nec odio et ante tincidunt tempus. Praesent nonummy mi in odio. Fusce egestas elit eget lorem. 1Suspendisse non nisl sit amet velit hendrerit rutrum. Nunc nec neque. Maecenas nec odio et ante tincidunt tempus. Praesent nonummy mi in odio. Fusce egestas elit eget lorem. 2</div>`},
        {id:1,
            width:100,
            coords:{top:40,left:false},
            noSelect:false,
            style:{borderRadius: 5,border:`2px solid red`},
            styleOnLostCapture:false,
            styleOnMove:false,
            styleOnCapture:false,
            data:'Praesent turpis. Fusce egestas elit eget lorem.'},
        {id:5,
            width:150,
            coords:{top:40,left:false},
            noSelect:false,
            style:{borderRadius:20,border:`1px solid #020227`,background:`#1d1de0`, color: `#d2c3a8`},
            styleOnLostCapture:{borderRadius:20,border:`1px solid #020227`,background:`#111173`, color: `#d2c3a8`},
            styleOnMove:{borderRadius:20,border:`1px solid #020227`,background:`#070742`, color: `#d2c3a8`},
            styleOnCapture:false,
            data:`<div style="padding: 15px">1 Phasellus magna.Donec orci lectus  hendrerit rutrum. Nunc nec neque. Maecenas nec Nunc nec neque. Maecenas nec Nunc nec neque. Maecenas nec Nunc nec neque. Maecenas nec</div>`},
        {id:2,
            width:50,
            coords:{top:40,left:false},
            noSelect:true,
            style:false,
            styleOnLostCapture:false,
            styleOnMove:false,
            styleOnCapture:false,
            data:`Phasellus magna.Donec orci lectus  hendrerit rutrum. Nunc nec neque. Maecenas nec `},
        {id:4,
            width:80,
            coords:{top:40,left:false},
            noSelect:true,
            style:{background: `transparent`,color:`white`},
            styleOnLostCapture:{background: `transparent`,color:`white`},
            styleOnMove:{background: `transparent`,filter: `blur(1px)`,color:`white`},
            styleOnCapture:false,
            data:'Praesent turpis. Fusce egestas elit eget lorem.turpis. Fusce egestas elit eget lorem.turpis. Fusce egestas elit eget lorem.'},
        {id:3,
            width:180,
            coords:{top:40,left:false},
            noSelect:true,
            style:false,
            styleOnLostCapture:false,
            styleOnMove:false,
            styleOnCapture:false,
            data:`Suspendisse non nisl sit amet velit hendrerit rutrum. Nunc nec neque. Maecenas nec odio et ante tincidunt tempus. Praesent nonummy mi in odio. Fusce egestas elit eget lorem. 1`},
    ];


    return (<>
    <h3>DragMeDropMe -- free</h3>

        <ItemDDme
            noSelect={true}
            style={{
                background:`blue`,
                color:`green`,
                zIndex:999,
                width:100,
                position:`absolute`,
                padding: 10,
                textAlign: `center`,
                border: `1px solid black`}}
       >
            Drag me!
        </ItemDDme>

   <DragMeDropMe
       size={{width:`90%`,height:`68%`,left: `5%`}}
       styleFoItms={{background:`blue`}}
       shadowEffect={ {filter:`blur(1px)`}}
       itemslist={itemslistForDragMeDropMe}
       callback={e => console.log(1)}
   >
       Phasellus magna. Suspendisse eu ligula.

       Vestibulum volutpat pretium libero. Integer tincidunt.

       Quisque malesuada placerat nisl. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede.
   </DragMeDropMe>

<div
    style={{
        position: `absolute`,
        bottom: 10,
        top: `73%`,
    }}
>

    <h3>DropMe -- line</h3>


        <DropMe
            columns={3}
            wrapperWidth={500}
            height={10}
            callback={e => console.log(e)}
        >
            <DragMe
                id={1}
                height={200}
                shadow={true}
            >
                <div>
                    Curabitur blandit mollis lacus. Praesent nonummy mi in odio. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Praesent ac sem eget est egestas volutpat.
                </div>
            </DragMe>

            <DragMe
                id={2}
                height={250}
                shadow={true}
            >
                <div>
                    Curabitur blandit mollis lacus. Praesent nonummy mi in odio. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Praesent ac sem eget est egestas volutpat.
                </div>
            </DragMe>

            <DragMe
                id={3}
                height={200}
                shadow={true}
            >
                <div>
                    Curabitur blandit mollis lacus. Praesent nonummy mi in odio. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Praesent ac sem eget est egestas volutpat.
                </div>
            </DragMe>

        </DropMe>
</div>
        </>);







};


export default App;