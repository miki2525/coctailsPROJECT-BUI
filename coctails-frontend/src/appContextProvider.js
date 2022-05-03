import React, {createContext, useState, useContext, useEffect} from 'react';
import coctailsData from './data/coctails.json';
import commentsData from './data/comments.json';

const AppContext = createContext();
export const  useAppCtx = () => useContext(AppContext);

export default function AppContextProvider({children}) {
    const [coctails, setCoctails] = useState(coctailsData);
    const [comments, setComments] = useState(commentsData);
    const [coctailsSearch, setCoctailsSearch] = useState(coctailsData);

    useEffect(() => {
        setCoctails(coctailsData);
        setComments(commentsData)
    }, []);

    const resetCoctails = () =>{
        setCoctails(coctailsData);
    }

    const saveCoctails = (coctailsToSave) => {
        setCoctails(coctailsToSave);
        setCoctailsSearch(coctailsToSave);
        ////TODO call API + ovveride coctails,json
    }

    const saveComments = (commentsToSave) => {
        setComments(commentsToSave)
        ////TODO call API + ovveride comments.json
    }

    const rateIt = (id, rate) => {
        const updatedRateCoctails = coctails.map((coctail) => {
            if (coctail.id === id) {
                coctail.ratings.push(rate);
            }
            return coctail;
        });
        saveCoctails(updatedRateCoctails);
    }


    return (
        <AppContext.Provider
            value={{coctails, coctailsSearch, setCoctails, resetCoctails, comments, setComments, saveCoctails, saveComments, rateIt}}
        >
            {children}
        </AppContext.Provider>
    );
}
