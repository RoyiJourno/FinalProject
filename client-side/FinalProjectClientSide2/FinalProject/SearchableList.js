import React, { Component } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
 
var items = [
  {
    id: 1,
    name: 'Car',
  },
  {
    id: 2,
    name: 'Truck ',
  },
  {
    id: 3,
    name: 'Ambulance ',
  },
  {
    id: 4,
    name: 'Stairs',
  },
  {
    id: 5,
    name: 'Escalators',
  },
  {
    id: 6,
    name: 'Fire',
  },
  {
    id: 7,
    name: 'Dog',
  },
  {
    id: 8,
    name: 'Bicycle',
  },
];
export default class searchableList extends Component {

SelectedTag(item){
    this.props.SelectedTag(item.name,this.props.fileContain);
}

  render() {
    return (
      <SearchableDropdown
        onItemSelect={(item)=>{this.SelectedTag(item)}}
        containerStyle={{ padding: 5 }}
        textInputStyle={{
          padding: 12,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5,
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#ddd',
          borderColor: '#bbb',
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{ color: '#222' }}
        itemsContainerStyle={{ maxHeight: 140 }}
        items={items}
        defaultIndex={2}
        placeholder="Pick Tagging"
        resetValue={false}
        underlineColorAndroid="transparent"
      />
    );
  }
}