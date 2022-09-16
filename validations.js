import { body } from 'express-validator'

export const loginValidation = [
  body('email', 'Неверный формат email').isEmail(),
  body('password', 'Минимальная длина пароля 5 символов').isLength({ min: 5 }),
]

export const registerValidation = [
  body('email', 'Неверный формат email').isEmail(),
  body('password', 'Минимальная длина пароля 5 символов').isLength({ min: 5 }),
  body('fullName', 'Минимальная длина имени 3 символа').isLength({ min: 3 }),
  body('avatarUrl', 'Неверно указана аватарка').optional().isURL(),
]

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
  body('tags', 'Неверный формат тега').optional().isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]
