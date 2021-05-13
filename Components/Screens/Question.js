import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Touchable, Alert, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import api from '../api';
import {connect} from 'react-redux'
import { types } from '../action';

const {width, height} = Dimensions.get('screen');

class Question extends React.Component{
    state = {
        course: null,
        questions: [],
        currentQuestionIndex: 0,
        currentQuestionListIndex: 0,
        selectedAnswer: null,
        results: [],
        answerShown: false,
        selectedAnswer: -1,
        resultModalShown: false,
        msg: "",
        exp: ""
    }

    componentDidMount(){
        this.getQuestion();
    }

    getQuestion = async () => {
        const courseId = this.props.route.params.id;
        const course = await api.getCourseById(courseId);

        this.setState({course}, async () => {
            const questions = await api.getQuestionsByCourseID(courseId);
            this.setState({questions: questions});
        })

    }


    pickAnswer = async (index) => {
        const {questions, currentQuestionIndex, currentQuestionListIndex} = this.state;
        const questionList = questions[currentQuestionListIndex];
        const questionListSize = questionList.question_list.length;
        const currentQuestion = questionList.question_list[currentQuestionIndex];
        const correct_answer = currentQuestion.correct_answer;
        const result = {id: index, result: currentQuestion.answer_list[index] == correct_answer ? 1 : 0};


        this.setState({resultModalShown: true, msg: currentQuestion.answer_list[index] == correct_answer ? "Correct" : "Wrong", exp: correct_answer});

        this.setState({results: [...this.state.results, result], selectedAnswer: -1});

        const body = {_id: questionList._id, count: this.state.results.length, token: this.props.currentUser.token};

        const res = await api.putUserProgress(body);

        console.log(res);

        if(currentQuestionIndex + 1 < questionListSize){
            this.setState({currentQuestionIndex : this.state.currentQuestionIndex + 1})
        } else if (currentQuestionListIndex + 1 < questions.length) {
            this.setState({currentQuestionListIndex: this.state.currentQuestionListIndex + 1, currentQuestionIndex: 0});
        } else this.calculateResults();
    }


    calculateResults = () => {
        const {results} = this.state;
        const correct = results.filter(result => result.result == 1);
        const incorrect = results.filter(result => result.result == 0);

        Alert.alert(`Summary`, `Correct: ${correct.length}\nIncorrect: ${incorrect.length}`);

    }


    toggleAnswerHint = () => {
        this.setState({answerShown: true}, () => setTimeout(() => this.setState({answerShown: false}), 1500));
    }


    markCurrentItem = async () => {
        // Get Current Item
        const {questions, currentQuestionListIndex, currentQuestionIndex} = this.state;
        const questionList = questions[currentQuestionListIndex];

        const res = await api.getCourseById(questionList.course_id);

        const {data} = res;

        const body = {title: data.course_name, id: data._id, completed: currentQuestionListIndex, total: questions.length};

        // Save The Body To Redux

        this.props.markItem(body);

    }


    DeleteAccountModal = () => <View style={{width : width / 1.05,padding: 20, backgroundColor: '#fff', position: 'absolute', top: height / 3, shadowColor: "#ccc", shadowOffset: {width: 3, height: 3}, shadowOpacity: 2, zIndex: 1000, alignSelf: 'center', borderRadius: 40, height: height / 3.5}}>
        <View style={{flex: 6, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 24, width: '90%', color: '#888', textAlign: 'center'}}>{this.state.msg}</Text>
            <Text style={{marginVertical: 3}}>{this.state.exp}</Text>
        </View>
        <View style={{flex: 2}}>
            <TouchableOpacity onPress={() => this.setState({resultModalShown: false, msg: "", exp: ""})} style={{backgroundColor: "#B4BBFF", width: 100, height: 50, alignSelf: 'center', borderRadius: 40, alignItems: 'center', justifyContent :'center'}}>
                <Text style={{fontSize: 18, color: 'white'}}>OK</Text>
            </TouchableOpacity>
        </View>
    </View>

