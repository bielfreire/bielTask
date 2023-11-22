
import { Box, Checkbox, HStack, Spinner, Text, VStack } from 'native-base';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { Task } from '../../interfaces';
import { formatTableDate } from '../../../../utils/formatTableDate';


export function ContentTask(
    { task, handleToggleTaskCompletion }: { task: Task, handleToggleTaskCompletion: (id: number | string) => void }
) {


    return (
        <HStack
            alignItems={"center"}
            space={2}
            bg={"coolGray.200"}
            p={2}
            py={4}
            borderRadius={8}
            borderBottomWidth={2}
            borderBottomColor={"black"}
        >
            <Box>
                <Checkbox
                    value={task.id}
                    isChecked={task.isComplete}
                    name={task.id} id={task.id}
                    onChange={() => handleToggleTaskCompletion(task.id)}
                    accessibilityLabel={`Marcar/desmarcar a tarefa ${task.id}`}
                >
                    <Text></Text>
                </Checkbox>
            </Box>
            <HStack alignItems={"center"} flex={1} space={3}>
                <VStack flex={1}>
                    <Text fontSize={18} fontWeight={600} numberOfLines={1} ellipsizeMode='tail'>{task.title}</Text>
                    <Text fontSize={12} fontWeight={500} numberOfLines={1} ellipsizeMode='tail'>{task.description}</Text>
                    <Text fontSize={12} color={"gray.800"} numberOfLines={1} ellipsizeMode='tail'>{formatTableDate(String(task.taskDateTime))} | Duração {task.duration} Hora(s)</Text>
                </VStack>
                
                {/* botão para editar e deletar Tarefa (2.0) */}
                {/* <Box p={1}>
                    <IconFA name="cog" size={24} />
                </Box> */}
            </HStack>
        </HStack>
    )
}