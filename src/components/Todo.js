import React ,{useState} from 'react';
//import './App.css';

function Todo (){

    //array of all items
    const [ items,  setItems ] = useState([]);

    //current item that we get from input, key needs to be unique
    const [ currentItem , setCurrentItem] = useState({
            text:'',
            key:''
    });

    //adding item  to items array if not empty
    const addItem = (e) =>{
        //this prevents page from refreshing when click  on submit button
        e.preventDefault();
        const newItem = currentItem;
        if(newItem.text !== ''){
            setItems ( [...items,newItem ]);

            //empty input value after submit
            setCurrentItem({
                text: '',
                key:''
                });
            }
    };


    const  handleInput = (e) =>{
        setCurrentItem({
            currentItem:{
                text: e.target.value,
                key: Date.now()
                }
            });
    };

    const deleteItem = (key) =>{
        const filteredItems = items.filter(item =>
        item.currentItem.key !== key);
        setItems(filteredItems)

    };

    const listItems = items.map( item => {
        return <div className={'list'} key={item.currentItem.key}>
                <p className="relative p-2 bg-white  rounded m-1">{item.currentItem.text}<span ><button  className=" p-1 bg-green-200 rounded m-1 absolute cursor-pointer" onClick={()=> deleteItem(item.currentItem.key)}>X</button></span></p>
               </div>
    });

    return (
        <div className="bg-blue-900 ml-2 flex flex-col rounded p-2">
            <h1 className="text-white font-medium">To Do</h1>
            <form id="form" onSubmit={addItem}>
                <div className={"form-container"}>
                    <input
                        className="p-2 bg-white  rounded m-1"
                        type="text"
                        placeholder={"enter  you  task"}
                        value={currentItem.text }
                        onChange={handleInput}
                    />
                    <button className="p-2 bg-green-200  rounded m-1" type={"submit"}>+</button>
                </div>
            </form>
            <div  className="todo-items">
                {listItems}
            </div>
        </div>
    );
}

export default Todo;
