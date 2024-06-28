import express from 'express'
import {  deleteUrl, getAllUrls, getAnalytics,  getUrls,  postUrlData, redirectToUrl } from '../controllers/urlController'
import { vertifyJwt } from '../middleware/verifyJwt'
import restrictTo from '../middleware/authorization'

const router= express.Router()

router.post('/', vertifyJwt, postUrlData)

router.get('/:id', vertifyJwt, redirectToUrl)

router.get('/analytics/:id', vertifyJwt, getAnalytics)

router.post('/getAllUrls', vertifyJwt, restrictTo(['NORMAL','ADMIN']) , getUrls)

router.post('/admin/urls', vertifyJwt, restrictTo(['ADMIN']), getAllUrls)

router.delete('/remove/:id', vertifyJwt , deleteUrl )

export default router