import express from 'express'
import mongoose from 'mongoose'

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations.js'
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

app.use(express.json())

app.post('/auth/login', loginValidation, login)
app.post('/auth/register', registerValidation, register)
app.get('/auth/me', checkAuth, getMe)

// Запросы постов
app.get('/posts', getAll)
app.post('/posts', checkAuth, postCreateValidation, create)
app.get('/posts/:id', getOne)
app.delete('/posts/:id', checkAuth, remove)
app.patch('/posts/:id', checkAuth, update)

app.listen(3003, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Server started on 3003')
})
