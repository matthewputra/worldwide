import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {connect} from 'react-redux'
import { types } from '../action';

const {width} = Dimensions.get('screen')

const MarkedItem = ({id , title, completed, total, removeItem}) => (
    <View style={styles.markedItem}>
        <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={() => removeItem(id)}>
                <Icon name="star" size={24} color="#888" />
            </TouchableOpacity>
        </View>
        <View style={{padding: 5}}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{completed}/{total} questions completed</Text>
        </View>
    </View>
)

const App = (props) => {

    const removeItem = (id) => {
        props.removeItem(id);
    }

    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Text>iKeep</Text>
            </View>
            <View style={styles.header}>
                <Text style={{fontSize: 24, fontWeight: '600'}}>Marked</Text>
                <Text style={{color: '#aaa'}}>Take a look at what lessons you have marked</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <View style={styles.MiniCardFirst}>
                        <Image
                            style={{width: "40%", height:"65%",borderRadius:50,alignSelf: "center"}}
                            source={require('../../Assets/Clip.png')}
                        />
                    </View>

                    <View style={styles.MiniCard}>
                        <Image
                            style={{width: "40%", height:"65%",borderRadius:50,alignSelf: "center"}}
                            source={require('../../Assets/Pen.png')}
                        />
                    </View>

                    <View style={styles.MiniCard}>
                        <Icon name="key" size={20} style={{color:"black", alignSelf: "center"}} />
                    </View>

                    <View style={styles.MiniCard}>
                        <Image
                            style={{width: "60%", height:"73%",borderRadius:50,alignSelf: "center"}}
                            source={require('../../Assets/ec3.png')}
                        />
                </View>
            </View>
            <View style={{flex: 8}}>
                <FlatList data={props.markedItems} renderItem={({item, index}) => <MarkedItem removeItem={() => removeItem(item.id)} key={item.id} title={item.title} completed={item.completed} total={item.total} />} />
            </View>
            <View style={styles.Footer}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15}}>
                        <TouchableOpacity onPress={() => props.navigation.navigate("dashboard")}>
                            <Icon name="home" size={25} style={{color:"gray", alignSelf: "center"}} />
                            <Text style={{fontSize: 12, textAlign: "center"}}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate("marked")}>
                            <Icon name="star" size={25} style={{color:"gray", alignSelf: "center"}} />
                            <Text style={{fontSize: 12, textAlign: "center"}}>Marked</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate('settings')}>
                            <Icon name="rocket" size={25} style={{color:"gray", alignSelf: "center"}} />
                            <Text style={{fontSize: 12, textAlign: "center"}}>Settings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => props.navigation.navigate("progress")}>
                            <Icon name="heart" size={25} style={{color:"gray", alignSelf: "center"}} />
                            <Text style={{fontSize: 12, textAlign: "center"}}>Progress</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    )
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    removeItem: id => dispatch({type: types.REMOVE_MARK, payload: {id}})
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(App);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        width: '100%',
        alignItems: 'center'
    },
    header: {
        flex: 1,
        alignItems: 'center'
    },
    MiniCard: {
        width: "20%", height: "80%", backgroundColor: "#C1C3CC",shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4, borderRadius: 20,
        justifyContent: "center"
    },
    MiniCardFirst: {
        width: "20%", height: "80%", backgroundColor: "#B4BBFF",shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4, borderRadius: 20,
        justifyContent: "center"
    },
    Image: {
        width: "100%",
        height: "15%",
    },
    Footer: {
        flex: 1,
        justifyContent: "center"
    },
    markedItem: {
        width: width / 1.1,
        alignSelf: 'center',
        backgroundColor: '#B4BBFF',
        marginVertical: 8,
        padding: 10,
        borderRadius: 15
    },

    title: {
        color: "#555",
        fontSize: 18
    },
    subtitle: {
        color: '#888'
    }
})