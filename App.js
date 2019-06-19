/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View,Image, FlatList,TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

type Props = {};
export class HomeScreen extends Component<Props> {

  constructor(props){
    super(props);
    this.state ={ isLoading: true, dataSource:null, offset:0}
  }

  componentDidMount(){
    fetch('https://api.vk.com/method/photos.getAll?access_token=5b46ee0b227258593ef618f6ca616f0b483a732575426cc52c6741439238c4bc4793c740929e5fa34ce57&v=5.95&owner_id=-52654926&count=10&offset='+this.state.offset, 
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
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('OpenPhoto', {urlItem: item.sizes[3].url})}>
          <Image key={item.id} source={{
            uri: item.sizes[3].url,
            cache: 'only-if-cached',
          }}
          style={{width: 200, height: 200}}/>
          </TouchableWithoutFeedback>}
        /> 
        <Button
          title="Еще"
          onPress={() => {this.setState({offset:this.state.offset+10});this.componentDidMount()}}
        />      
      </View>
    );} else {
    return (

      <View style={styles.container}>
       <Text>Загрузка</Text>
      </View>);}
  }
}

export class OpenPhotoScreen extends Component<Props> {
  
  render(){
    const { navigation } = this.props;
    const items = navigation.getParam('urlItem', 'NO-ID');
    return <View style={styles.container}>
      <Image  source={{
            uri: items,
            cache: 'only-if-cached',
          }}
          style={{width: 400, height: 400}}/>
      </View>
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    OpenPhoto: OpenPhotoScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component<Props> {
  render() {
    return <AppContainer />;
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
