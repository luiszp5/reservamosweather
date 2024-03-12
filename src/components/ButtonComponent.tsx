import {StyleSheet, TouchableOpacity} from 'react-native';
import {TextComponent} from './TextComponent';
import type {ReactNode} from 'react';
import type {ViewStyle} from 'react-native';

type Props = {
  typeButton?: 'principal' | 'secondary';
  children?: ReactNode;
  style?: ViewStyle;
  onPress: () => void;
};

export const ButtonComponent = ({
  onPress,
  typeButton = 'principal',
  children,
  style,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles[typeButton], style]}>
      <TextComponent textFormat="textBody">{children}</TextComponent>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  principal: {
    backgroundColor: '#a7c1cd',
    height: 40,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  secondary: {
    backgroundColor: 'rgba(255, 0, 0, 0.9)',
    height: 40,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
