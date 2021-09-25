import PropTypes from 'prop-types';
import { makeStyles, Paper, Typography, Grid, IconButton, Toolbar } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  toolbarSecondary: {
    justifyContent: "space-between"
  },
  goBack: {
    zIndex: 100
  }
}));

export default function MainFeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${post.image})` }}>
        <Link to='/'>
        <IconButton className={classes.goBack} onClick={post.handleClose} color="secondary">
            <ArrowBack/>
        </IconButton>
        </Link>
        {/* Increase the priority of the hero background image */}
        {/*<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />*/} {/*뭔지 모르겠음 */}
        <div className={classes.overlay} />
        <Grid container>
            <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    {post.title}
                </Typography>
                <Typography variant="subtitle1">
                    {post.reviewCount}
                </Typography>
                </div>
            </Grid>
        </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
};