import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView, ImageBackground, TouchableOpacity, Dimensions, FlatList, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {connect} from 'react-redux'
import api from '../api';

const {width, height} = Dimensions.get('screen')



class Dashboard extends React.Component{

    state = {
        courses: [],
        modalVisible: false
    }


    componentDidMount(){
        this.getCourses();
    }

    getCourses = async () => {
        const courses = await api.getAllCourses();
        console.log(courses);
        this.setState({courses});

    }



    handleQuickQuestion = () => {
        const randomCourse = this.state.courses[Math.floor(Math.random() * this.state.courses.length)];
        if(randomCourse.question_module.length){
            this.props.navigation.navigate("question", {id: randomCourse._id});
        } else this.handleQuickQuestion();
    }


    render(){
        return(
            <View style={styles.Container}>
                <View style={styles.Header}>
                    <Text style={{fontStyle: "italic", textAlign: "center", fontSize:15, color: "#4C8CF5"}}>iKeep</Text>
                    <Text style={{textAlign: "center", fontSize:23, fontWeight: "bold", marginTop: "2%"}}>Home</Text>
                    <Text style={{textAlign: "center", color: "gray", marginTop: "2%"}}>Select which topics you want to take today!</Text>
                </View>

                <ScrollView style={{flex: 8}} contentContainerStyle={{paddingVertical: 20, flex: 8, justifyContent: "space-evenly"}}>
                <View style={{width: "100%", height: "10%", justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 10}}>
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

                <TouchableOpacity style={styles.Image} onPress={this.handleQuickQuestion}>
                    <View style={{width: "90%", backgroundColor: "#B4BBFF", height: "100%", alignSelf: "center", marginLeft: "3%"}}>
                        <Text style={{color: "white", margin: "5%", fontWeight: "bold"}}>Today's Quick Quiz</Text>
                        <View style={{width: "20%", height: "30%", backgroundColor: "black", borderRadius:40, justifyContent: "center", alignSelf: "flex-end", marginRight: "5%"}}>
                            <Text style={{color: "white", textAlign: "center"}}>Start</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={{width: "100%", height: "5%", justifyContent: "center"}}>
                    <View style={{flexDirection: "row", width: "90%", alignSelf: "center"}}>
                        <Text>Recent</Text>
                        <View style={{width: "85%", height: "10%", backgroundColor: "gray", margin: "3%"}}></View>
                    </View>
                </View>

                <FlatList data={this.state.courses.slice(0,4)} numColumns={2} renderItem={({item, index}) => (
                    <TouchableOpacity style={styles.course} onPress={() => this.props.navigation.navigate("question", {id: item._id})}>
                     <Text style={styles.courseTitle}>{item.course_name}</Text>
                 </TouchableOpacity>
                )} />

                <View style={{width: "100%", height: "20%"}}>
                        <View style={{flexDirection: "row", width: "90%", alignSelf: "center"}}>
                            <View style={{width: "100%", height: "15%", backgroundColor: "gray", margin: "2%"}}></View>
                        </View>

                        <TouchableOpacity onPress={() => this.setState({modalVisible: true})}>
                        <View style={{width: "90%", backgroundColor: "#B4BBFF", height: "100%", alignSelf: "center", marginLeft: "3%"}}>
                            <Text style={{color: "white", margin: "5%", fontWeight: "bold"}}>More Lessons</Text>
                            <View style={{width: "20%", height: "30%", backgroundColor: "black", borderRadius:40, justifyContent: "center", alignSelf: "flex-end", marginRight: "5%"}}>
                                <Text style={{color: "white", textAlign: "center"}}>Start</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                </View>
                </ScrollView>

                <View style={styles.Footer}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("dashboard")}>
                            <Icon name="home" size={25} style={{color:"gray", alignSelf: "center"}} />
                            <Text style={{fontSize: 12, textAlign: "center"}}>Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("marked")}>
                            <Icon name="star" size={25} style={{color:"gray", alignSelf: "center"}} />
                            <Text style={{fontSize: 12, textAlign: "center"}}>Marked</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('settings')}>
                            <Icon name="rocket" size={25} style={{color:"gray", alignSelf: "center"}} />
                            <Text style={{fontSize: 12, textAlign: "center"}}>Settings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate("progress")}>
                            <Icon name="heart" size={25} style={{color:"gray", alignSelf: "center"}} />
                            <Text style={{fontSize: 12, textAlign: "center"}}>Progress</Text>
                        </TouchableOpacity>
                    </View>
                </View>


              {/* All Courses MODAL */}

              <Modal visible={this.state.modalVisible}>
                  <View style={{flex: 1, paddingVertical: '5%'}}>
                      <View style={{height: '15%', width: '90%', alignSelf: 'center', justifyContent: 'center'}}>
                      <TouchableOpacity onPress={() => this.setState({modalVisible: false})}>
                          <Text>Close</Text>
                      </TouchableOpacity>
                      </View>
                  <FlatList data={this.state.courses} numColumns={2} renderItem={({item, index}) => (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("question", {id: item._id})} style={styles.course}>
                         <Text style={styles.courseTitle}>{item.course_name}</Text>
                 </TouchableOpacity>
                )} />
                  </View>
              </Modal>

            </View>
        )
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Dashboard);


const styles = StyleSheet.create({
    Container: {
       flex: 1,
    },
    Header: {
        flex: 0.1,
        justifyContent: "center",
    },
    Login: {
        width: "90%",
        height: "25%",
        backgroundColor: "#85C9E8",
        borderRadius: 40,
        alignSelf: "center",
        justifyContent: "center",
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
        flex: 0.1,
        justifyContent: "center"
    },
    course: {
        width: 150,
        height: 100,
        borderRadius: 10,
        backgroundColor: "#B4BBFF",
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '4%',
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.9,
        elevation: 8
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555'
    }
});
