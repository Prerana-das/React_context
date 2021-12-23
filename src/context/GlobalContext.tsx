import React ,{createContext , useState, useEffect, Component} from 'react';
export const GlobalContextProvider =  createContext({});
const GlobalContext = ()=>{
    const [people, setPeople] = useState([]);
    
    useEffect(()=>{
        const timer = setTimeout(()=>{
            
            setPeople('Prerana')
            // setPeople([{
            //     name:"ghfghfgh",
            //     email :"fdgdg",
            //     title : "Assistant dfgdfgifylab",
            //     image: "This would be an image url"
            // }] );

        }, 2000);
        return () =>{
            clearTimeout(timer);
        };
    }, []);
    const value= {
        people
    };
    return <GlobalContextProvider.Provider value={people}> </GlobalContextProvider.Provider>
}
export default GlobalContext