import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);


  function handleAddTask(newTaskTitle: string) {
    const verifyTask = tasks.find(t => t.title === newTaskTitle);
    console.log(!verifyTask);
    if (!verifyTask === true) {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks(s => [...s, data])
    } else if (!verifyTask === false) {
      Alert.alert(`Task ${newTaskTitle} já cadastrada`, 'Você não pode cadastrar uma task com o mesmo nome')
    }


  }

  function handleToggleTaskDone(id: number) {
    const updateTask = tasks.map(task => ({ ...task }))
    const findTask = updateTask.find(task => task.id === id);
    if (!findTask) return;
    findTask.done = !findTask.done;
    setTasks(updateTask)

  }

  function handleEditTask(id: number, taskNewTitle: string) {
    const updateTask = tasks.map(task => ({ ...task }))
    const findTask = updateTask.find(task => task.id === id);
    if (!findTask) return;
    findTask.title = taskNewTitle;
    setTasks(updateTask)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        { text: "Sim", onPress: () => setTasks(s => s.filter(s => s.id !== id)) }
      ])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        editTask={handleEditTask}
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})