import React, { useEffect, useState } from 'react'
import {
    Container, Grid, Box, 
    CircularProgress, Typography, 
    Paper, Slider, TextField, 
    FormControl, RadioGroup, 
    FormControlLabel,
    Radio, Button
} from '@mui/material'
import axios from 'axios'
import Post from './Post.jsx'
import {useNavigate, useLocation} from 'react-router-dom'

const Posts = () => {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(false)
  const [maxSlider, setMaxSlider] = useState(1000)
  const [sliderRange, setSliderRange] = useState([23, 123])
  const [filter, setFilter] = useState('')
  const [priceOrder, setPriceOrder] = useState('ascending')
  const [sortPrice, setSortPrice] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const locationParams = location.search
  useEffect(()=>{
      let query;
      let cancel;
      const uiUpdateValue = (uiValue)=>{
        setMaxSlider(uiValue.maxPrice)
        if(uiValue.filtering.price){
            let priceFilter = uiValue.filtering.price
            setSliderRange([Number(priceFilter.gte), Number(priceFilter.lte)])
        }
        if(uiValue.sorting.price){
            let priceSorting = uiValue.sorting.price
            setPriceOrder(priceSorting)

        }
      }
      const fetchData = async ()=>{
          setLoading(true)
          try {
              if(locationParams && !filter) {
                query = locationParams
              }else {
                  query = filter
              }
              if(sortPrice) {
                  if(query.length === 0) {
                      query = `?sort=${sortPrice}`
                  }else {
                      query = query + `&sort=${sortPrice}`
                  }
              }
              const {data} = await axios({
                  method: 'GET',
                  url: `/api/posts${query}`,
                  cancelToken: new axios.CancelToken((c)=> cancel = c) 
              })
              setPosts(data.data)
              setLoading(false)
              uiUpdateValue(data.uiValue)
          } catch (error){
              if(axios.isCancel(error)) return;
              setError(error.response.data)
          }
      }
      fetchData()
      
      return ()=>cancel()
  },[filter, locationParams, sortPrice])
  const onChangeHandlerInput = (e, type) =>{
      let newValueInput;
      if(type === 'lower'){
        newValueInput = [...sliderRange]
        newValueInput[0] = Number(e.target.value)
        setSliderRange(newValueInput)
      }
      if(type === 'upper'){
        newValueInput = [...sliderRange]
        newValueInput[1] = Number(e.target.value)
        setSliderRange(newValueInput)
      }
  }
  const onBlurTextFieldCommitHandler = ()=>{
      onRangeSlider(sliderRange)
  }
  const onSliderCommitedSlider = (e, newValue)=>{
      onRangeSlider(newValue)
  }
  const onRangeSlider = (newValue)=>{
      let filterUrl = `?price[gte]=${newValue[0]}&price[lte]=${newValue[1]}`
      setFilter(filterUrl)
      navigate(filterUrl)

  }
  const handleSortRadio = (e)=> {
    setPriceOrder(e.target.value)
      if(e.target.value === 'descending') {
        setSortPrice('-price')
      }
      else if(e.target.value === 'ascending') {
        setSortPrice('price')
      }

  }
  const clearAllHandler = (e)=>{
    setSliderRange([0, maxSlider])
    setFilter('')
    setSortPrice('')
    navigate('/')

  }
  return (
    <Container maxWidth={'xl'}>
            <Paper sx={{marginTop:'1rem', padding: '1rem 2rem'}} elevation={3}>
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6} >
                        <Typography variant='h6'>Filter</Typography>
                        <Slider max={maxSlider}
                        min={0}
                        disabled={loading}
                        value={sliderRange}
                        valueLabelDisplay='auto'
                        onChange={(e, newValue)=> setSliderRange(newValue)}
                        onChangeCommitted={onSliderCommitedSlider}
                        
                        ></Slider>
                        <TextField 
                         sx={{ width: '48%'}} 
                         size='small'
                         variant='outlined'
                         label='min price'
                         id='lower'
                         type='number'
                         value={sliderRange[0]}
                         disabled={loading}
                         onChange={(e)=> onChangeHandlerInput(e, 'lower')}
                         onBlur={onBlurTextFieldCommitHandler} >
                        </TextField>
                        <TextField
                         sx={{marginLeft: '4%', width: '48%'}}    
                         size='small'
                         variant='outlined'
                         label='max price'
                         id='upper'
                         type='number'
                         value={sliderRange[1]}
                         disabled={loading}
                         onChange={(e)=> onChangeHandlerInput(e, 'upper')}
                         onBlur={onBlurTextFieldCommitHandler} >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='h6'>Sort By</Typography>
                        <FormControl component='fieldset'>
                            <RadioGroup aria-label='price-order' name='price-order' value={priceOrder} onChange={handleSortRadio} sx={{color:'text.secondary'}}>
                                <FormControlLabel disabled={loading} value='ascending' control={<Radio/>} label='Price: Lowest - highest'></FormControlLabel>
                                <FormControlLabel disabled={loading} value='descending' control={<Radio/>} label='Price: highest - Lowest'></FormControlLabel>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button variant='contained' size='small' sx={{bgcolor:'primary.main'}} onClick={clearAllHandler}>Clear All</Button>
            </Paper>
        <Grid container spacing={3} sx={{ marginTop: '1rem', marginBottom: '1rem'}}>
            {/* {filtering and sort} */}
            {/* {Posts List} */}
            {loading ? (
                <Box sx={{display: "flex", justifyContent: 'center', alginItem: 'center', width: '100%', height: '80vh'}}>
                    <CircularProgress size={'3rem'} thickness={5} sx={{marginTop: '30vh'}}></CircularProgress>
                </Box>
            ):error? (<>
            <Typography variant='h6' sx={{bgColor: 'error.main'}}>{error}</Typography>
            </>) :(posts.map((post)=>{
                return (
                    <Grid item xs={12} md={6} sm={6} lg={3} key={post._id}>
                           <Post post={post}></Post>
                    </Grid>
                )
            }))}
        </Grid>
    </Container>
  )
}

export default Posts