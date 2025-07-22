import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  id: { 
    type: String, 
    required: true 
  },
  volumeInfo: {
    title: { 
      type: String, 
      required: true 
    },
    authors: [
      { 
        type: String 
      }
    ],
    publisher: { 
      type: String 
    },
    publishedDate: { 
      type: Date 
    },
    description: { 
      type: String 
    },
    imageLinks: {
      smallThumbnail: { 
        type: String 
      },
      thumbnail: { 
        type: String 
      },
    },
  },
  saleInfo: {
    saleability: { 
      type: String, 
      enum: ['FOR_SALE', 'NOT_FOR_SALE'], 
      required: true 
    },
    listPrice: {
      amount: { 
        type: Number, 
        required: true 
      },
      currencyCode: { 
        type: String 
      }
    },
  },
  accessInfo: {
  webReaderLink: { type: String }
}

});

// Indexing userId for performance optimization
cartSchema.index({ userId: 1 });

// Ensure the id field is unique if necessary
cartSchema.index({ id: 1, userId: 1 }, { unique: true });

const CartItem = mongoose.model('CartItem', cartSchema);

export default CartItem;