    render(){
        return(
            <View style={styles.Container}>
                <View style={styles.Header}>
                    <Text style={{fontStyle: "italic", textAlign: "center", fontSize:20, color: "#B4BBFF"}}>iKeep</Text>
                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: "5%"}}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}><Icon name="times" size={22} style={{color:"gray"}} /></TouchableOpacity>
                        <Text style={{fontSize: 15, fontWeight: "bold"}}>Question {this.state.currentQuestionIndex + 1}</Text>
                        <TouchableOpacity onPress={this.markCurrentItem}><Icon name="star" size={22} style={{color:"gray"}} /></TouchableOpacity>
                    </View>
                </View>

                {this.state.resultModalShown ? <this.DeleteAccountModal /> : null}

                <View style={{width: "100%", height: "10%", justifyContent: "center"}}>
                    <View style={{flexDirection: "row", alignSelf: "center", marginLeft: this.state.questions[this.state.currentQuestionListIndex]?.question_list.length <=2 ? "20%" : 0, width: this.state.questions[this.state.currentQuestionListIndex]?.question_list.length <=2 ? '40%' : width / this.state.questions[this.state.currentQuestionListIndex]?.question_list.length || "100%"}}>
                        {this.state.questions[this.state.currentQuestionListIndex]?.question_list.map((list, index) => (
                            <>
                            <View style={{width:10, height:10, backgroundColor: index == this.state.currentQuestionIndex ? "#B4BBFF" : "black", alignSelf: "center", borderRadius: 10}}></View>
                             {this.state.questions[this.state.currentQuestionListIndex]?.question_list[index + 1] ? <View style={{width: "30%", height: "15%", backgroundColor: "#B4BBFF", marginTop: "4%"}}></View> : null}
                            </>
                        ))}
                    </View>
                </View>

                <View style={{width: "80%", height: "20%", justifyContent: "center", alignSelf: "center"}}>
                    <Text style={{textAlign: "center"}}>{this.state.questions[this.state.currentQuestionListIndex]?.question_list[this.state.currentQuestionIndex].question || null}</Text>
                </View>

                <View style={{width: "100%", height: "40%", justifyContent: "center"}}>
                    <View style={{width: "100%", height: "30%", justifyContent: "center"}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10}}>
                            <TouchableOpacity onPress={() => this.setState({selectedAnswer: 0})} style={[styles.option, this.state.selectedAnswer == 0 ? {backgroundColor: "#B4BBFF"} : null]}>
                                <Text style={{textAlign: "center", fontSize: 14}}>{this.state.questions[this.state.currentQuestionListIndex]?.question_list[this.state.currentQuestionIndex].answer_list[0]}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.setState({selectedAnswer: 1})} style={[styles.option, this.state.selectedAnswer == 1 ? {backgroundColor: "#B4BBFF"} : null]}>
                                <Text style={{textAlign: "center", fontSize: 14}}>{this.state.questions[this.state.currentQuestionListIndex]?.question_list[this.state.currentQuestionIndex].answer_list[1]}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, marginTop:"2%"}}>
                            <TouchableOpacity onPress={() => this.setState({selectedAnswer: 2})} style={[styles.option, this.state.selectedAnswer == 2 ? {backgroundColor: "#B4BBFF"} : null]}>
                                <Text style={{textAlign: "center", fontSize: 14}}>{this.state.questions[this.state.currentQuestionListIndex]?.question_list[this.state.currentQuestionIndex].answer_list[2]}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.setState({selectedAnswer: 3})} style={[styles.option, this.state.selectedAnswer == 3 ? {backgroundColor: "#B4BBFF"} : null]}>
                                <Text style={{textAlign: "center", fontSize: 14}}>{this.state.questions[this.state.currentQuestionListIndex]?.question_list[this.state.currentQuestionIndex].answer_list[3]}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={() => this.pickAnswer(this.state.selectedAnswer)} style={{width: "50%", height: 50, backgroundColor: "#B4BBFF", alignSelf: "center", borderRadius: 20, justifyContent: "center", marginTop: "7%"}}>
                        <Text style={{textAlign: "center", color: "white"}}>CHECK</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    markItem: body => dispatch({type: types.MARK_ITEM, payload: {body}})
});
const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Question);

const styles = StyleSheet.create({
    Container: {
        width: "100%",
        height: "100%",
        backgroundColor: '#f5f7ff'
    },
    Header: {
        width: "100%",
        height: "10%",
        justifyContent: "center",
    },
    Body: {
        width: "100%",
        height: "40%",
        justifyContent: "center"
    },
    Login: {
        width: "90%",
        height: "25%",
        backgroundColor: "#85C9E8",
        borderRadius: 40,
        alignSelf: "center",
        justifyContent: "center",
    },
    option: {
        width: 160,
        height: 100,
        borderRadius: 10,
        borderWidth:1,
        borderColor:"gray",
        justifyContent: "center",
        backgroundColor: 'rgba(255,255,255,0.5)',
    }
});
