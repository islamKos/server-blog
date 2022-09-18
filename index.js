import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations.js'
import handleValidationErrors from './utils/handleValidationErrors.js'

import checkAuth from './utils/checkAuth.js'

import { register, login, getMe } from './controllers/UserController.js'
import {
  getAll,
  getOne,
  remove,
  create,
  update,
} from './controllers/PostController.js'

mongoose
  .connect(
    'mongodb+srv://islamKos:samsung06@cluster1.qkq6te2.mongodb.net/Is_blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err))

const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

app.use(express.json())
app.use('/uploads', express.static('fuploads'))

app.post('/auth/login', loginValidation, handleValidationErrors, login)
app.post('/auth/register', registerValidation, handleValidationErrors, register)
app.get('/auth/me', checkAuth, getMe)

// Запросы постов
app.get('/posts', getAll)
app.get('/posts/:id', getOne)
app.delete('/posts/:id', checkAuth, remove)
app.post(
  '/posts',
  checkAuth,
  handleValidationErrors,
  postCreateValidation,
  create
)
app.patch(
  '/posts/:id',
  checkAuth,
  handleValidationErrors,
  postCreateValidation,
  update
)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})

app.listen(3003, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Server started on 3003')
})
