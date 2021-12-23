import React,{useState} from 'react';
import './App.css';
import List from "./components/List"
import ClassComp from "./components/ClassComp"
import {GlobalContextProvider} from './context/GlobalContext';
import axios from "axios";

export const ThemeContext = React.createContext({});

export interface IState{
  people:{
    id:number,
    name:string,
    email:string,
    title:string,
    image?:string,
    isEdit?:boolean,
  }[],
  editIndex?:number
}
function App() {
  const [number,setNumber] =useState<number | string | boolean>(5)
  const [people, setPeople] = useState<IState["people"]>([
  
  ])
  const [editIndex,setEditIndex] =useState<number>()

  React.useEffect(() => {
    setEditIndex(-1)
    axios.get('http://localhost:3333/getPeoples').then((response) => {
      console.log('response',response)
      setPeople(response.data)
      
    });
  }, []);

  const changeNumber =()=>{
    setNumber(true)  //setNumber(10) / setNumber("10") 
  }
  return (
    <div className="App">

      
      <h1>
        React Context
      </h1>
      <ThemeContext.Provider value="dark">
        <GlobalContextProvider.Provider value="hh">
          <List setPeople={setPeople} people={people} editIndex={editIndex} setEditIndex={setEditIndex}/>
          <ClassComp/>
        </GlobalContextProvider.Provider>
      </ThemeContext.Provider>
    

    </div>
  );
}

export default App;
