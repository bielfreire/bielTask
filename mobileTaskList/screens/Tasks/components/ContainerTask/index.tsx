
import { Spinner, Text, VStack } from 'native-base';
import { ContainerProps } from '../../interfaces';
import { ContentTask } from '../ContentTask';


export function ContainerTask(
    { isLoading,
        dataItem,
        handleToggleTaskCompletion,
    }: ContainerProps
) {
    const { foundDataItem } = dataItem;

    return (
        <VStack alignItems={"flex-start"} mt={6} space={6}>
            {isLoading && (
                <Spinner size={"md"} />
            )}
            {foundDataItem && foundDataItem.length > 0 ? foundDataItem.map((taskItem) => (
                <ContentTask key={taskItem.id} task={taskItem} handleToggleTaskCompletion={handleToggleTaskCompletion} />
            )) : <Text>
                    Nenhuma Tarefa Encontrada!
                </Text>}
            
            
        </VStack>
    )
}