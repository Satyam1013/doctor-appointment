/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useFavorites } from '../contexts/FavContext';

const ProductCard = ({ item, onAddToCart, onToggleFavorite }: any) => {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some((fav: any) => fav.product._id === item._id);

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

  const handleFavoriteToggle = () => {
    toggleFavorite(item._id, !isFavorite);
    if (onToggleFavorite) {
      onToggleFavorite(item._id, !isFavorite); // Notify parent (FavProductScreen)
    }
  };
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.heartIcon} onPress={handleFavoriteToggle}>
        <IconButton
          icon={isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          iconColor={isFavorite ? '#e53935' : '#555'}
        />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: Array.isArray(item.images) ? item.images[0] : item.images,
          }}
          style={styles.cardImage}
        />
        {item.bestSeller && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>BEST SELLER</Text>
          </View>
        )}
      </View>

      <Text style={styles.cardName} numberOfLines={1}>
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
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginTop: 10,
  },
  cardImage: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
  },
  heartIcon: {
    position: 'absolute',
    top: -8,
    right: -6,
    zIndex: 2,
  },
  badge: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: '#FFD700',
    paddingHorizontal: 6,
    paddingVertical: 6,
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
    margin: 'auto',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    margin: 'auto',
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
