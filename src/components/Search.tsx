import { useState } from "react"
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // or react-native-vector-icons

type SearchBarProps = {
    onSearch?: (text:string) => void;
}

const SearchBar = ({ onSearch }:SearchBarProps ) => {

    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        if (onSearch){
            onSearch(searchText);
        }
    };

    const clearSearch = () => {
        setSearchText('');
        if (onSearch){
            onSearch('');
        }
    };


    return (
        <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={'Search...'}
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom : 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;