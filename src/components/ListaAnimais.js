import React, {Component} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Animal from './Animal';
import {carregarAnimais} from '../actions';
import {bindActionCreators} from 'redux';
import {Content, Icon, View, Fab} from 'native-base';

class ListaAnimais extends Component {
  componentDidMount() {
    this.props.carregarAnimais();
  }

  render() {
    const {animais, navigation} = this.props;
    return (
      <View style={styles.container}>
        <Content padder>
          <FlatList
            data={animais}
            renderItem={({item}) => (
              <Animal navigation={navigation} animal={item} />
            )}
            keyExtractor={item => item._id}
          />
        </Content>
        <Fab
          containerStyle={{}}
          style={styles.fab}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('IncluirAnimal')}>
          <Icon name="add" />
        </Fab>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    animais: state.animais,
    usuarioLogado: state.usuarioLogado,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({carregarAnimais}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListaAnimais);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {backgroundColor: '#5067FF'},
});
