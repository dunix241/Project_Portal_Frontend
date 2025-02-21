export default function (product) {
  const finalProduct = {
    ...product,
    price: priceMapper(product.prices),
    discount: discountMapper(product.discounts),
    rating: ratingMapper(product.ratings),
    label: labelMapper(product),
  };
  if (finalProduct.images) {
    finalProduct.images = finalProduct.images.map(imgMapper);
    finalProduct.img = finalProduct.images[0];
  }
  if (finalProduct.variations) {
    finalProduct.variations = finalProduct.variations.map(variationMapper);
  }
  return finalProduct;
}

export function imgMapper(img) {
  return `${img.url}/${img.name}.${img.extension}`;
}

export function imgRollMapper(images, capacity) {
  const arr = [];
  for (let i = 0; i < Math.min(capacity, images.length); i += 1) {
    arr.push({
      img: images[i],
      id: i
    })
  }
  return arr;
}

export function priceMapper(prices) {
  return prices?.reduce((price, prev) => price.dateSet > prev.dateSet ? price : prev).amount
}

export function variationMapper(variation) {
  return variation.variation;
}

export function discountMapper(discounts) {
  let max = 0;
  if (discounts?.length > 0) {
    max = Math.max(max, ...(discounts.map(discount => discount.discount.amount)))
  }
  return max;
}

export function ratingMapper(ratings) {
  let total = 0;
  if (ratings?.length > 0) {
    total = ratings.sum(rating => rating.value) / ratings.length;
  }
  return total;
}

export function labelMapper(product) {
  if (product.status === 'Unavailable' || product.status === 'Ceased') {
    return product.status;
  }

  if (product.quantity === 0) {
    return 'Out of stock';
  }

  if (product.discount) {
    return 'Sale'
  }

  if (countDays(new Date(), new Date(product.dateAdded?.split('T')[0])) < 30) {
    return 'New'
  }

  if (product.quantity < 4) {
    return 'Low stock';
  }

  return null;
}

function countDays(firstDate, secondDate) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

export function labelColorMapper(label) {
  return label === 'Sale' || label === 'Out of stock' ? 'error' : (label === 'New' ? 'info' : 'warning')
}