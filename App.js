import React from 'react';
import { Text, View, Button, StyleSheet, FlatList, Image, TextInput, Alert } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'; // Version can be specified in package.json

const logo = require('./src/wall.jpg');

class openScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ flex: 0.8, alignItems: 'center' }}>
          <Image source={logo} />
          </View>
        <Text style = {{ fontSize: 24, textAlign :'center' }}>RUKER</Text>
                <Text style = {{ fontSize: 24, textAlign :'center' }}>(Rumah Kreatif)</Text>
                     <Text style = {{ fontSize: 24, textAlign :'center' }}>Buka 24 Jam</Text>
        <Button
          title="Login"
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}
        />
          <View style={styles.Header}>
               <Text style={styles.Text}>Alamat : Jln. WijayaKusuma, Gg.IV, No.1, Singaraja</Text>
               <Text style={styles.Text}>No.Telepon : 085792249877</Text>
      </View>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      cari: '',
      refreshing: false,
    };
}
cariData = () => {
            this.setState({ ActivityIndicator_Loading: true },
                () => {
                    this.setState({ refreshing: true });
                    fetch(
                            "http://gusnando.com/mobile/adi/search.php", {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    cari: this.state.cari
                                })
                            }
                        )
                        .then(response => response.json())
                        .then(responseJson => {
                            console.log("comp");
                            console.log(responseJson);
                            this.setState({
                                data: responseJson,
                                error: responseJson.error || null,
                                loading: false,
                                refreshing: false,
                                ActivityIndicator_Loading: false
                            });
                        });
                }
            );
        };



  componentDidMount()  {
      const url = 'http://gusnando.com/mobile/adi/daftarjasa.php';
       this.setState({ loading: true });
      fetch (url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("comp");
        console.log(responseJson);
        this.setState({
          data: responseJson,
          error: responseJson.error || null,
          loading: false,
          refreshing: false
        });
      }
    );
  }
  render() {
    return (
      <View style={{justifyContent:'center'}}>
      <View style={styles.Header}>
          <Text style={styles.TextHeader}>RUKER</Text>
          <Text style={styles.TextHeader}>(Rumah Kreatif)</Text>
      </View>
            <TextInput  
        placeholder = "Masukan Kata Kunci" 
        style = { styles.TextInputStyleClass } 
        underlineColorAndroid = "transparent"
        returnKeyType="done"
        onChangeText = {(TextInputText) => this.setState({ cari
          : TextInputText })} 
        onChange = {this.cariData}
        style={{marginHorizontal: 10, padding: 10}}
                    />
        <FlatList
          style={styles.backgroundList}
          data={this.state.data}
          renderItem={({item}) =>
            <View style={styles.ListItem}>
              <Text style={styles.jasa}>{item.jasa}</Text>
              <Text style={styles.harga}>{item.harga.toUpperCase()}</Text>
            </View>
        }
        />

      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor()
    {
        super();
        this.state = {
          jasa: '',
          harga: '',
          ActivityIndicator_Loading: false,
        }
    }

    submitData = () =>
    {
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
            fetch('https://gusnando.com/mobile/adi/tambahjasa.php',
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                  jasa : this.state.jasa,
                  harga : this.state.harga,
                })

            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                Alert.alert('SUCESS',responseJsonFromServer);
                this.setState(
                {
                  jasa: '',
                  harga: '',
                  ActivityIndicator_Loading : false
                });

            }).catch((error) =>
            {
                console.error(error);

                this.setState({ ActivityIndicator_Loading : false});
            });
        });
    }

  render() {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.tambahJasa}>TAMBAH JASA</Text>
        <TextInput
          placeholder= 'Masukkan nama jasa'
          style={styles.textInput}
          onChangeText = {(TextInputText) => this.setState({ jasa: TextInputText })}
          value={this.state.jasa}
        />
        <TextInput
          placeholder= 'Masukkan harga'
          style={styles.textInput}
          onChangeText = {(TextInputText) => this.setState({ harga: TextInputText })}
          value={this.state.harga}
        />
        <Button title='SUBMIT' onPress = {this.submitData}/>
      </View>
    );
  }
}

class OptionScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 20}}> PESAN </Text>
        <Text style={{fontSize: 20}}> No Hp/ WA: 081339211898 </Text>
        <Text style={{fontSize: 20}}> Ig : adi_satriawan </Text>
        <Text style={{fontSize: 20}}> Id Line : adi_satriawan </Text>
      </View>
    );
  }
}

const Opening = StackNavigator({
  open: { screen: openScreen },
  Home: { screen: HomeScreen },

});
const Setting = StackNavigator({
  Settings: { screen: SettingsScreen },

});   
const Option = StackNavigator({
  Option: { screen: OptionScreen },

});


export default TabNavigator({
  Daftar_Jasa: { screen: Opening },
  Tambah_Jasa: { screen: Setting },
  Pesan: { screen: OptionScreen },
});

const styles = StyleSheet.create({
  Header: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#000000',
      padding: 20,
      marginTop: 20,
  },
  TextHeader: {
      fontSize: 30,
      textAlign: 'center',
      color: '#FFFFFF'
  },
    Text: {
      fontSize: 15,
      textAlign: 'center',
      color: '#FFFFFF'
  },
  ListItem: {
      backgroundColor:'#3f51b5',
      flex: 1,
      paddingLeft: 20,
      paddingVertical: 10,
      margin: 10,
      borderRadius: 3,
  },
  ListFirst: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },
  jasa:{
    fontSize: 22,
    marginVertical: 10,
    color: 'white',
    textAlign: 'center'
  },
  harga: {
    color: 'white',
    textAlign: 'center'
  },
  backgroundList: {
    backgroundColor: '#e8eaf6'
  },
  textInput: {
    fontSize: 22,
    marginVertical: 10,
  },
  tambahJasa: {
    fontSize: 28,
  }

});

