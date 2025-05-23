/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { toggleFavoriteStatus } from '../api/product-api';

const ProductCard = ({ item, onAddToCart, onToggleFavorite }: any) => {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const discount =
    item.originalPrice && item.originalPrice > item.price
      ? Math.round(
          ((item.originalPrice - item.price) / item.originalPrice) * 100,
        )
      : 0;

  const handleAdd = () => {
    setIsAdded(true);
    onAddToCart(item, quantity);
  };

  const increment = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onAddToCart(item, newQty);
  };

  const decrement = () => {
    const newQty = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQty);
    onAddToCart(item, newQty);
  };

  const toggleFavorite = async () => {
    const newState = !isFavorite;
    setIsFavorite(newState); // Optimistic UI update

    try {
      await toggleFavoriteStatus(item._id, newState); // Sync with backend
      onToggleFavorite?.(item._id, newState); // Optional callback
    } catch (error) {
      // Rollback UI change if API call fails
      setIsFavorite(!newState);
      console.error('Failed to toggle favorite:', error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.images[0] }} style={styles.cardImage} />
        <TouchableOpacity style={styles.heartIcon} onPress={toggleFavorite}>
          <IconButton icon={isFavorite ? 'heart' : 'heart-outline'} size={28} />
        </TouchableOpacity>
        {item.bestSeller && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>BEST SELLER</Text>
          </View>
        )}
      </View>

      <Text style={styles.cardName} numberOfLines={2}>
        {item.title}
      </Text>

      <View style={styles.priceRow}>
        <Text style={styles.cardPrice}>₹{item.price}</Text>
        {item.originalPrice && item.originalPrice > item.price && (
          <>
            <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
            <Text style={styles.discount}>{discount}% off</Text>
          </>
        )}
      </View>

      {!isAdded ? (
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addText}>ADD TO CART</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={decrement} style={styles.qtyButton}>
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyCount}>{quantity}</Text>
          <TouchableOpacity onPress={increment} style={styles.qtyButton}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    width: 180,
    margin: 8,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  cardImage: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
  },
  heartIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  badge: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: '#FFD700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  cardName: {
    marginTop: 6,
    fontWeight: '600',
    fontSize: 14,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: '#999',
    marginLeft: 6,
  },
  discount: {
    fontSize: 12,
    color: '#0a9f0a',
    marginLeft: 6,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#0a9f0a',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  qtyRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  qtyButton: {
    backgroundColor: '#f0f0f0',
    padding: 6,
    borderRadius: 4,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  qtyCount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
