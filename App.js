import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList,Button } from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

import { useState } from "react";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);


  function startAddGoalHandler() {
    setModalIsVisible(true);
  };
  function endAddGoalHandler() {
    setModalIsVisible(false);
  };
  function addGoalHandler(enteredGoalText) {
    //setCourseGoals([...courseGoals,enteredGoalText]); doable but not optmizedg
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals=>{
      return currentCourseGoals.filter((goal)=>goal.id !== id);
    });
  }

  return (
    <>
    <StatusBar style="light"/>
    <View style={styles.appContianer}>
      <Button title="Add New Goal" color="#a26be9" onPress={startAddGoalHandler}/>
      <GoalInput onAddGoal={addGoalHandler} onCancel={endAddGoalHandler} visible={modalIsVisible}/>
      <View style={styles.goalsContainer}>
        <FlatList
          alwaysBounceVertical={false}
          data={courseGoals}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          renderItem={(itemData) => {
            return <GoalItem text={itemData.item.text} onDeleteItem={deleteGoalHandler} id={itemData.item.id} />;
          }}
        />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContianer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    
  },

  goalsContainer: {
    flex: 4,
  },
});
