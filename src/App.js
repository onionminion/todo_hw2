import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import AddScreen from './components/item_screen/AddScreen'
import ListScreen from './components/list_screen/ListScreen'
import ModalBox from './components/modal_screen/ModalBox'
import jsTPS from './jsTPS/jsTPS'
import MoveUp_Transaction from './jsTPS/MoveUp_Transaction'
import MoveDown_Transaction from './jsTPS/MoveDown_Transaction'
import Removal_Transaction from './jsTPS/Removal_Transaction'
import NameChange_Transaction from './jsTPS/NameChange_Transaction'
import OwnerChange_Transaction from './jsTPS/OwnerChange_Transaction'
import AddItem_Transaction from './jsTPS/AddItem_Transaction'
import EditItem_Transaction from './jsTPS/EditItem_Transaction'
import uuid from "uuid"


const AppScreen = {
	HOME_SCREEN: "HOME_SCREEN",
	LIST_SCREEN: "LIST_SCREEN",
	ITEM_SCREEN: "ITEM_SCREEN",
	ADD_SCREEN: "ADD_SCREEN"
}

class App extends Component {
	tps = new jsTPS();
	moveUpT = new MoveUp_Transaction();
	oldItem = null;
	newItem = null;
	state = {
		currentScreen: AppScreen.HOME_SCREEN,
		todoLists: testTodoListData.todoLists,
		currentList: null,
		currentItem: null,
		taskClicked: false,
		dueDateClicked: false,
		statusClicked: false,
		trashClicked: false,
		itemsUpdated: false,
	}

	showDialog = () => {
		if (!this.state.trashClicked) {
			this.setState({ trashClicked: true });
		}
	}

	hideDialog = () => {
		if (this.state.trashClicked) {
			this.setState({ trashClicked: false });
		}
	}

	goHome = () => {
		this.updateOrder();
		this.tps.clearAllTransactions();
		this.setState({ currentScreen: AppScreen.HOME_SCREEN });
		this.setState({ currentList: null });
	}

	updateOrder = () => {
		let temp = [...this.state.todoLists.filter(list => list !== this.state.currentList)];
		temp.unshift(this.state.currentList);
		this.setState({todoLists: temp});
	}

	loadList = (todoListToLoad) => {
		this.setState({ currentScreen: AppScreen.LIST_SCREEN });
		this.setState({ currentList: todoListToLoad });
		console.log("currentList: " + this.state.currentList);
		console.log("currentScreen: " + this.state.currentScreen);
	}

	addList = () => {
		let index = uuid.v4();
		var newList = {
			key: index,
			name: 'Unknown',
			owner: 'Unknown',
			items: [],
		};
		this.setState({ todoLists: [...this.state.todoLists, newList] });
		this.setState({ currentScreen: AppScreen.LIST_SCREEN });
		this.setState({ currentList: newList });
		console.log("currentList: " + this.state.currentList);
		console.log("currentScreen: " + this.state.currentScreen);
	}

	removeList = (listToDelete) => {
		this.setState({ todoLists: [...this.state.todoLists.filter(list => list !== listToDelete)] });
		this.tps.clearAllTransactions();
		this.setState({ currentScreen: AppScreen.HOME_SCREEN });
		this.setState({ currentList: null });
		this.hideDialog();
	}

	getListName = () => {
        return this.state.currentList.name;
	}
	
    setListName = (initName) => {
        const list = this.state.currentList;
		list.name = initName;
		this.setState({currentList: list});     
	}

    getListOwner = () => {
		return this.state.currentList.owner;
	}
	
    setListOwner = (owner) => {
		const list = this.state.currentList;
		list.owner = owner;
		this.setState({currentList: list});
	}
	
	processSetListName(name) {
		this.tps.addTransaction(new NameChange_Transaction(this.getListName, this.setListName, name));
	}

	processSetListOwner(owner) {
		this.tps.addTransaction(new OwnerChange_Transaction(this.getListOwner, this.setListOwner, owner));
	}

	sortItemsByTask = (listToSort) => {
		this.setState({ taskClicked: !this.state.taskClicked });
		this.setState({ currentList: listToSort });
		if (this.state.taskClicked)
			listToSort.items.sort((item1, item2) => {
				if (item1.description < item2.description)
					return -1;
				else if (item1.description > item2.description)
					return 1;
				else
					return 0;
			});
		else
			listToSort.items.sort((item1, item2) => {
				if (item1.description < item2.description)
					return 1;
				else if (item1.description > item2.description)
					return -1;
				else
					return 0;
			});
		this.loadList(listToSort);
	}

	sortItemsByDueDate = (listToSort) => {
		this.setState({ dueDateClicked: !this.state.dueDateClicked });
		this.setState({ currentList: listToSort });
		if (this.state.dueDateClicked)
			listToSort.items.sort((item1, item2) => {
				if (item1.due_date < item2.due_date)
					return -1;
				else if (item1.due_date > item2.due_date)
					return 1;
				else
					return 0;
			});
		else
			listToSort.items.sort((item1, item2) => {
				if (item1.due_date < item2.due_date)
					return 1;
				else if (item1.due_date > item2.due_date)
					return -1;
				else
					return 0;
			});
		this.loadList(listToSort);
	}

