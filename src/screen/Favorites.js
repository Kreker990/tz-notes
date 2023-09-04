import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import NoteCard from '../components/NoteCard';
import VerticalIndent from '../components/VerticalIndent';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { colors, widthScale } from '../common/commonStyle';
import HorizontallIndent from '../components/HorizontallIndent';
import SearchBlock from '../components/SearchBlock';

const Favorites = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(s => s.notes)
    const [search, setsearch] = useState('')
    const renderItem = ({ item, index }) => {
        return (
            <NoteCard item={item} index={index + 1} />
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.headerBlock}>
                <TouchableOpacity onPress={() => navigation.navigate('main')}>
                    <FontAwesome name="arrow-left" size={24} color={colors.black} />
                </TouchableOpacity>
                <HorizontallIndent width={10} />
                <Text style={styles.headerText}>Избранные</Text>
            </View>
            <SearchBlock search={search} setsearch={setsearch} />
            <FlatList
                data={data
                    ? data.filter(
                        (item) => search.length > 0
                            ? item.title?.toLowerCase()?.indexOf(search.toLowerCase()) >= 0
                            : true
                    ).filter(el => el.favorite == 1)
                    : data.filter(el => el.favorite == 1)
                }
                ListHeaderComponent={<VerticalIndent height={20} />}
                ListFooterComponent={<VerticalIndent height={20} />}
                ListEmptyComponent={
                    <View style={styles.notFound}>
                        <VerticalIndent height={30} />
                        <AntDesign name="frowno" size={100} color={colors.orange} />
                        <VerticalIndent height={20} />
                        <Text style={styles.notFoundText}>пусто...</Text>
                    </View>
                }
                renderItem={renderItem}
                ItemSeparatorComponent={<VerticalIndent height={20} />}
            />
            <TouchableOpacity style={styles.addButton}
                onPress={() => navigation.navigate('noteAdd')}
            >
                <Ionicons name="add-circle" size={54} color={colors.orange} />
            </TouchableOpacity>
        </View>
    )
}

export default Favorites

const styles = StyleSheet.create({
    headerBlock: {
        paddingHorizontal: widthScale * 15,
        backgroundColor: colors.orange,
        height: 72,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 22,
        color: colors.black,
        fontWeight: 600
    },
    favoriteText: {
        fontSize: 18,
        color: colors.black,
        fontWeight: 600,
        textDecorationLine: 'underline',
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        padding: 5,
    },
    notFound: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    notFoundText: {
        fontSize: 18,
        fontWeight: 600,
    }
})