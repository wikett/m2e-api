import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
  name: {
    type: String
  },
  photo: {
    type: String
  },
  category: {
    type: Number // 1 Coats-Jackets 2 T-shirts 3-Jeans 4-Shoes 
  },
  price: {
    type: Number,
    min: 0,
  },
  stock: {
    type: Number,
    min: 0,
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

productSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      photo: this.photo,
      category: this.category,
      price: this.price,
      stock: this.stock,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Product', productSchema)

export const schema = model.schema
export default model
