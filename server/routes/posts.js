const router = require('express').Router();
const auth = require('../auth');
const { check, validationResult } = require('express-validator');

const Post = require('../models/Post');

router.get('/', async (req, res) => {
  try {
    let posts = await Post.findAll({
      limit: 72,
      order: [['createdAt', 'ASC']]
    });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // console.log(req.body);

  try {
    const newPost = new Post({
      title: req.body.title,
      body: req.body.body,
      date: req.body.date
    });

    const post = await newPost.save();

    return res.json(post);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

router.put('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id, title, body } = req.body;
  try {
    const post = Post.update({ title, body }, { where: { id } });
    // console.log(post);
    return res.json(post);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const post = Post.destroy({ where: { id } });
    console.log(post);
    res.status(200).json(JSON.stringify(post));
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
