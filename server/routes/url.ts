import express from 'express'
import {  deleteUrl, getAllUrls, getAnalytics,  getUrls,  postUrlData, redirectToUrl } from '../controllers/urlController'


const router= express.Router()

router.post('/',  postUrlData)

router.get('/:id',  redirectToUrl)

router.get('/analytics/:id', getAnalytics)

router.post('/getAllUrls', getUrls)

router.post('/admin/urls',getAllUrls)

router.delete('/remove/:id',  deleteUrl )

export default router