import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { styled, makeStyles } from '@material-ui/core/styles';

import { boardPath } from 'routes';
import { createBoard, useBoardsForUser } from 'services/boards';

import AddIcon from '@material-ui/icons/Add';
import {
  Container,
  Button,
  CardActions,
  CardContent,
  Typography,
  Fab,
  Grid,
  Hidden,
  Card,
  Fade,
  Slide
} from '@material-ui/core';

import { Seo, Link } from 'components';

const AddBtn = styled(Fab)({
  position: 'fixed',
  bottom: 48,
  right: 48
});

const useStyles = makeStyles({
  title: {
    fontSize: 14
  }
});

const Dashboard = ({ user }) => {
  const history = useHistory();
  const classes = useStyles();

  const [boards, loadingBoards, errorBoards, setBoards] = useBoardsForUser(user && user.uid);

  const handleCreateBoard = async () => {
    try {
      const board = await createBoard(user.uid);
      history.push(boardPath(board.id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth={'md'}>
      <Seo title={'Dashboard'}/>

      <Grid container>
        {/* <Hidden xsDown>
          <Grid item sm={3}>
            more on this later...
          </Grid>
        </Hidden> */}

        <Grid item xs={12} >
          <Typography variant={'h5'} gutterBottom>Boards</Typography>
          <Grid container direction={'row'} spacing={3}>

            {boards && Object.values(boards).map((board) => (

              <Fade key={board.id} timeout={300} in mountOnEnter unmountOnExit>
                <Grid item xs={3}>
                  <Link to={boardPath(board.id)}>

                    <Card variant="outlined" elevation={0}>
                      <CardContent>
                        <Typography variant="h5" component="h2">{board.title}</Typography>

                        <Typography className={classes.pos} color="textSecondary">Created by: Eric Leong</Typography>
                        <Typography className={classes.title} color="textSecondary">Dream Team</Typography>

                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              </Fade>
            ))}

          </Grid>
        </Grid>

      </Grid>

      <Slide direction="up" timeout={800} in mountOnEnter unmountOnExit>
        <AddBtn color="primary" aria-label="add" onClick={handleCreateBoard}>
          <AddIcon />
        </AddBtn>
      </Slide>

    </Container>
  );
};

export default Dashboard;
