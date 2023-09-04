import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from '../redux/actions/getNotes';
import { colors, widthScale } from '../common/commonStyle';
import NoteCard from '../components/NoteCard';
import VerticalIndent from '../components/VerticalIndent';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import SearchBlock from '../components/SearchBlock';
import HorizontallIndent from '../components/HorizontallIndent';

const Main = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [dataArr, setdataArr] = useState([]);
    const [dataArrSor, setdataArrSort] = useState([]);
    const [sortArr, setSortArr] = useState(false);
    const [search, setsearch] = useState('');

    useEffect(() => {
        dispatch(getNotes());
    }, []);

    const { data, loading, error } = useSelector((state) => state.notes);

    const renderItem = ({ item, index }) => {
        return <NoteCard item={item} index={index + 1} />;
    };

    useEffect(() => {
        if (!sortArr) {
            setdataArr(data);
        } else {
            setdataArr(dataArrSor);
        }
    }, [sortArr, data, dataArrSor]);

    useEffect(() => {
        const sortByKeyWithMixedLocale = (data, key) => {
            const arr = [...data].sort((a, b) => {
                const itemA = a[key];
                const itemB = b[key];
                return itemA.localeCompare(itemB, 'ru', { sensitivity: 'base' });
            });
            setdataArrSort(arr);
        };
        sortByKeyWithMixedLocale(data, 'title');
    }, [data]);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.headerBlock}>
                <Text style={styles.headerText}>Заметки</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => setSortArr(!sortArr)}>
                        <MaterialCommunityIcons
                            name="sort-alphabetical-ascending"
                            size={24}
                            color={sortArr ? colors.white : colors.gray}
                        />
                    </TouchableOpacity>
                    <HorizontallIndent width={10} />
                    <TouchableOpacity onPress={() => navigation.navigate('favorites')}>
                        <Text style={styles.favoriteText}>Избранные</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <SearchBlock search={search} setsearch={setsearch} />
            <FlatList
                data={
                    dataArr
                        ? dataArr.filter(
                            (item) =>
                                search.length > 0
                                    ? item.title?.toLowerCase()?.indexOf(search.toLowerCase()) >= 0
                                    : true
                        )
                        : dataArr
                }
                ListHeaderComponent={<VerticalIndent height={10} />}
                ListFooterComponent={<VerticalIndent height={10} />}
                ListEmptyComponent={<View style={styles.notFound}>
                    <VerticalIndent height={30} />
                    <AntDesign name="frowno" size={100} color={colors.orange} />
                    <VerticalIndent height={20} />
                    <Text style={styles.notFoundText}>пусто...</Text>
                </View>}
                renderItem={renderItem}
                ItemSeparatorComponent={<VerticalIndent height={15} />}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('noteAdd')}
            >
                <Ionicons name="add-circle" size={54} color={colors.orange} />
            </TouchableOpacity>
        </View>
    );
};

export default Main;

const styles = StyleSheet.create({
    headerBlock: {
        paddingHorizontal: widthScale * 15,
        backgroundColor: colors.orange,
        height: 72,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 22,
        color: colors.black,
        fontWeight: 600,
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
});
