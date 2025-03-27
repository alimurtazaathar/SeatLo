import { View, Text, StyleSheet } from 'react-native';
import React, { useRef, useState,useCallback } from 'react';
import { PaperProvider, IconButton, Menu } from 'react-native-paper';

const HamburgerMenu = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <IconButton icon="menu" size={24} onPress={() => setVisible(true)} />
        }
      >
        <Menu.Item onPress={() => console.log('option1 clicked')} title="Option 1" />
        <Menu.Item onPress={() => console.log('option2 clicked')} title="Option 2" />
        <Menu.Item onPress={() => console.log('option3 clicked')} title="Option 3" />
      </Menu>
    </View>
  );
};
export default HamburgerMenu;
