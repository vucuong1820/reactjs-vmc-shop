import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import HobbyList from '../components/Home/HobbyList';
import { addNewHobby, setActiveHobby } from '../actions/hobby';
HomePage.propTypes = {
    
};

function HomePage(props) {
    const hobbyList = useSelector(state => state.hobby.list);
    const activeId = useSelector(state => state.hobby.activeId)
    const dispatch  = useDispatch()
    const handleAddHobbyClick = () => {
        // Random a hobby object: id + title
        const newId = Date.now();
        const newHobby = {
            id: newId,
            title: `Hobby ${newId}`,
        }
        
        // dispatch action to add new hobby to redux store
        const action = addNewHobby(newHobby)
        dispatch(action)
    }
    const handleActiveClick = (hobby) => {
        const action = setActiveHobby(hobby)
        dispatch(action)
    }
    
    return (
        <div>
            <h1>Home page - React Hooks</h1>
            <button onClick={handleAddHobbyClick}>Random hobby</button>
            <HobbyList 
            hobbyList={hobbyList}
            activeId = {activeId}
            handleActiveClick={handleActiveClick}
            />
        </div>
    );
}

export default HomePage;