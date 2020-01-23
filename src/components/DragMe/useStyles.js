import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({

    wrapper:{
       userSelect: `none`,

    },
    item:{
        position: `absolute`,
        cursor: `pointer`,
        margin: `auto`,
        userSelect: `none`,
    },
    img:{
        userSelect: `none`,
        pointerEvents: `none`,
    },
}));




export default useStyles;