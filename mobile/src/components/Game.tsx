import { Button, HStack, Text, useTheme, VStack } from 'native-base';
import { X, Check } from 'phosphor-react-native';
import { getName } from 'country-list';
import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br'

import { Team } from './Team';

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface GameProps {
  id: string;
  date: string;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  guess: null | GuessProps;
};

interface Props {
  data: GameProps;
  onGuessConfirm: () => void;
  setFirstTeamPoints: (value: string) => void;
  setSecondTeamPoints: (value: string) => void;
  isConfirmLoading?: boolean
};

export function Game({ data, setFirstTeamPoints, setSecondTeamPoints, onGuessConfirm, isConfirmLoading }: Props) {
  const { colors, sizes } = useTheme();

  const date = dayjs(data.date);
  const isTimeOut = dayjs().isAfter(date);

  const when = dayjs(data.date)
    .locale(ptBR)
    .format('DD [de] MMMM [de] YYYY [às] HH:00[h]');

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {getName(data.firstTeamCountryCode)} vs. {getName(data.secondTeamCountryCode)}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {when}
      </Text>

      <HStack mt={4} w="full" justifyContent="space-between" alignItems="center">
        <Team
          code={data.firstTeamCountryCode}
          teamPoints={data.guess?.firstTeamPoints}
          isTimeOut={isTimeOut}
          position="right"
          onChangeText={setFirstTeamPoints}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secondTeamCountryCode}
          teamPoints={data.guess?.secondTeamPoints}
          isTimeOut={isTimeOut}
          position="left"
          onChangeText={setSecondTeamPoints}
        />
      </HStack>

      {
        !data.guess &&
        <Button
          size="xs"
          w="full"
          bgColor={isTimeOut ? "gray.600" : "green.500"}
          mt={4}
          isDisabled={isTimeOut}
          onPress={onGuessConfirm}
          isLoading={isConfirmLoading}
          _loading={{
            _spinner: { color: "black" }
          }}
        >
          {!isTimeOut ?
            <HStack alignItems="center">
              <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
                CONFIRMAR PALPITE
              </Text>

              <Check color={colors.white} size={sizes[4]} />
            </HStack>
            :
            <Text color="gray.300" fontSize="xs" fontFamily="heading" mr={3}>
              TEMPO ESGOTADO
            </Text>
          }
        </Button>
      }
    </VStack>
  );
}