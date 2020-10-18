//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { TextInput, SafeAreaView, StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { Card} from 'react-native-elements';
import Modal from 'react-native-modal';
import InputForm from './components/inputForm'

export default function App() {

  const [state, setState] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
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
                <InputForm />
                <View>
                  <Button title="Submit" onPress={toggleModal} />
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
