import {StyleSheet, Text} from 'react-native';
import type {ReactNode} from 'react';
import type {TextStyle} from 'react-native';
type Props = {
  children?: ReactNode;
  textFormat: 'title' | 'title2' | 'textBody' | 'textBody2';
  style?: TextStyle;
};

export const TextComponent = ({children, textFormat, style}: Props) => {
  return (
    <Text
      style={[styles[textFormat], {minWidth: '16%', color: 'white'}, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
  },
  title2: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  textBody: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textBody2: {
    fontSize: 15,
  },
});
