import { useState } from "react";
import { Heading, VStack, useToast } from 'native-base';
import { useNavigation } from "@react-navigation/native";

import { api } from "../services/api";

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPool() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: 'Informe o código',
          placement: 'top',
          bgColor: 'red.500'
        });
      }

      await api.post('/pools/join', { code: code.toUpperCase() });

      toast.show({
        title: 'Você no bolão com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      });

      navigate('pools');
      setCode('');

    } catch (error) {
      console.error(error);

      if (error.response?.data?.message === 'Pool not found.') {
        return toast.show({
          title: 'Não foi possível encontrar o bolão',
          placement: 'top',
          bgColor: 'red.500'
        });
      }

      if (error.response?.data?.message === 'You are already a join this pool.') {
        return toast.show({
          title: 'Você já está nesse bolão',
          placement: 'top',
          bgColor: 'red.500'
        });
      }

      toast.show({
        title: 'Não foi possível encontrar o bolão.',
        placement: 'top',
        bgColor: 'red.500'
      });
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header
        title="Buscar por código"
        showBackButton
      />

      <VStack mt={8} mx={5} alignItems="center">

        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão através de
          seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize="characters"
          value={code}
          onChangeText={setCode}
        />

        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />

      </VStack>
    </VStack>
  );
}