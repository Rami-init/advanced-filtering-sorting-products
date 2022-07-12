const Posts = require('../models/Posts')
const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middleware/asyncHandler')

exports.getAllPosts = asyncHandler(async(req, res, next)=>{
    let query
    let queryStr = {...req.query}
    let removeField = ["sort", "limit"]
    let uiValue = {
        filtering: {},
        sorting: {}
    }
    removeField.forEach(val => delete queryStr[val])
    const filterKeys = Object.keys(queryStr)
    const filterValue = Object.values(queryStr)
    filterKeys.forEach((val, idx)=> uiValue.filtering[val] = filterValue[idx])
    queryStr = JSON.stringify(queryStr)
    queryStr = queryStr.replace(/\b(lte|lt|gt|gte|in)\b/g, (match)=> `$${match}`) 
    const maxPrice = await Posts.find().sort({price: '-1'}).limit(1).select('-_id price')
    const minPrice = await Posts.find().sort({price: '1'}).limit(1).select('-_id price')
    uiValue.maxPrice = maxPrice[0].price
    uiValue.minPrice = minPrice[0].price
    //    /\b(lte|lt|gt|gte|in)\b/g filter  { price: { $lte: '500' }} ----- sort sort({-price name})
    console.log(uiValue)
   query = Posts.find(JSON.parse(queryStr))
   if(req.query.sort){
    let sortByArr = req.query.sort.split(",")
    sortByArr.forEach((val)=>{
        let order
        if(val[0] === '-'){
            order='descending'
        } else {
            order = 'ascending'
        }
        uiValue.sorting[val.replace('-', '')] = order
    })
    sortByArr = sortByArr.join(" ")
    console.log(sortByArr)
    query = await query.sort(sortByArr)
    
   }else {
       query = await query.sort('-price')
   }
   res.status(200).json({
       success: true,
       data: query,
       uiValue
   })
})
exports.createPosts =asyncHandler(async(req, res, next)=>{
    const posts = await Posts.create(req.body)
    res.status(200).json({
        success: true,
        data: posts
    })
 })
exports.updatePosts =asyncHandler(async(req, res, next)=>{
    const postId = req.params.id
    let post = await Posts.findById(postId)
    if(!post) {
        return next(new ErrorResponse('the post with id not found', 404))
    }
    post = await Posts.findByIdAndUpdate(postId, req.body, {new: true, runValidators: true})
    res.status(201).json({
        success: true,
        data: post
    })

})
exports.deletePosts = async(req, res, next)=>{
    const postId = req.params.id
    let post = await Posts.findById(postId)
    if(!post) {
        return next(new ErrorResponse(`the post with id: ${postId} is not found`, 404))
    }
    await post.remove()
    res.status(200).json({
        success: true,
        data: `The Post has been deleted successfuly`
    })
}