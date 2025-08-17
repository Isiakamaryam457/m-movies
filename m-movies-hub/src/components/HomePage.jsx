import React from 'react'
import Search from './Search'

export default function() {
    return (
        <>
        <div className='flex h-screen'>
            <div className='w-64 border-2'>
            <aside>Sidebar</aside>
            <nav>
                <ul>
                    <li className='mt-4 mb-10'>
                        <a href="{`/contacts/1`}">Watch List</a> <br />
                        <a href="{`/contacts/1`}">Favourites</a>
                    </li>
                </ul>
            </nav>
            </div>
            <main className='flex-1 flex flex-col'>
                <header className='h-16 border-2'></header>
                <section className='flex-1 overflow-y-auto'><Search /></section>
            </main>

            
        </div>
        </>
    )
}