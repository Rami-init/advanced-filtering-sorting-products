const express = require("express");
const { getAllPosts, createPosts, updatePosts, deletePosts } = require("../controllers/posts");

const router = express.Router()

router.route('/').get(getAllPosts).post(createPosts)
router.route('/:id').put(updatePosts).delete(deletePosts)

module.exports = router