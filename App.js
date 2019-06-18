/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image, FlatList } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props);
    this.state ={ isLoading: true, dataSource:null}
  }

  componentDidMount(){
    fetch('https://api.vk.com/method/photos.getAll?access_token=5b46ee0b227258593ef618f6ca616f0b483a732575426cc52c6741439238c4bc4793c740929e5fa34ce57&v=5.95&owner_id=-52654926', 
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:"",
    }).then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource: responseJson.response.items,
      }, function(){
        console.log(responseJson);
      });

    })
    .catch((error) =>{
      console.error(error, "test");
    });;
  }

  render() {
    if (!this.state.isLoading){
    return (

      <View style={styles.container}>
            <FlatList
          data={this.state.dataSource}
          numColumns = {2}
          renderItem={({item, index}) =>  
            //  <Text>{val}</Text>}
          <Image key={item.id} source={{
            uri: item.sizes[3].url,
            cache: 'only-if-cached',
          }}
          style={{width: 200, height: 200}}/>}
        />       
      </View>
    );} else {
    return (

      <View style={styles.container}>
       <Text>Пусто</Text>
      </View>);}
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stretch:{
    width: 50,
    height: 200
  }
});
