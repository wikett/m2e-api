import { success, notFound } from '../../services/response/'
import { Product } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Product.create(body)
    .then((product) => product.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Product.count(query)
    .then(count => Product.find(query, select, cursor)
      .then((products) => ({
        count,
        rows: products.map((product) => product.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? product.view() : null)
    .then(success(res))
    .catch(next)

export const resetDB = ({params}, res, next) =>
{
  console.log(`resetDB`)

  //Red T-shirt
  Product.findOneAndUpdate({_id: "5bd0ae2da9fbe5a84494f843"}, {$set: {"stock": 6}}) //red t-shirt
    .then(
      Product.findOneAndUpdate({_id: "5bd0ae1ea9fbe5a84494f842"}, {$set: {"stock": 6}}) //yellow t-shirt
        .then(
          Product.findOneAndUpdate({_id: "5bd0ae10a9fbe5a84494f841"}, {$set: {"stock": 5}}) //pink t-shirt
            .then(
              Product.findOneAndUpdate({_id: "5bd0ade6a9fbe5a84494f840"}, {$set: {"stock": 20}}) //bed slippers
                .then(
                  Product.findOneAndUpdate({_id: "5bd0adc4a9fbe5a84494f83f"}, {$set: {"stock": 8}}) //parka
                    .then(
                      Product.findOneAndUpdate({_id: "5bd0ad99a9fbe5a84494f83e"}, {$set: {"stock": 9}}) //trainers
                        .then(
                          Product.findOneAndUpdate({_id: "5bd0ad4ea9fbe5a84494f83d"}, {$set: {"stock": 10}}) //black shoes
                            .then(
                              Product.findOneAndUpdate({_id: "5bd0ad14a9fbe5a84494f83c"}, {$set: {"stock": 2}}) //blue jeans
                                .then(
                                  Product.findOneAndUpdate({_id: "5bd0aceea9fbe5a84494f83b"}, {$set: {"stock": 7}}) //brown shoes
                                    .then(
                                      Product.findOneAndUpdate({_id: "5bd0acafa9fbe5a84494f83a"}, {$set: {"stock": 8}}) //black jeans
                                        .then(
                                          Product.findOneAndUpdate({_id: "5bd0ac7ea9fbe5a84494f839"}, {$set: {"stock": 11}}) //blues t-shirt
                                            .then(
                                              Product.findOneAndUpdate({_id: "5bd0ac7ea9fbe5a84494f839"}, {$set: {"stock": 11}}) //blues t-shirt
                                              .then(res.status(200).send('OK'))
                                              .catch(next)
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    )

}

export const update = ({ bodymen: { body }, params }, res, next) =>
{
  console.log(`update body: ${JSON.stringify(body, null, 4)}`);
  Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? Object.assign(product, body).save() : null)
    .then((product) => product ? product.view(true) : null)
    .then(success(res))
    .catch(next)
}
export const destroy = ({ params }, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? product.remove() : null)
    .then(success(res, 204))
    .catch(next)
