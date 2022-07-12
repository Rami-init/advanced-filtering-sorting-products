import React from 'react'
import { AppBar, Toolbar, Typography, Grid, Box } from '@mui/material'
import { Link } from 'react-router-dom';
const pages = [
  {page: 'Home', path: '/'}, 
  {page: 'Posts', path: '/posts'}, 
  {page: 'Create-Post', path: '/create'}
];
const NavBar = () => {
  return (
    <AppBar position='static' sx={{bgcolor:'primary.main'}}>
      <Toolbar >
        <Grid container>
          <Grid item xs={1}>
            <Typography varaint='h6' component='h1'><Link to='/'>RamiMui</Link></Typography>
          </Grid>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs>
            <Box sx={{display: 'flex'}}>
            <Typography varaint='h6' component='h1' paddingRight={4}><Link to='/posts'>Posts</Link></Typography>
            <Typography varaint='h6' component='h1'><Link to='/create'>Create Posts</Link></Typography>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar


