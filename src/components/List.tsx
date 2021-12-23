import React,{useState} from "react"
import axios from "axios";
import {IState as Props} from "../App"

import {ThemeContext} from "../App"

interface IProps{
    people: Props["people"],
    editIndex: Props["editIndex"],
    setPeople:React.Dispatch<React.SetStateAction<Props["people"]>>,
    setEditIndex:React.Dispatch<React.SetStateAction<Props["editIndex"]>>,
  }

const List:React.FC<IProps> =({people,setPeople,editIndex,setEditIndex}) =>{
    async function deletePost(e:any,person:any,index:any) {
          const res = await axios.post("http://localhost:3333/deletePeople",{id:0})
           if(res.status == 200){
                // const noOfRows = [...people.slice(0, index)] ;
                const noOfRows = [...people.slice(0, index), ...people.slice(index+1)] ;
                setPeople( noOfRows );
           }
      }
      function editOpen(e:any,person:any,index:any){
        people[index].isEdit=true
        editIndex=index
        setEditIndex(editIndex)
        setPeople([...people]);
    
        input.name = person.name
        input.email = person.email
        input.title = person.title
        input.image = person.image
      }

      const [input,setInput]=useState({
        name:'',
        email:'',
        title:'',
        image:'',
    })

    const handleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void=>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    async function updateInline(index:number, id:number){

        const res = await axios.post("http://localhost:3333/editPeople", {id:id, input})
        if(res.status == 200){
            let eData = people[index]
            eData.name = input.name
            eData.title = input.title
            eData.email = input.email
            eData.image = input.image
            let arr = people 
            const updatedData = [...arr.slice(0, index), Object.assign({}, arr[index], eData), ...arr.slice(index + 1)]
            setPeople(updatedData)
            setEditIndex(-1)
        }
    }

    const renderList=(): JSX.Element[]=>{
        return people.map((person,index)=>{
            return (
                <div className="col-md-3">
                    <div className="_react_card_content" key={person.id}>
                        <div className="_react_card_content_inner">
                            <div className="_react_card_img_wrap">
                                <button onClick={ ((e) => editOpen(e,person, index))}>Edit</button>
                                <button onClick={ ((e) => deletePost(e,person, index))}>Delete</button>
                            </div>
                            {person.isEdit && index==editIndex?
                                <div className="_react_card_txt" >
                                    <input value={input.name}  onKeyUp={((e) => updateInline( index, person.id))}  onChange={handleChange} name="name" type="text" placeholder="Name" className="from_input" />
                                    <input value={input.email}  onKeyUp={((e) => updateInline( index, person.id))}  onChange={handleChange} name="email" type="text" placeholder="email" className="from_input" />
                                    <input value={input.title}  onKeyUp={((e) => updateInline( index, person.id))}  onChange={handleChange} name="title" type="text" placeholder="title" className="from_input" />
                                    <input value={input.image}  onKeyUp={((e) => updateInline( index, person.id))}  onChange={handleChange} name="image" type="text" placeholder="image" className="from_input" />
                                </div>
                                :
                                <div className="_react_card_txt" >
                                    <h3 className="_react_card_name">{person.name}</h3>
                                    <p className="_react_card_email">{person.email}</p>
                                    <h4 className="_react_card_title">{person.title}</h4>
                                </div>
                             }
                        </div>
                    </div>
                </div>
            )
        })
    }

    
    return(
        <ThemeContext.Consumer>{(ThemeContext)=>{
            return (
                <div className="_react_card_wrapper" >
                    <div className="_react_card_wrap">
                        <div className="container">
                            <div className="_react_card_content_wrap">
                                <div className="row">
                                    {renderList()}
                                    {ThemeContext}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }}
        </ThemeContext.Consumer>
    )
    
    
}
export default List