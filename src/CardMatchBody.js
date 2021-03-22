import React, { Component } from 'react'
import { ImageBackground, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native'
import LevelOne from './CardMatchLevelPages/LevelOne'
import LevelTwo from './CardMatchLevelPages/LevelTwo'
import LevelThree from './CardMatchLevelPages/LevelThree'
import LevelFour from './CardMatchLevelPages/LevelFour'
import LevelFive from './CardMatchLevelPages/LevelFive'


export default class CardMatchBody extends Component {

    state={
        page:""
    }

    setComponent = () =>{
        switch (this.state.page) {
            case "Level 1":
               return <LevelOne setBack = {this.setBack} />
            case "Level 2":
                return <LevelTwo setBack = {this.setBack} />
            case "Level 3":
                return <LevelThree setBack = {this.setBack} />
            case "Level 4":
                return <LevelFour setBack = {this.setBack} />
            case "Level 5":
                return <LevelFive setBack = {this.setBack} />
        }
    }

    setStatePage = (item) =>{
        this.state.page = item;
        this.setState({
            page:item
        })
    }

    setBack = () =>{
        this.state.page = "";
        this.setState({
            page:""
        })
    }

    render() {

        const data = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5" ]

        return (
            <ImageBackground source={require("../image/wallpaper.png")} style={styles.background} resizeMode="stretch"  >
               
                {this.state.page === "" ? (
                    data.map((item, key)=>(
                        <TouchableOpacity key={key} style={styles.button} onPress = {()=>this.setStatePage(item)}  >
                            <Text style={styles.text} >
                                {
                                    item
                                }
                            </Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <>
                     <View style={styles.header} >
                        <TouchableOpacity onPress={()=>this.setBack()} >
                            <Image 
                                source={require("../image/back.png")}
                                style={{width:40, height:50, marginLeft:10}}
                            />
                        </TouchableOpacity>
                    </View>
                    {
                             this.setComponent()
                    }
                    </>
                )}
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    button: {
      backgroundColor: '#E4D8C9',
      alignItems: 'center',
      justifyContent: 'center',
      width:'60%',
      height:60,
      margin:10,
      borderRadius:5,
      shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 30,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    background: {
        width:'100%', 
        height:'105%', 
        marginTop:'-5%',
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        fontSize:20,
        fontWeight:"600",
        color:"#211C18"
    },
    header:{
        width:'100%',
        height:50,
        position:"absolute",
        top:60,
        zIndex:1000000
    }
  
  });