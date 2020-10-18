//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Platform, StatusBar } from 'react-native';
import { TextInput, SafeAreaView, StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { Card} from 'react-native-elements';
import Modal from 'react-native-modal';
import t from 'tcomb-form-native'
import InputForm from './components/inputForm'

const Form = t.form.Form

const Profile = t.struct({
    name: t.String,
    gender: t.String,
    age: t.Number,
    comments: t.String,
    hobbies: t.String
})

export default function App() {
  const refContainer = useRef(null)
  const [state, setState] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  }

  const PostData = () => {
    // post data here
    console.log(refContainer.current.getValue())
    toggleModal()
  }

  useEffect(()=> {
    fetch("https://5f8beb00c7aadb001605dea0.mockapi.io/Profiles")
      .then(response => response.json())
      .then(json =>setState(json))
      .catch(error => console.error(error))
  }, [])

  return (
    <>
        <ScrollView>
          <View style={styles.container}>
            <Button title="add here" onPress={toggleModal} />
            <Modal
              isVisible={isModalVisible}>
              <View>
                <Form ref={refContainer} type={Profile}/>
                <View>
                  <Button title="Submit" onPress={PostData} />
                  <Button title="Close" onPress={toggleModal} />
                </View>
              </View>
            </Modal>
          </View>
          {state.map( d=> 
            <Card title="Profile">
              <Text style={styles.paragraph}>
                  {d.name}
              </Text>
            </Card>
          )}
        </ScrollView>
        <StatusBar style="auto" />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  }
});
