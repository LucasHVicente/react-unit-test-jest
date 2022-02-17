import { useState } from "react";

type ListProps = {
    initialItems: string[]
}

export default function List ({initialItems}: ListProps){
    const [list, setList] = useState(initialItems);
    const [newName, setNewName] = useState('')

    function addToList(){
        setTimeout(()=>{
        setList(state=>[...state, newName])
        }, 500)
    }

    function removeItem(name: string){
        setTimeout(()=>{
        setList(state=>state.filter(listItem=>listItem !== name))
        }, 500)
    }

    return (
        <>
            <input 
                data-testid="input-element"
                placeholder="new item" 
                value={newName} 
                onChange={e=> setNewName(e.target.value)}
            />
            <button data-testid="add-button" onClick={addToList}>add</button>
            <ul>
            {
                list.map(name=>(
                <li key={name}>
                    {name}
                    <button data-testid="remove-button" onClick={()=>removeItem(name)}>remove</button>
                </li>)
                )
            }
            </ul>
        </>
    )
}