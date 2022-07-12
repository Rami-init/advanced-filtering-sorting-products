import React from 'react'
import {Avatar, Card, CardContent, Typography, CardHeader, Rating, CardActions, Button} from '@mui/material'
const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2 
 })
const Post = ({post}) => {
  return (
    <Card>
        <CardHeader
            avatar={<Avatar/>}
            title={<Typography variant='h6'>{post.name}</Typography>}
        />
        <CardContent>
            <Typography variant='body2'>{post.description}</Typography>
            <Typography variant='body1'>{formatter.format(post.price)}</Typography>
            <Rating
            name={post.name}
            value={post.rating}
            readOnly
            precision={0.5}
            size='small'
            />
        </CardContent>
        <CardActions>
            <Button variant='contained' size='small' sx={{bgcolor:'primary.main'}}>Book Now</Button>
            <Button variant='contained' size='small' sx={{bgcolor: 'text.secondary'}}>show more</Button>
        </CardActions>
    </Card>
  )
}

export default Post