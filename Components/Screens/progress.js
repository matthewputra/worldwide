import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import api from '../api';
import {VictoryBar, VictoryChart, VictoryPie} from 'victory-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const {width, height} = Dimensions.get('screen')

const App = (props) => {
    const [module_list, setModuleList] = useState([]);
    const [completed, setCompleted] = useState(0);
    const [data, setData] = useState([]);
    const [percentage, setPercentage] = useState([]);
    
    const getUserStatus = async () => {
        const res = await api.getUserProgress(props.currentUser.token);
        setModuleList(res.data.module_list);
    }


    const prepareStatisticalData = () => {

        const dataScience = module_list.filter(module => module.module_id.title.toLowerCase().includes("data science") || module.module_id.title.toLowerCase().includes("python"));
        const hci = module_list.filter(module => module.module_id.title.toLowerCase().includes("human computer interaction"));
        const designMethods = module_list.filter(module => module.module_id.title.toLowerCase().includes("design"));
        const security = module_list.filter(module => module.module_id.title.toLowerCase().includes("security"));

        const item1 = {x: "DS", y: dataScience.length};
        const item2 = {x: "HCI", y: hci.length};
        const item3 = {x: "DM", y: designMethods.length};
        const item4 = {x: "CS", y: security.length};

        const temp = [];

        temp.push(item1);
        temp.push(item2);
        temp.push(item3);
        temp.push(item4);

        // Calculate Percentages 

            // Data Science
            const temp2 = [];
            
            const dsp = dataScience.length * 100 / module_list.length;
            const hsp = hci.length * 100 / module_list.length;
            const dmp = designMethods.length * 100 / module_list.length;
            const csp = security.length * 100 / module_list.length;

            temp2.push(dsp);
            temp2.push(hsp);
            temp2.push(dmp);
            temp2.push(csp);

            setPercentage(temp2);


        setData(temp);
    }


    const getCompletedAnswers = () => {
        let counter = 0;
        module_list.forEach(item => {
            counter += item.completed_count;
        })

        setCompleted(counter);
    }

    useEffect(() => {
        getUserStatus();
    }, [])


    useEffect(() => {
        if(module_list){
            getCompletedAnswers();
            prepareStatisticalData();
        }
    }, [module_list])
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Text>iKeep</Text>
            <Text style={{fontSize: 24, fontWeight: "700"}}>Progress</Text>
            <Text style={{fontSize: 16, color: '#888'}}>What You Have Retained</Text>
        </View>
        <View style={{flex: 11}}>
            <View style={styles.heading}>
                <Text style={styles.head_text}>Records</Text>
            </View>
           <View style={styles.listItem}>
            <Icon name="star" size={24} color="#FFD700" />
             <Text style={{marginLeft: '5%', color: '#888'}}>You Have {module_list.length} Days of Consistent Practice</Text>
           </View>
           <View style={styles.listItem}>
            <Icon name="star" size={24} color="#FFD700" />
             <Text style={{marginLeft: '5%', color: '#888'}}>You've answered {completed} questions correct</Text>
           </View>
           <View style={styles.listItem}>
            <Icon name="star" size={24} color="#FFD700" />
             <Text style={{marginLeft: '5%', color: '#888'}}>You completed 15 daily quizes</Text>
           </View>
           <View style={styles.heading}>
               <Text style={styles.head_text}>Statistics</Text>
           </View>
            <View style={{flexDirection: 'row', width: '100%'}}>
                <VictoryPie data={data} width={width /2} height={width / 2} />
                <View style={{width: '48%', justifyContent: 'center'}}>
                    <Text style={{fontSize: 12, marginBottom: '20%', color: "#888", width: '130%', alignSelf: 'center'}}>Your Most Common Practice Topics</Text>
                    <View style={{flexDirection: 'row', marginVertical: 10, width: '90%', justifyContent: "space-between"}}>
                        <Text style={{fontSize: 11}}>{percentage[0]}% Data Science</Text>
                        <Text style={{fontSize:11}}>{percentage[1]}% HCI</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginVertical: 10, width: '90%', justifyContent: "space-between"}}>
                    <Text style={{fontSize: 11}}>{percentage[2]}% Design Methods</Text>
                        <Text style={{fontSize:11}}>{percentage[3]}% CS</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text style={{fontSize: 16, color: "#888", paddingLeft: '5%'}}>Number of Questions Answered Weekly</Text>
                <VictoryChart width={width / 1} height= {width / 2}>
                    <VictoryBar data={[{x: 1, y :62},{x: 2, y : 54},{x: 3, y : 45},{x: 4, y : 78},{x: 5, y : 31},{x: 6, y : 56},]}  />
                </VictoryChart>
            </View>
        </View>
        <View style={{flex: 0.7}}>
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


const styles = StyleSheet.create({
    container: {
    flex: 1,
    },
    header: {
        flex: 1,
        alignItems: 'center'
    },
    heading: {
        marginVertical: "5%",
        width: width / 1.05,
        alignSelf: 'center',
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: "#B4BBFF",
        borderRadius: 20,
        height: 40,
    },
    head_text: {
        color: "#5e4fa8",
        fontSize: 16,
        fontWeight: '600'
    },
    listItem: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginVertical: 5

    }
})

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(App);