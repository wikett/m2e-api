import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy, resetDB} from './controller'
import { schema } from './model'
export Product, { schema } from './model'

const router = new Router()
const { name, photo, category, price, stock } = schema.tree

/**
 * @api {post} /products Create product
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Product's name.
 * @apiParam photo Product's photo.
 * @apiParam category Product's category.
 * @apiParam price Product's price.
 * @apiParam stock Product's stock.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name, photo, category, price, stock }),
  create)

  /**
   * @api {get} /products/reset Reset DB
   * @apiName RetrieveProduct
   * @apiGroup Product
   * @apiSuccess {Object} OK response.
   * @apiError {Object} 400 Some parameters may contain invalid values.
   * @apiError 404 Product not found.
   */
  router.get('/reset',
    resetDB)

/**
 * @api {get} /products Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Product
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of products.
 * @apiSuccess {Object[]} rows List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /products/:id Retrieve product
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get('/:id',
  show)



/**
 * @api {put} /products/:id Update product
 * @apiName UpdateProduct
 * @apiGroup Product
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Product's name.
 * @apiParam photo Product's photo.
 * @apiParam category Product's category.
 * @apiParam price Product's price.
 * @apiParam stock Product's stock.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  body({ name, photo, category, price, stock }),
  update)

/**
 * @api {delete} /products/:id Delete product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  destroy)

export default router
