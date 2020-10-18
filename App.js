import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card} from 'react-native-elements';

export default function App() {

  const [state, setState] = useState([])
  useEffect(()=> {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json =>setState(json))
      .catch(error => console.error(error))
  }, [])

  return (
    <>
    <SafeAreaView style={ styles.container}>
      <View >
        <ScrollView>
          {state.map( d=> 
            <Card title="Profile">
              <Text style={styles.paragraph}>
                  {d.title}
              </Text>
            </Card>
          )}
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  }
});
