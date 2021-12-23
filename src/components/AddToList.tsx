import React,{useState} from "react"
import {IState as Props} from "../App"

interface IProps{
    people: Props["people"],
    setPeople:React.Dispatch<React.SetStateAction<Props["people"]>>
  }

const AddToList: React.FC<IProps>= ({people,setPeople})=>{
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

    const handleClick=():void=>{
        if(
            !input.name ||
            !input.email ||
            !input.title
        ){
            return
        }

        setPeople([
            ...people,
            {
                id:0,
                name:input.name,
                email:input.email,
                title:input.title,
                image:input.image,
            }
        ])
    }

    return(
        <div>
            <input value={input.name} onChange={handleChange} name="name" type="text" placeholder="Name" className="from_input" />
            {/* <input value={input.age} onChange={handleChange} name="age" type="text" placeholder="Age" className="from_input"/>
            <input value={input.img}  onChange={handleChange} name="img" type="text" placeholder="Image Url" className="from_input"/>
            <textarea onChange={handleChange}  value={input.note} name="note" placeholder="Notes" className="from_input"/> */}
            <button onClick={handleClick}>Add to list</button>
        </div>
    )
}

export default AddToList