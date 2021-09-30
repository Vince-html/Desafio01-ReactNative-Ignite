import React, { useEffect, useRef, useState } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import penEdit from '../assets/icons/pen/penEdit.png';



export interface Task {
  id: number;
  title: string;
  done: boolean;
}


interface ItemProps {
  item: Task
  index: number
  editTask: (id: number, taskNewTitle: string) => void;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
}


export function TaskItem({ item, index, toggleTaskDone, removeTask, editTask }: ItemProps) {
  const textInputRef = useRef<TextInput>(null)
  const [editItem, setEditItem] = useState(false)
  const [newTitle, setNewTitle] = useState(item.title)

  function handleStartEditing() {
    setEditItem(true)
  }
  function handleCancelEditing() {
    setEditItem(false)
    setNewTitle(item.title)
  }
  function handleSubmitEditing(id: number) {
    editTask(id, newTitle)
    setEditItem(false)
  }
  useEffect(() => {
    if (textInputRef.current) {
      if (editItem) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editItem])


  return (
    <>

      <View >
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}

        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            ref={textInputRef}
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={newTitle}
            onChangeText={setNewTitle}
            editable={editItem}
            onSubmitEditing={() => handleSubmitEditing(item.id)}
          />


        </TouchableOpacity>
      </View>
      <View style={styles.iconsContainer} >
        {editItem ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            <Image source={penEdit} />
          </TouchableOpacity>
        )}

        <View
          style={styles.iconsDivider}
        />

        <TouchableOpacity
          disabled={editItem}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: editItem ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,

    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,

  },
  iconsDivider: {
    marginRight: 12,
    marginLeft: 12,
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
  }
})
