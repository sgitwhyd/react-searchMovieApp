import React, { useState } from 'react';
import axios from 'axios'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
const env = require('dotenv').config()

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: 400,
  },
  input: {
    paddingLeft: '20px',
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  rootCard: {
    maxWidth: 345,
    marginTop: '5vh'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  loading: {
    textAlign: "center"
  }
}));

const Navbar = () => {


  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [movie, setMovie] = useState({})

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [search, setSearch] = useState()
  const [error, setError] = useState()
  const searchMovie = () => {
    axios.get(`${process.env.REACT_APP_API}t=${search}`)
      .then(res => {
        setMovie(res.data)
        setError(res.data.Error)
      })
  }

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth='sm'>
        <div className={classes.root}>
          <Paper component="form" style={{ marginTop: '5vh' }}>
            <InputBase
              className={classes.input}
              placeholder="Find Movies"
              value={search}
              onChange={(e) => { setSearch(e.target.value) }}
              onKeyUp={searchMovie}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          {
            search ? (
              error ? (
                <div className={classes.loading}>
                  <h1>No Movies Found</h1>
                </div>
              ) : (
                  <Card className={classes.rootCard}>
                    <CardHeader
                      title={movie.Title}
                      subheader={movie.Released}
                    />
                    <CardMedia
                      className={classes.media}
                      image={movie.Poster}
                      title={movie.title}
                    />
                    <CardContent>
                      <Typography >Plot :</Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {movie.Plot}
                      </Typography>
                      <Typography style={{ marginTop: '10px' }}>Actors :</Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {movie.Actors}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>Writer :</Typography>
                        <Typography paragraph>
                          {movie.Writer}
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                )
            ) : (
                <div className={classes.loading}>
                  <h1>No Movies Search</h1>
                </div>
              )
          }
        </div >
      </Container>
    </Fragment>
  );
}

export default Navbar;