	sortItemsByStatus = (listToSort) => {
		this.setState({ statusClicked: !this.state.statusClicked });
		this.setState({ currentList: listToSort });
		if (this.state.statusClicked)
			listToSort.items.sort((item1, item2) => {
				if (item1.completed < item2.completed)
					return -1;
				else if (item1.completed > item2.completed)
					return 1;
				else
					return 0;
			});
		else
			listToSort.items.sort((item1, item2) => {
				if (item1.completed < item2.completed)
					return 1;
				else if (item1.completed > item2.completed)
					return -1;
				else
					return 0;
			});
		this.loadList(listToSort);
	}

	updateTodoList = (itemIndex, itemToDelete) => {
		let newItems = [...this.state.currentList.items];
		newItems.splice(itemIndex, 0, itemToDelete);
		let listIndex = this.state.todoLists.indexOf(this.state.currentList);
		this.setState(prev => {
			let todoLists = Object.assign([], prev.todoLists);  
			todoLists[listIndex].items = newItems;                                      
			return { todoLists };                              
		});
		this.loadList(this.state.currentList);
	}

	removeItem = (itemToDelete) => {
		let newItems = [...this.state.currentList.items.filter(item => item !== itemToDelete)];
		let index = this.state.todoLists.indexOf(this.state.currentList);
		this.setState(prev => {
			let todoLists = Object.assign([], prev.todoLists);  
			todoLists[index].items = newItems;                                      
			return { todoLists };                              
		});    
	}

	processRemoveItem = (itemToDelete) => {
		let itemIndex = this.state.currentList.items.indexOf(itemToDelete);
		this.tps.addTransaction(new Removal_Transaction(itemIndex, itemToDelete, this.removeItem, this.updateTodoList));
	}

	moveItemUp = (index) => {
		if (index !== 0) {
			let listIndex = this.state.todoLists.indexOf(this.state.currentList);
			let items = this.state.currentList.items;
			let itemBefore = items[index-1];
			items[index-1] = items[index];
			items[index] = itemBefore;
			this.setState(prev => {
				let todoLists = Object.assign([], prev.todoLists);  
				todoLists[listIndex].items = items;                                      
				return { todoLists };                              
			});
			this.setState({itemsUpdated: true});
		}
	}

	processMoveItemUp = (index) => {
		this.tps.addTransaction(new MoveUp_Transaction(index, this.moveItemUp, this.moveItemDown));
	}

	moveItemDown = (index) => {
		if (index !== this.state.currentList.items.length-1) {
			let listIndex = this.state.todoLists.indexOf(this.state.currentList);
			let items = this.state.currentList.items;
			let itemAfter = items[index+1];
			items[index+1] = items[index];
			items[index] = itemAfter;
			this.setState(prev => {
				let todoLists = Object.assign([], prev.todoLists);  
				todoLists[listIndex].items = items;                                      
				return { todoLists };                              
			});
			this.setState({itemsUpdated: true});
		}
	}

	processMoveItemDown = (index) => {
		this.tps.addTransaction(new MoveDown_Transaction(index, this.moveItemDown, this.moveItemUp));
	}

	goItem = (itemToLoad) => {
		this.setState({currentScreen: AppScreen.ITEM_SCREEN});
		this.setState({currentItem: itemToLoad});
	}

	getItemDescription = () => {
        return this.state.currentItem.description;
    }
    setItemDescription = (description) => {
		let item = this.state.currentItem;
		item.description = description;
		this.setState({currentItem: item});
	}
	getItemAssignedTo = () => {
        return this.state.currentItem.assigned_to;
    }
    setItemAssignedTo = (assignedTo) => {
		let item = this.state.currentItem;
		item.assigned_to = assignedTo;
		this.setState({currentItem: item});
    }
    getItemDueDate = () => {
        return this.state.currentItem.due_date;
    }
    setItemDueDate = (dueDate) => {
		let item = this.state.currentItem;
		item.due_date = dueDate;
		this.setState({currentItem: item});
    }
    getItemCompleted = () => {
        return this.state.currentItem.completed;
    }
    setItemCompleted = (completed) => {
		let item = this.state.currentItem;
		item.completed = completed;
		this.setState({currentItem: item});
    }

	addNewItem = () => {
		let index = uuid.v4();
		this.newItem = {
			key: index,
			description: "Unknown",
			due_date: null,
			assigned_to: "Unknown",
			completed: false
		};
		this.setState({currentScreen: AppScreen.ADD_SCREEN});
		this.setState({currentItem: this.newItem});
	}

	submitAdding = (itemToAdd) => {
		let listIndex = this.state.todoLists.indexOf(this.state.currentList);
		let items = this.state.currentList.items;
		items.push(itemToAdd);
		this.setState(prev => {
			let todoLists = Object.assign([], prev.todoLists);  
			todoLists[listIndex].items = items;                                      
			return { todoLists };                              
		});
		this.loadList(this.state.currentList);
	}

	cancelAdding = () => {
		this.loadList(this.state.currentList);
	}
	
