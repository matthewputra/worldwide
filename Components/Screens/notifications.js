import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import {connect} from 'react-redux'
import api from '../api';
import {Loading} from '../components'
import DateTimePicker from '@react-native-community/datetimepicker';
import RBSheet from 'react-native-raw-bottom-sheet'

const {width} = Dimensions.get("screen")

const InputField = (props) => (
    <View style={[styles.inputField, props.dropdown ? {paddingRight: 15} : null]}>
        <Text>{props.label}</Text>
        {props.switch ? <Switch onValueChange={props.onValueChange} value={props.value} /> : null}
        {props.dropdown ? <TouchableOpacity onPress={props.onPress}>
            <Text>{props.value}</Text>
        </TouchableOpacity> : null}
    </View>
)


const Button = ({onPress, label, selected}) => (
<TouchableOpacity onPress={onPress} style={{alignItems: 'center', zIndex: 1000, justifyContent: 'center' , backgroundColor: selected ? '#000' : "#fff", borderWidth: selected ? 0 : 1, borderColor: '#000', width: 40, height: 40, borderRadius: 50}}>
    <Text style={{fontSize: 16, color: selected ? 'white' : "#000"}}>{label}</Text>
</TouchableOpacity>
)

const App = props => {
    const [reminder, setReminde] = useState(false);
    const [time, setTime] = useState("22:00:00");
    const [frequency, setFrequency] = useState(0);
    const [real_frequency_values, setRealFrequencyValues] = useState([
        {
            selected: false
        },
        {
            selected: false
        },
        {
            selected: false
        },
        {
            selected: false
        },
        {
            selected: false
        },
        {
            selected: false
        },
        {
            selected: false
        },
    ])
    const [real_topics_value, setRealTopicsValue] = useState([
        {
            selected: false
        },
        {
            selected: false
        },
        {
            selected: false
        },
        {
            selected: false
        },
    ])
    const [topics, setTopics] = useState(0);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const rbsheet_frequency = useRef(null);
    const rbsheet_topics = useRef(null);


    useEffect(() => {
        getCurrentSettings();
    }, [])

    const getCurrentSettings = async () => {
        const res = await api.getNotificationSettings(props.currentUser.token);

        if(res.code == 200 && res.data){
            setReminde(res.data.is_enable);
            setTime(res.data.reminder_time);
        }
        
    }

    const onSave = async () => {
        setLoading(true);
        const res = await api.updateNotificationSettings({is_enable: reminder, time, course_id: '6094f24f0db2a26bd6286d5b', frequeny: frequency, token: props.currentUser.token });
        setLoading(false);
        
        console.log(res);

    }


    const onChange = value => {

        if(value.type !== 'dismissed'){
            const val = value.nativeEvent.timestamp;
            const timestr = val.toString().split(" ");
            const time_ = timestr[4];
            setTime(time_);
        }
        setShow(false);
    }


    const handleSelection = index => {
       const updatedFrequency = real_frequency_values.map((val, ind) => ind == index ? ({selected: !val.selected}) : val);
       setRealFrequencyValues(updatedFrequency);
    }

    const handleTopics = index => {
        const updatedTopics = real_topics_value.map((val, ind) => ind == index ? ({selected: !val.selected}) : val);
        setRealTopicsValue(updatedTopics);
    }


    useEffect(() => {
        const selected = real_frequency_values.filter(val => val.selected == true);
        
        if(selected.length == 0){
            setFrequency("None");
        } else if (selected.length == 7){
            setFrequency("Every Day");
        } else setFrequency("Custom");

    }, [real_frequency_values])


    useEffect(() => {
        const selected = real_topics_value.filter(val => val.selected == true);
        
        if(selected.length == 0){
            setTopics("None");
        } else if (selected.length == 4){
            setTopics("All");
        } else setTopics("Custom");
    }, [real_topics_value])


    return loading ? <Loading /> : (
        <View style={styles.container}>
            <View style={styles.center}><Text>iKeep</Text></View>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{flex: 1.3}}>
                    <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={{flex: 8, textAlign: 'center', fontSize: 16}}>Notifications</Text>
                <TouchableOpacity onPress={onSave} style={{flex: 1}}>
                    <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <InputField label="Practice Reminder" onValueChange={value => setReminde(value)} switch value={reminder} />
                <InputField label="Reminder Time" onPress={() => setShow(true)} dropdown value={time} />
                <InputField label="Frequency" dropdown onPress={() => rbsheet_frequency.current.open()} value={frequency} />
                <InputField label="Topics" dropdown onPress={() => rbsheet_topics.current.open()} value={topics} />
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(Date.now())}
                    mode="time"
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                    />
      )}

            <RBSheet openDuration={600} height={130}  ref={rbsheet_frequency}>
                <View style={{flex: 2, alignItems: 'flex-end', padding: 10}}>
                    <TouchableOpacity onPress={() => rbsheet_frequency.current.close()}>
                        <Text>Done</Text>
                    </TouchableOpacity>
                </View>
                    <View style={{flex: 9, flexDirection: "row", alignItems: 'flex-end', justifyContent: "space-evenly", paddingBottom: 20}}>
                        <Button label="SU" selected={real_frequency_values[0].selected} onPress={() => handleSelection(0)} />
                        <Button label="M" selected={real_frequency_values[1].selected} onPress={() => handleSelection(1)} />
                        <Button label="T" selected={real_frequency_values[2].selected} onPress={() => handleSelection(2)} />
                        <Button label="W" selected={real_frequency_values[3].selected} onPress={() => handleSelection(3)} />
                        <Button label="TH" selected={real_frequency_values[4].selected} onPress={() => handleSelection(4)} />
                        <Button label="F" selected={real_frequency_values[5].selected} onPress={() => handleSelection(5)} />
                        <Button label="S" selected={real_frequency_values[6].selected} onPress={() => handleSelection(6)} />
                        
                    </View>
            </RBSheet>

            <RBSheet openDuration={600} height={130} ref={rbsheet_topics}>
            <View style={{flex: 2, alignItems: 'flex-end', padding: 10}}>
                    <TouchableOpacity onPress={() => rbsheet_frequency.current.close()}>
                        <Text>Done</Text>
                    </TouchableOpacity>
                </View>
                    <View style={{flex: 9, flexDirection: "row", alignItems: 'flex-end', justifyContent: "space-evenly", paddingBottom: 20}}>
                        <Button label="DS" selected={real_topics_value[0].selected} onPress={() => handleTopics(0)} />
                        <Button label="HCI" selected={real_topics_value[1].selected} onPress={() => handleTopics(1)} />
                        <Button label="CS" selected={real_topics_value[2].selected} onPress={() => handleTopics(2)} />
                        <Button label="IA" selected={real_topics_value[3].selected} onPress={() => handleTopics(3)} />
                        
                    </View>
            </RBSheet>
            </View>
        </View>
    )
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(App);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    btnText: {
        color: "rgba(81,135,185,1)",
    },
    center: {
        width: '100%',
        alignItems: 'center'
    },
    body: {
        flex: 8,
        paddingHorizontal: 10
    },
    inputField: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        alignSelf: 'center',
        width: width / 1.1 ,
        borderBottomColor: "#ddd0f5",
        borderBottomWidth: 2,
        paddingBottom: 15,
        marginVertical: 20
    }
})