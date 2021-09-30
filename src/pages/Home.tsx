import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  console.log(tasks);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(s => [...s, data])
  }

  function handleToggleTaskDone(id: number) {
    const updateTask = tasks.map(task => ({ ...task }))
    const findTask = updateTask.find(task => task.id === id);
    if (!findTask) return;
    findTask.done = !findTask.done;
    setTasks(updateTask)

  }

  function handleRemoveTask(id: number) {
    setTasks(s => s.filter(s => s.id !== id))

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
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