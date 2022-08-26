import React, {useState} from "react";
import {
    FlatList,
    ListRenderItem,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {DelButton} from "./svg/DelButton";
import {AddButton} from "./svg/AddButton";

type TaskType = {
    key: string,
    title: string,
    isDone: boolean,
}

export const Main = () => {
    const [tasks, setTasks] = useState<TaskType[]>([
        {
            key: '1',
            title: 'HTML',
            isDone: true
        },
        {
            key: '2',
            title: 'React',
            isDone: false
        },
        {
            key: '3',
            title: 'React-native',
            isDone: false
        },
    ])
    const [title, setTitle] = useState('')

    const addTask = () => {
        const newTask: TaskType = {
            key: new Date().getTime().toString(),
            title,
            isDone: false,
        }
        setTasks([newTask, ...tasks])
        setTitle('')
    };
    const removeTask = (key: string) => {
        setTasks(tasks.filter((el) => el.key !== key))
    }
    const updateTask = (key: string) => {
        setTasks(tasks.map((el) => el.key === key ? {
            ...el,
            isDone: !el.isDone
        } : el))
    }

    const render: ListRenderItem<TaskType> = ({item}) => {
        return <View>
            <TouchableOpacity style={[styles.item, {opacity: item.isDone ? 0.2 : 1}]}
                              onLongPress={() => removeTask(item.key)}
                              onPress={() => updateTask(item.key)}>
                <>
                    <Text
                        style={[styles.title, {textDecorationLine: item.isDone ? 'line-through' : 'none'}]}>{item.title}</Text>
                    <DelButton/>
                </>
            </TouchableOpacity>
        </View>
    };

    return (
        <View>
            <View style={styles.header}>
                <TextInput style={styles.input} value={title} onChangeText={setTitle}/>
                <TouchableOpacity onPress={addTask}>
                    <AddButton style={{marginRight: 10}}/>
                </TouchableOpacity>
            </View>
            <FlatList data={tasks}
                      renderItem={render}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#ec7f7f',
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        letterSpacing: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    input: {
        width: 200,
        height: 30,
        borderWidth: 1,
        borderRadius: 5,
    }
})