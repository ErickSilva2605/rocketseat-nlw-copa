import {
  Button as ButtonNativeBase,
  IButtonProps as IButtonNativeBaseProps,
  Text
} from 'native-base';

interface IButtonProps extends IButtonNativeBaseProps {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY';
}

export function Button({ title, type = 'PRIMARY', ...rest }: IButtonProps) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      bg={type === 'SECONDARY' ? 'red.500' : "yellow.500"}
      _pressed={{
        bg: type === 'SECONDARY' ? "red.600" : "yellow.600"
      }}
      _loading={{
        _spinner: { color: "black" }
      }}
      {...rest}
    >
      <Text
        textTransform="uppercase"
        fontSize="sm"
        fontFamily="heading"
        color={type === 'SECONDARY' ? 'white' : "black"}
      >
        {title}
      </Text>
    </ButtonNativeBase >
  );
}