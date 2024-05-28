import { useEffect } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function App() {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
    })

    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-slate-200 text-4xl py-20 font-bold'>Darts Scoreboard</h1>
            <grid className='w-full px-10 grid grid-cols-2 gap-x-10 gap-y-5'>
                <Link to='/classic-match-settings'>
                    <div className='flex flex-col justify-center items-center bg-orange-500 p-4 h-[135px] rounded-lg'>
                        <h2 className='text-slate-200 text-xl text-center font-bold'>Classic Match</h2>
                    </div>
                </Link>
                <div className='bg-slate-400 p-4 rounded-lg'>
                <h2 className='text-slate-200'>Round the Clock</h2>
                </div>
                <div className='bg-slate-400 p-4 rounded-lg'>
                <h2 className='text-slate-200'>Card 3</h2>
                </div>
            </grid>
        </div>
    )
}

export default App
