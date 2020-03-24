import React, { useState } from 'react';
// import Windows from './Windows';
import Home from './Home';
// import Bluescreen from './Bluescreen';


const App = React.memo(
    function App() {
        let [currentView, setCurrentView] = useState(0);
        const views = [
            <Home start={() => {
                setCurrentView(1);
                document.body.classList.add('containsWindows');
                let i = setInterval(() => { setCurrentView(2) }, 25000);
                let j = setInterval(() => {
                    setCurrentView(0);
                    clearInterval(i);
                    document.body.classList.remove('containsWindows');
                }, 28000);
                let k = setInterval(() => { clearInterval(j); clearInterval(k) }, 30000);
            }} />,
        //     <Windows update={() => {
        //         const killId = setTimeout(function () {
        //             for (let i: any = killId; i > 0; i--) clearInterval(i)
        //         }, 10);
        //     }} />,
        //     <Bluescreen />,
        ]

        return views[currentView];
    }
)

export default App;
