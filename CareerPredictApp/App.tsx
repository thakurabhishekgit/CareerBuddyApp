import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';
import axios from 'axios';

const App = () => {
  const [marks1, setMarks1] = useState('');
  const [marks2, setMarks2] = useState('');
  const [marks3, setMarks3] = useState('');
  const [marks4, setMarks4] = useState('');
  const [favSub, setFavSub] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');

    if (!marks1 || !marks2 || !marks3 || !marks4 || !favSub) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:5000/predict', {
        Marks1: parseInt(marks1),
        Marks2: parseInt(marks2),
        Marks3: parseInt(marks3),
        Marks4: parseInt(marks4),
        Fav_Sub: favSub,
      });

      if (response.data && response.data['Predicted Stream'] && response.data['Probability']) {
        setPrediction(response.data);
      } else {
        setError('Invalid response from server.');
      }
    } catch (err) {
      console.error('Error during API request:', err);
      setError('Something went wrong! Please try again.');
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>CareerBuddy</Text>
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Welcome to CareerBuddy</Text>
        <Text style={styles.heroText}>
          Your one-stop solution for career guidance and predictions. Explore opportunities and make informed decisions about your future!
        </Text>

        <Image 
          source={{ uri: 'data:image/jpeg;base64,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' }}
          style={styles.heroImage}
        />

        <Text style={styles.heroContent}>
          CareerBuddy helps you analyze your strengths and interests to guide you towards the best career choices. Whether you're planning to pursue engineering, medicine, arts, or any other field, we are here to assist you at every step!
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Career Prediction</Text>
        <Text style={styles.subtitle}>Enter Your Marks and Favorite Subject</Text>
        <Text>Enter Science marks</Text>
        <TextInput
          style={styles.input}
          placeholder="Marks 1"
          keyboardType="numeric"
          value={marks1}
          onChangeText={setMarks1}
        />
        <Text>Enter Maths marks</Text>
        <TextInput
          style={styles.input}
          placeholder="Marks 2"
          keyboardType="numeric"
          value={marks2}
          onChangeText={setMarks2}
        />
        <Text>Enter Social marks</Text>
        <TextInput
          style={styles.input}
          placeholder="Marks 3"
          keyboardType="numeric"
          value={marks3}
          onChangeText={setMarks3}
        />
        <Text>Enter English marks</Text>
        <TextInput
          style={styles.input}
          placeholder="Marks 4"
          keyboardType="numeric"
          value={marks4}
          onChangeText={setMarks4}
        />
        <Text>Enter Favourite subject marks </Text>
        <Text>(Science/Maths/Social/English)</Text>
        <TextInput
          
          style={styles.input}
          placeholder="Favorite Subject"
          value={favSub}
          onChangeText={setFavSub}
        />

        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} color="#007BFF" />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {prediction && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Prediction Result</Text>
            <Text style={styles.resultText}>Predicted Stream: {prediction['Predicted Stream']}</Text>
            <Text style={styles.resultText}>Probability: {prediction['Probability']}%</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 CareerBuddy. All Rights Reserved.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  navbar: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
  },
  navbarTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  heroSection: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  heroText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  heroContent: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FFF',
    fontSize: 16,
    marginBottom: 15,
  },
  buttonContainer: {
    width: '90%',
    marginVertical: 10,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    width: '90%',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  footer: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#FFF',
    fontSize: 14,
  },
});

export default App;
