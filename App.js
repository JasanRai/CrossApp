import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, TextInput, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
// custom component
import {TextBox} from './component/TextBox';

import {Item} from './component/Item';

export default class App extends Component {
  state ={
    expenseAmount : 0,
    expenseCategory: ''
  }

  listData = []

  dropdownItems= [
    { label: 'Food', value: 'food'},
    { label: 'Transport', value: 'transport' },
    { label: 'Rent', value: 'rent' },
    { label: 'Grocery', value: 'grocery' },
    { label: 'Entertainment', value: 'entertainment' },

  ]

  render() {
    return (
      <SafeAreaView>
        <View style ={styles.main}>
          <Text>Add your expense</Text>
          <TextInput
            style={styles.input}
            placeholder="$ Amount"
            onChangeText={text =>this.setState({expenseAmount: parseFloat(text) })}
            keyboardType= "number-pad"/>
          {/* <TextInput
            style={styles.input}
            placeholder="Category"
            onChangeText={text => this.setState({expenseCategory: text }) }
          /> */}
          <RNPickerSelect
            items = {this.dropdownItems}
            value = {this.state.expenseCategory}
            onValueChange = {value => this.setState({expenseCategory: value}) }
            useNativeAndroidPickerStyle = {false}
            />
        </View>
      
        <View>
          <TouchableOpacity style ={styles.button} onPress = {this.addItem}>
           <Text style = {styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

      <FlatList
        data={this.listData}
        renderItem={this.renderList}
        keyExtractor={item=> item.id}
        extraData={this.state.expenseAmount}
      />
      
    </SafeAreaView>
  )
  }
  renderList = ({item}) => (
    <Item amount={item.amount} category={item.category} />
  )
  addItem = () => {
    if(isNaN(this.state.expenseAmount) || this.state.expenseAmount == 0 || this.state.expenseCategory == '')
    {
      return;
    }
      let id = new Date().getTime().toString()
      let listItem = {
        id: id,
        amount: this.state.expenseAmount,
        category: this.state.expenseCategory
      }
      this.listData.push(listItem)
      console.log('adding')
      this.setState({expenseAmount:0})
      // this.setState({expenseAmount:0})
  }
}

const colors ={
  primary : 'hsla(330, 38%, 65%, 1)'
}

const styles = StyleSheet.create({
  input: {
  paddingHorizontal : 10,
  borderColor:'black',
  borderWidth: 1,
  marginVertical : 15
  },
  button:{
    padding: 15,
    backgroundColor: colors.primary
  },
  buttonText:{
    color: 'white',
    textAlign: 'center'
  }
});
