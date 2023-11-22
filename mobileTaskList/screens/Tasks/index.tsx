import { useState, useEffect, useRef, useContext } from 'react'
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, VStack, HStack, Flex, Box, Checkbox, Modal } from 'native-base';
import { AuthContext } from '../../Context/AuthContext';
import { ContainerTask } from './components/ContainerTask';
import { useGetTasks } from '../../hooks/Tasks/useGetTasks';
import { campsFormTaskProps } from './interfaces';
import { formatDate } from '../../utils/formatDateTimeHours';
import { useEditTasks } from '../../hooks/Tasks/useEditTasks';
import {  
  PieChart,
} from "react-native-chart-kit";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const initialValuesCampsTask = {
  title: '',
  description: '',
  taskDateTime: formatDate(new Date()),
  duration: 1,
};

export function TasksScreen() {
  const [searchTask, setSearchTask] = useState('');
  const [idTaskSelected, setIdTaskSelected] = useState('');
  const [handleShowModalEdit, setHandleShowModalEdit] = useState(false);
  const [handleAlertDialog, setHandleAlertDialog] = useState(false);
  const [isVisibleCharts, setIsVisibleCharts] = useState(false);
  const [campsFormTask, setCampsFormTask] = useState<campsFormTaskProps>(
    initialValuesCampsTask,
  );

  const [modalVisible, setModalVisible] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  // Context
  const {user, setUser} = useContext(AuthContext)

  // My Hooks
  const {
    tasks,
    setTasks,
    foundTasks,
    isLoadingGetTasks,
    getIsCompletedTasks,
  } = useGetTasks(searchTask);
  const [quantityTasksIsCompleted, setQuantityTasksIsCompleted] = useState(
    getIsCompletedTasks(),
  );

  useEffect(() => {
    setQuantityTasksIsCompleted(getIsCompletedTasks());
  }, [tasks]);

  const { handleToggleTaskCompletion } =
    useEditTasks({
      useTasks: [tasks, setTasks],
      clearValues: clearValues,
      setHandleShowModalEdit: setHandleShowModalEdit,
      campsFormTask: campsFormTask,
      idTaskSelected: idTaskSelected,
    });

  // functions calls
  function clearValues() {
    setCampsFormTask(initialValuesCampsTask);
    setSearchTask('');
  }

  function changeValuesCampsTask(
    dataType: keyof campsFormTaskProps,
    value: string,
  ) {
    switch (dataType) {
      case 'title':
        setCampsFormTask({ ...campsFormTask, title: value });
        break;
      case 'description':
        setCampsFormTask({ ...campsFormTask, description: value });
        break;
      case 'taskDateTime':
        const isTime = value.split('T');
        if (isTime) {
          setCampsFormTask({
            ...campsFormTask,
            taskDateTime: `${isTime[0]} ${isTime[1]}`,
          });
          return;
        }
        setCampsFormTask({ ...campsFormTask, taskDateTime: value });
        break;
      case 'duration':
        setCampsFormTask({ ...campsFormTask, duration: value });
        break;
    }
  }

  function prepareEdit(id: string | number) {
    setIdTaskSelected(String(id));
    const taskSelected = tasks.find((task) => task.id === id);
    if (taskSelected) {
      const { title, description, taskDateTime, duration } = taskSelected;
      setCampsFormTask({ title, description, taskDateTime, duration });
      setHandleShowModalEdit(true);
    }
  }

  function handleOrShowChart() {
    setIsVisibleCharts(!isVisibleCharts)
  }

  const navigation = useNavigation();

  function logout() {
    setUser({name: ''})
    navigation.navigate('Inicio' as never)
  }

  const data = quantityTasksIsCompleted.map((quantity, index) => {
    const color = index === 0 ? '#166534' : '#3b82f6'; 
    return {
      name: index === 0 ? 'Feitas' : 'Não Feitas',
      population: quantity,
      color: color,
      legendFontColor: 'black',
      legendFontSize: 15,
    };
  });

  return (
    <View style={styles.container}>
      {/* Botão para Criar Tarefa (Próximas atualizações) */}
      {/* <Button
        position={'absolute'}
        bottom={4}
        right={4}
        backgroundColor={"blue.500"}
        borderRadius={100}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        onPress={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <Icon name="add" size={24} color="white" />
      </Button> */}

      {/* MODAL PARA CRIAR TAREFA (2.0) */}

      {/* <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Crie sua Tarefa</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Nome*</FormControl.Label>
              <Input
                borderRadius={8}
                ref={initialRef}
                isRequired
                value={campsFormTask.title}
                onChangeText={(text) => changeValuesCampsTask('title', text)}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Descrição*</FormControl.Label>
              <Input
                borderRadius={8}
                isRequired
                value={campsFormTask.description}
                onChangeText={(text) => changeValuesCampsTask('description', text)}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Data e Hora do Início*</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Tempo de Duração*</FormControl.Label>
              <Input
                borderRadius={8}
                isRequired
                keyboardType='numeric'
                value={String(campsFormTask.duration)}
                onChangeText={(text) => changeValuesCampsTask('duration', text)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button borderRadius={16} onPress={() => {
                setModalVisible(false);
              }}>
                Adicionar
              </Button>

              <Button borderRadius={16} variant="ghost" colorScheme="blue" onPress={() => {
                setModalVisible(false);
              }}>
                Cancelar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal> */}

      <HStack>
        <Text>Seja Bem vindo, </Text>
        <Text fontWeight={"700"}>{user && user?.name ? user.name : ''}</Text>
        <Button color={"red.400"} padding={0} background={"transparent"} ml={2} onPress={logout}>
          <Ionicons name="log-out" size={20} color={"red"} /> 
        </Button>
      </HStack>

      <HStack mt={4} space={2}>
        <Button
          borderRadius={8}
          bg={"green.700"}
          _pressed={{ bg: 'green.800' }}
          onPress={handleOrShowChart}
        >
          <Text fontWeight={700} color={'white'}>{isVisibleCharts ? 'Listar Tarefas' : 'Ver Gráfico'}</Text>
        </Button>
        <Input
          p={2}
          flex={1}
          borderRadius={8}
          borderWidth={2}
          backgroundColor={'trueGray.100'}
          placeholder='Procurar Tarefa (Título)'
          value={searchTask}
          onChangeText={(text) => setSearchTask(text)}
        />
      </HStack>

      {isVisibleCharts ?
        <PieChart
          data={data}
          width={350}
          height={200}
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
        : <ContainerTask
          dataItem={{ data: tasks, foundDataItem: foundTasks }}
          isLoading={isLoadingGetTasks}
          handleToggleTaskCompletion={handleToggleTaskCompletion}
          setsFunctions={{
            setHandleAlertDialog: setHandleAlertDialog,
            setIdTaskSelected: setIdTaskSelected,
          }}
          prepareEdit={prepareEdit}
        />}
        <Text mt={5}>{tasks ? `Quantidade Total de Tarefas: ${tasks.length}` : '' }</Text>
    </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  }
});
