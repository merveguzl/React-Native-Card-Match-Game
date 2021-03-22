import React, { Component, PureComponent } from 'react'
import { Text, View, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity,Modal } from 'react-native'
import CountDown from 'react-native-countdown-component';

export default class LevelOne extends PureComponent {

    state = {
        array: [
           
        ],
        imageType:[
               require("../../image/ten.png"),
               require("../../image/one.png"),
               require("../../image/ten.png"),
               require("../../image/one.png"),
        ],
        randomA: [],
        active1:"",
        active2:"",
        modalText:"Tebrikler",
        isVisible:false
    }

    componentDidMount = () =>{
        while (this.state.imageType.length > 0) {
           var rnd = Math.floor(Math.random() * this.state.imageType.length);
            this.state.array = [...this.state.array, {
                image: this.state.imageType[rnd],
                active:false
            }]
            this.state.imageType = this.state.imageType.filter((x, index)=> index !== rnd )
            this.forceUpdate();
            this.interval
        }
    }

    
    

    setTime = (x) =>{
        setTimeout(() => {
            this.state.array.forEach(x=>{
                if(x.image === this.state.active2.image){
                  x.image = false
                }
            } )
        }, 1000);
    }

    check = (item) =>{
        if(this.state.active1 !== "" && this.state.active2 !== ""){
            if(this.state.active1.image === this.state.active2.image){
                this.state.array.forEach(x=>{
                    if(x.image === this.state.active2.image){
                        x.active = true
                    }
                } )
            }
            this.state.active1 = ""
            this.state.active2 = ""
        }
        if(this.state.active1 == ""){
            this.state.active1 = item
            this.forceUpdate()
        }
        else if(this.state.active2 == ""){
            this.state.active2 = item
            this.forceUpdate()

        }
       
        this.forceUpdate()
       
    }

    onTime = () =>{
        this.state.modalText = "Süreniz doldu."
        this.state.isVisible = true
        this.setState({
            modalText:"Süreniz doldu.",
            isVisible:true
        })
        this.forceUpdate()
    }

//setBack
    render() {
        return (
            <SafeAreaView>
                <View style={styles.container} >
                    <View style={styles.counter} >
                        <CountDown
                            until={60 * 0 + 30}
                            size={20}
                            onFinish={() => this.onTime() }
                            digitStyle={{backgroundColor: '#FFF'}}
                            digitTxtStyle={{color: '#1CC625'}}
                            timeToShow={['M', 'S']}
                            timeLabels={{m: '', s: ''}}
                        />
                    </View>
                    <FlatList 
                        scrollEnabled={false}
                         data={this.state.array}
                         numColumns={2}
                         showsHorizontalScrollIndicator={false}
                         contentContainerStyle = {{height:'60%', marginTop:'40%', width:'100%'}}
                         columnWrapperStyle={{marginBottom:10, width:'95%',justifyContent:"space-around", marginLeft:'2.5%'}}
                         keyExtractor={(item, key, index)=> key}
                         renderItem = {({item, key, index})=> 
                            <>
                            {item.image !== "" &&
                                <TouchableOpacity style={{width:180, height:260}} onPress={()=>this.check(item) }  >
                                    {item.active !== true ? 
                                        ((this.state.active1 === item )||( this.state.active2 === item)) ? (
                                            <Image 
                                                source={item.image}
                                                style={{width:'100%', height:'100%',  borderRadius:10}}
                                                resizeMode="stretch"
                                            />
                                        ) : (
                                            <Image 
                                                source={require("../../image/default.png")}
                                                style={{width:'100%', height:'100%',  borderRadius:10}}
                                                resizeMode="stretch"
                                            />
                                        ):
                                        (
                                            <View  />
                                        )
                                    }
                                </TouchableOpacity>
                            }
                           </>
                        }
                     />
                </View>
                <Modal
                    visible={this.state.isVisible}
                    transparent={true}
                >
                    <View style={{width:'100%', height:'100%', alignItems:"center", justifyContent:"center"}} >
                        <View style={styles.modalV} >
                            <Text style={{fontSize:20, color:"#211C18"}} >
                                {this.state.modalText}
                            </Text>
                            <TouchableOpacity style={styles.modalButton} onPress={()=> this.props.setBack() }  >
                                <Text style={{fontSize:20, color:"#211C18"}} >
                                   Anasayfa
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                   
                </Modal>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        
    },
    counter:{
        position:"absolute",
        top:20,
        right:10
    },
    modalV:{
        width:'80%',
        height:'20%',
        backgroundColor:"#fff",
        borderRadius:20,
        alignItems:"center",
        justifyContent:"space-around"
    },
    modalButton:{
        width:'50%',
        height:40,
        backgroundColor:"#1CC625",
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    }
  
  });