import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {UserOctagon, Back} from 'iconsax-react-native';

const API_URL = 'http://10.0.2.2:8088';

const HomeScreen = ({navigation, route}: any) => {
  const {email} = route.params;
  const [categories, setCategories] = useState<any[]>([]);
  const [topSellingProducts, setTopSellingProducts] = useState<any[]>([]);
  const [priceProducts, setPriceProducts] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchTopSellingProducts();
    fetchProductsByPrice(page);
  }, [page]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTopSellingProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products/top-selling`);
      setTopSellingProducts(response.data);
    } catch (error) {
      console.error('Error fetching top selling products:', error);
    }
  };

  const fetchProductsByPrice = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/api/products/sorted?page=${page}`,
      );
      setPriceProducts(prevProducts => [...prevProducts, ...response.data]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sorted products:', error);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f4f4f4'}}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>
            <Back size="32" color="#FF8A65" />
          </Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={styles.avatarContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserProfileScreen', {email: email})
            }>
            <UserOctagon size="32" color="#FF8A65" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Danh mục sản phẩm */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Danh mục sản phẩm</Text>
        <FlatList
          data={categories}
          horizontal
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.categoryItem}>
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Top Selling Products */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Top 10 sản phẩm bán chạy</Text>
        <FlatList
          data={topSellingProducts}
          horizontal
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.productItem}>
              <Image
                source={{uri: item.images[0]}}
                style={styles.productImage}
              />
              <Text
                style={styles.productName}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text style={styles.productPrice}>
                <Text style={styles.originalPrice}>
                  {item.originalPrice} VND{' '}
                </Text>
                <Text style={styles.discountedPrice}>
                  {item.discountedPrice} VND
                </Text>
              </Text>
              <View style={styles.productRatings}>
                <Text style={styles.ratingText}>
                  Ratings: {item.ratings.average}
                </Text>
                <Text style={styles.soldText}>
                  Total Sold: {item.totalSold}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Lazy Loading for Products Sorted by Price */}
      <View style={{flex: 1}}>
        <Text style={styles.sectionTitle}>Sản phẩm theo giá tăng dần</Text>
        <FlatList
          data={priceProducts}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.productItem}>
              <Image
                source={{uri: item.images[0]}}
                style={styles.productImage}
              />
              <Text
                style={styles.productName}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text style={styles.productPrice}>
                <Text style={styles.originalPrice}>
                  {item.originalPrice} VND{' '}
                </Text>
                <Text style={styles.discountedPrice}>
                  {item.discountedPrice} VND
                </Text>
              </Text>
              <View style={styles.productRatings}>
                <Text style={styles.ratingText}>
                  Ratings: {item.ratings.average}
                </Text>
                <Text style={styles.soldText}>
                  Total Sold: {item.totalSold}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
          }
        />
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.footerText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    fontSize: 30,
    color: '#007aff',
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ddd',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#FF8A65',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 15,
    textAlign: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  categoryItem: {
    backgroundColor: '#f2f2f2',
    marginRight: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007aff',
  },
  productItem: {
    width: 195,
    height: 240,
    marginHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 3},
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    width: '100%',
  },
  productPrice: {
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontSize: 14,
    color: '#FF6347',
  },
  productRatings: {
    marginTop: 5,
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
  },
  soldText: {
    fontSize: 12,
    color: '#007aff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerItem: {
    padding: 10,
  },
  footerText: {
    fontSize: 16,
    color: '#007aff',
  },
});

export default HomeScreen;
