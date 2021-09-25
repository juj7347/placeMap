import { AppBar, Toolbar, Typography, Box} from "@material-ui/core"

import useStyles from './styles'



const Header = () => {
    const classes = useStyles()

    return (
        <AppBar position='static' color="transparent">
            <Toolbar className={classes.toolbar}>
                <Box display="flex">
                    <Typography variant='h5' className={classes.title}>
                        NAVER PLACE
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>

    )
}

export default Header 