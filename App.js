import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
// custom component
import {TextBox} from './component/TextBox';

import {Item} from './component/Item';

export default class App extends Component {
  state ={
    numberSet : 0,
    nameWorkout : '',
    numberRep : '',
    validInput: false,
    showToast: false,
    message: '',
  }

  listData = []

  dropdownItems= [
    { label: '3-6 Rep', value: '3-6 Rep'},
    { label: '6-9 Rep', value: '6-9 Rep' },
    { label: '9-12 Rep', value: '9-12 Rep'},
    { label: '12-15 Rep', value: '12-15 Rep' },
    { label: '15-20 Rep', value: '15-20 Rep' },

  ]

  render() {
    return (
      <SafeAreaView style={{flex:1, position: 'relative'}}>
        <View style ={styles.main}>
          <Text>Create your own sets of Workout</Text>
          <TextInput
            style={styles.input}
            placeholder="Workout Name"
            onChangeText={text => this.setState({nameWorkout: text },
              () => { this.validate() }) }
              ref={(input) => (this._textInput = input)}
          />
          <TextInput
            style={styles.input}
            placeholder="Number of Sets"
            onChangeText={text =>this.setState({numberSet: parseInt(text) },
              () => { this.validate() }
            ) }
            keyboardType= "number-pad"
            ref={(inputNo) => (this._textInputNo = inputNo)}
            />
         
          <RNPickerSelect
            items = {this.dropdownItems}
            value = {this.state.numberRep}
            onValueChange = {value => this.setState({numberRep: value},
              () => { this.validate() }
              ) }
            useNativeAndroidPickerStyle = {false}
            style={pickerStyle}
            placeholder={pickerPlaceholder}
            />
        </View>
      
        <View>
          <TouchableOpacity 
          style ={this.state.validInput ? styles.button : styles.buttonDisabled } 
          onPress = {this.addItem}
          disabled = {!this.state.validInput ? true : false}>
           <Text style = {styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style = { [{
          display: this.state.showToast ? 'flex' : 'none'
        }, styles.toast]}>
          <Text style = {styles.toastMessage}> {this.state.message}</Text>
        </View>
      <View style = {{flex:1}}>
        <FlatList
          data={this.listData}
          renderItem={this.renderList}
          keyExtractor={item=> item.id}
          extraData={this.state.nameWorkout}
        />
      </View>
    </SafeAreaView>
  )
  }

  componentDidMount() {
    this.loadList()
  }

  renderList = ({item}) => (
    <Item 
    name={item.name} 
    set={item.set}
    rep={item.rep} 
    id={item.id}
    delete={ this.removeItem } />
  )

 

  removeItem = (itemId) =>{
   console.log(itemId)
    this.listData.forEach((item, index) => {
      if(item.id == itemId)
      {
          this.listData.splice( index, 1 )
      }
    })
    this.showToast('item deleted',2000)
    this.saveList()
    this.setState({nameWorkout:''})
  
  }
  addItem = () => {
    if(this.state.nameWorkout == '' || this.state.numberSet == 0 || this.state.numberRep == '')
    {
      return;
    }
      let itemId = new Date().getTime().toString()
      let listItem = {
        id: itemId,
        name: this.state.nameWorkout,
        set: this.state.numberSet,
        rep: this.state.numberRep,
      }
    
      this.listData.push(listItem)
      this.showToast('item added', 2000)
      this.sortlist()
      this.saveList()
      this.setState({nameWorkout: '', numberSet: 0, numberRep: null, validInput: false})
      this._textInput.clear()
      this._textInputNo.clear()
      this._textInput.focus()
     
  }

  validate = () => {
    if( this.state.nameWorkout != '' && this.state.numberSet > 0 && this.state.numberRep )
    {
      this.setState({validInput:true})
    }
  }

  sortlist = () => {
    this.listData.sort((item1, item2) =>{
      return item2.id - item1.id
    } )
  }
saveList = async () =>{
  try {
    await AsyncStorage.setItem(
      'data',
      JSON.stringify(this.listData)
    )
  }
  catch(error) {
      console.log(error)
  }

}

loadList = async () => {
  try{
    let items = await AsyncStorage.getItem('data')
    if(JSON.parse(items)) {
      this.listData = JSON.parse(items)
    }

    this.listData = JSON.parse(items)
    this.setState({nameWorkout:''})
  }
  catch (error) {
    console.log(error)
  }
}

showToast = ( message, duration ) => {
  this.setState({message: message}, () => {
    this.setState({showToast:true})
  })
  const timer = setTimeout(
    () => {this.setState({showToast: false}) },
    duration
  )
}

}

const colors ={
  primary : 'hsla(147, 38%, 65%, 1)',
  primaryDisabled: 'hsla(147, 38%, 80%,1)',
}

const pickerPlaceholder = {
  label: 'select category', value: null, color: 'black'
}

const styles = StyleSheet.create({

  input: {
  padding : 10,
  borderColor:'black',
  borderWidth: 1,
  marginVertical : 15
  },
  button:{
    padding: 15,
    backgroundColor: colors.primary,
    marginVertical : 15
  },
  buttonText:{
    color: 'white',
    textAlign: 'center'
  },
  buttonDisabled: {
    padding: 15,
    backgroundColor: colors.primaryDisabled,
    marginVertical : 15
  },
  listView : {
    flex: 1,
  },
  toast: {
    backgroundColor:'black',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 5,
    borderRadius : 5,
  },
  toastMessage: {
    color: 'white',
    textAlign : 'center',
  }
})

const pickerStyle = StyleSheet.create({
  inputIOS: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  inputAndroid: {
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
  }

})
