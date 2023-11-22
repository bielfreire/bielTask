export interface Task {
  id: string;
  title: string;
  description: string;
  taskDateTime: string | Date;
  duration: number | string;
  isComplete: boolean;
}

export type campsFormTaskProps = Omit<Task, 'id' | 'isComplete'>;

export type statusToastType = 'success' | 'error' | 'warning' | 'info';

export interface ContainerProps {
  isLoading: boolean;
  dataItem: { data: Task[]; foundDataItem: Task[] };
  handleToggleTaskCompletion: (id: number | string) => void;
  setsFunctions: {
    setIdTaskSelected: React.Dispatch<React.SetStateAction<string>>;
    setHandleAlertDialog: React.Dispatch<React.SetStateAction<boolean>>;
  };
  prepareEdit: (id: string | number) => void;
}