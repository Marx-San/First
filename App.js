import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

//api
console.log("New");

var myHeaders = new Headers();
myHeaders.append("x-access-token", "goldapi-xjk0natkwrpbh8a-io"); //Change api-id
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const api_url = 'https://www.goldapi.io/api/XAU/INR';

//let count = 0;

export default class App extends React.Component{

  state = {
    loading:true,
    high_price:null,
    low_price:null
  }

  constructor(props){
    super(props);
    var response = fetch(api_url,requestOptions);
    var data = response.json();
    this.setState({high_price:data.high_price});
    this.setState({low_price:data.low_price});
  }

  async componentDidMount(){
    setInterval(async () => {
      //console.log('1');  //Testing for recurrence
      var response =  await fetch(api_url,requestOptions);
      var data = await response.json();

      this.setState({high_price:data.high_price});
      this.setState({low_price:data.low_price});
   }, 5000); // 5 sec refresh
  }
  
  async componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null; // here...
  }

  render(){
  return(
    <View style={styles.container}>
      <Text>high {this.state.high_price}</Text>
      <Text>low {this.state.low_price}</Text>
      <StatusBar style="auto" />
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
