import React, {useState} from 'react';
import t from 'tcomb-form-native';
import { Text, View, TextInput, StyleSheet} from 'react-native';

const Form = t.form.Form

const Profile = t.struct({
    name: t.String,
    gender: t.String,
    age: t.Number,
    comments: t.String,
    hobbies: t.String
})


const InputForm = () => {
  return (
    <View style = {styles.container}>
        <Form type={Profile}/>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
  });


export default InputForm;