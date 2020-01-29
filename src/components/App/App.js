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

import {DragMeDropMe} from '../DragMeDropMe';



const App = () => {


    const Itemslist = [
        {id:6,width:150,coords:{top:140,left:false},data:`Suspendisse non nisl sit amet velit hendrerit rutrum. Nunc nec neque. Maecenas nec odio et ante tincidunt tempus. Praesent nonummy mi in odio. Fusce egestas elit eget lorem. 1Suspendisse non nisl sit amet velit hendrerit rutrum. Nunc nec neque. Maecenas nec odio et ante tincidunt tempus. Praesent nonummy mi in odio. Fusce egestas elit eget lorem. 2`},
        {id:1,width:100,coords:{top:40,left:false},data:'Praesent turpis. Fusce egestas elit eget lorem.'},
        {id:5,width:150,coords:{top:40,left:false},data:`Phasellus magna.Donec orci lectus  hendrerit rutrum. Nunc nec neque. Maecenas nec Nunc nec neque. Maecenas nec Nunc nec neque. Maecenas nec Nunc nec neque. Maecenas nec `},
        {id:2,width:50,coords:{top:40,left:false},data:`Phasellus magna.Donec orci lectus  hendrerit rutrum. Nunc nec neque. Maecenas nec `},
        {id:4,width:80,coords:{top:40,left:false},data:'Praesent turpis. Fusce egestas elit eget lorem.turpis. Fusce egestas elit eget lorem.turpis. Fusce egestas elit eget lorem.'},
        {id:3,width:180,coords:{top:40,left:false},data:`Suspendisse non nisl sit amet velit hendrerit rutrum. Nunc nec neque. Maecenas nec odio et ante tincidunt tempus. Praesent nonummy mi in odio. Fusce egestas elit eget lorem. 1`},
    ];



    return (<>

   <DragMeDropMe
       Itemslist={Itemslist}
   />


    </>);
};


export default App;