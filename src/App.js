import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import ModalBox from './components/modal_screen/ModalBox'


const AppScreen = { 
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN",
  // MODAL_BOX: "MODAL_BOX"
}

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    taskClicked: false,
    dueDateClicked: false,
    statusClicked: false,
    trashClicked: false
  }
  
  showDialog = () => {
    if (!this.state.trashClicked) {
      this.setState({trashClicked: true});  //change trashClicked back to false later
      // this.setState({currentScreen: AppScreen.MODAL_BOX});
    }
  }

  hideDialog = () => {
    if (this.state.trashClicked) {
      this.setState({trashClicked: false});
      // this.setState({currentScreen: AppScreen.LIST_SCREEN});
    }
  }

  goHome = () => {
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  addList = () => {
    let index = '' + this.state.todoLists.length;
    const newList = {
      key: index,
      name: 'Unknown',
      owner: 'Unknown',
      items: []
    };
    this.setState({ todoLists: [...this.state.todoLists, newList] });
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: newList});
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
  }

  removeList = (listToDelete) => {
    this.setState({ todoLists: [...this.state.todoLists.filter(list => list !== listToDelete)] });
    this.goHome();
    this.hideDialog();
  }
  
  sortItemsByTask = (listToSort) => {
    this.setState({taskClicked: !this.state.taskClicked});
    this.setState({currentList: listToSort});
    if (this.state.taskClicked) 
      listToSort.items.sort((item1, item2) => 
      {if (item1.description < item2.description)
        return -1;
      else if (item1.description > item2.description)
        return 1;
      else
        return 0;});
    else 
      listToSort.items.sort((item1, item2) => 
      {if (item1.description < item2.description)
        return 1;
      else if (item1.description > item2.description)
        return -1;
      else
        return 0;});
    this.loadList(listToSort);
  }

  sortItemsByDueDate = (listToSort) => {
    this.setState({dueDateClicked: !this.state.dueDateClicked});
    this.setState({currentList: listToSort});
    if (this.state.dueDateClicked) 
      listToSort.items.sort((item1, item2) => 
      {if (item1.due_date < item2.due_date)
        return -1;
      else if (item1.due_date > item2.due_date)
        return 1;
      else
        return 0;});
    else 
      listToSort.items.sort((item1, item2) => 
      {if (item1.due_date < item2.due_date)
        return 1;
      else if (item1.due_date > item2.due_date)
        return -1;
      else
        return 0;});
    this.loadList(listToSort);
  }

  sortItemsByStatus = (listToSort) => {
    this.setState({statusClicked: !this.state.statusClicked});
    this.setState({currentList: listToSort});
    if (this.state.statusClicked) 
      listToSort.items.sort((item1, item2) => 
      {if (item1.completed < item2.completed)
        return -1;
      else if (item1.completed > item2.completed)
        return 1;
      else
        return 0;});
    else 
      listToSort.items.sort((item1, item2) => 
      {if (item1.completed < item2.completed)
        return 1;
      else if (item1.completed > item2.completed)
        return -1;
      else
        return 0;});
    this.loadList(listToSort);
  }

  render() {
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        addList={this.addList.bind(this)}
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} />;
      case AppScreen.LIST_SCREEN:            
        return <div><ListScreen
          goHome={this.goHome.bind(this)}
          todoList={this.state.currentList}
          showDialog={this.showDialog.bind(this)}
          sortItemsByTask={this.sortItemsByTask.bind(this)} 
          sortItemsByDueDate={this.sortItemsByDueDate.bind(this)}
          sortItemsByStatus={this.sortItemsByStatus.bind(this)} />
          <ModalBox 
          trashClicked={this.state.trashClicked}
          hideDialog={this.hideDialog}
          todoList={this.state.currentList}
          removeList={this.removeList}/></div>;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;