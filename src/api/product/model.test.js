import { Product } from '.'

let product

beforeEach(async () => {
  product = await Product.create({ name: 'test', photo: 'test', category: 'test', price: 'test', stock: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = product.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(view.name).toBe(product.name)
    expect(view.photo).toBe(product.photo)
    expect(view.category).toBe(product.category)
    expect(view.price).toBe(product.price)
    expect(view.stock).toBe(product.stock)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = product.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(view.name).toBe(product.name)
    expect(view.photo).toBe(product.photo)
    expect(view.category).toBe(product.category)
    expect(view.price).toBe(product.price)
    expect(view.stock).toBe(product.stock)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