	editItem = (itemSelected) => {
		this.oldItem = {
			key: itemSelected.key,
			description: itemSelected.description,
			due_date: itemSelected.due_date,
			assigned_to: itemSelected.assigned_to,
			completed: itemSelected.completed,
		}
		this.goItem(itemSelected);
	}

	setCurrentItem = (item, itemIndex) => {
		let items = [...this.state.currentList.items];
		items[itemIndex] = item;
		let listIndex = this.state.todoLists.indexOf(this.state.currentList);
		this.setState({currentItem: item});
		this.setState(prev => {
			let todoLists = Object.assign([], prev.todoLists);  
			todoLists[listIndex].items = items;                                     
			return { todoLists };                              
		});
		this.loadList(this.state.currentList);
	}

	removeItemOfKey = (key) => {
		let items = [];
		for (let i = 0; i < this.state.currentList.items.length; i++) {
			if (this.state.currentList.items[i].key !== key)
				items.push(this.state.currentList.items[i]);
		}
		let index = this.state.todoLists.indexOf(this.state.currentList);
		this.setState(prev => {
			let todoLists = Object.assign([], prev.todoLists);  
			todoLists[index].items = items;                                      
			return { todoLists };                              
		}); 
	}
	
	processEditItem = () => {
		let items = [...this.state.currentList.items];
		let itemIndex = items.indexOf(this.state.currentItem);
		this.tps.addTransaction(new EditItem_Transaction(itemIndex, this.state.currentItem, this.oldItem, this.submitEditing, this.setCurrentItem));
	}

	processAddItem = () => {
		this.tps.addTransaction(new AddItem_Transaction(this.submitAdding, this.removeItemOfKey, this.newItem));
	}

	executeUndo = () => {
		this.tps.undoTransaction();
		console.log("undo");
	}

	executeRedo = () => {
		this.tps.doTransaction();
		console.log("redo");
	}

	render() {
		switch (this.state.currentScreen) {
			case AppScreen.HOME_SCREEN:
				return <HomeScreen
					addList={this.addList.bind(this)}
					loadList={this.loadList.bind(this)}
					todoLists={this.state.todoLists} />;
			case AppScreen.LIST_SCREEN:
				return <div>
					<ListScreen
						processSetListName={this.processSetListName.bind(this)}
						getListName={this.getListName.bind(this)}
						processSetListOwner={this.processSetListOwner.bind(this)}
						getListOwner={this.getListOwner.bind(this)}
						goHome={this.goHome.bind(this)}
						todoList={this.state.currentList}
						removeItem={this.removeItem.bind(this)}
						processMoveItemUp={this.processMoveItemUp.bind(this)}
						processMoveItemDown={this.processMoveItemDown.bind(this)}
						processRemoveItem={this.processRemoveItem.bind(this)}
						itemsUpdated={this.state.itemsUpdated}
						showDialog={this.showDialog.bind(this)}
						editItem={this.editItem.bind(this)}
						addNewItem={this.addNewItem.bind(this)}
						executeUndo={this.executeUndo.bind(this)}
						executeRedo={this.executeRedo.bind(this)}
						sortItemsByTask={this.sortItemsByTask.bind(this)}
						sortItemsByDueDate={this.sortItemsByDueDate.bind(this)}
						sortItemsByStatus={this.sortItemsByStatus.bind(this)} />
					<ModalBox
						trashClicked={this.state.trashClicked}
						hideDialog={this.hideDialog}
						todoList={this.state.currentList}
						removeList={this.removeList} />
					</div>;
			case AppScreen.ITEM_SCREEN:
				return <ItemScreen
					cancelAdding={this.cancelAdding.bind(this)}
					processEditItem={this.processEditItem.bind(this)}
					getItemDescription={this.getItemDescription.bind(this)} 
					setItemDescription={this.setItemDescription.bind(this)}
					getItemAssignedTo={this.getItemAssignedTo.bind(this)} 
					setItemAssignedTo={this.setItemAssignedTo.bind(this)}
					getItemCompleted={this.getItemCompleted.bind(this)} 
					setItemCompleted={this.setItemCompleted.bind(this)}
					getItemDueDate={this.getItemDueDate.bind(this)} 
					setItemDueDate={this.setItemDueDate.bind(this)}
					todoItem={this.state.currentItem}/>;
			case AppScreen.ADD_SCREEN:
				return <AddScreen
					getItemDescription={this.getItemDescription.bind(this)} 
					setItemDescription={this.setItemDescription.bind(this)}
					getItemAssignedTo={this.getItemAssignedTo.bind(this)} 
					setItemAssignedTo={this.setItemAssignedTo.bind(this)}
					getItemCompleted={this.getItemCompleted.bind(this)} 
					setItemCompleted={this.setItemCompleted.bind(this)}
					getItemDueDate={this.getItemDueDate.bind(this)} 
					setItemDueDate={this.setItemDueDate.bind(this)}
					cancelAdding={this.cancelAdding.bind(this)}
					processAddItem={this.processAddItem.bind(this)}/>;
			default:
				return <div>ERROR</div>;
		}
	}
}

export default App;