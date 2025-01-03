import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
     <section className='w-full max-w-[850px] flex mx-auto items-center justify-center bg-white mt-28 min-h-[500px] rounded-lg shadow-lg ' >
     <div className='w-full mx-8 mt-10'>
        <h2 className=' font-poppins text-xl font-bold mb-8'>Easy Image Editor</h2>
        {/* Main Content */}
        <div className='flex lg:flex-row md:flex-col justify-between'>
          {/* Left Section */}

          <div className=' border-customGray border-[1px] rounded-md p-4 space-y-5 lg:w-1/2'>
          {/* Filter wali div */}

          <div className='w-[225px] h-[130px] font-poppins'>
            <p className='mb-4 text-sm'>Filters</p>
            <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
            <button className='h-10 text-md text-white rounded-sm border border-gray-400 w-28 bg-btn_background_color'>Brightness</button> 
            <button className='h-10 text-md text-gray-500 rounded-sm border border-gray-400 w-28 hover:text-white hover:bg-btn_background_color transition-all duration-200'>Saturation</button> 
            <button className='h-10 text-md text-gray-500 rounded-sm border border-gray-400 w-28 hover:text-white hover:bg-btn_background_color transition-all duration-200'>Inversion</button> 
            <button className='h-10 text-md text-gray-500 rounded-sm border border-gray-400 w-28 hover:text-white hover:bg-btn_background_color transition-all duration-200'>Grayscale</button> 
            </div>
          </div>

          {/* Brightness wali div */}
          <div>
              <div className='flex justify-between mb-2 font-poppins'>
              <p>Brightness</p>
              <p>100%</p>
              </div>
              <input type="range" min="0" max="200" value="100" className='w-full accent-btn_background_color'></input>
          </div>

          {/* Rotate and Flip wali div */}

          <div className='text-xl font-poppins '>
          <p className='mt-[-20px] mb-8'>Rotate & Flip</p>
              <div className='space-x-1 flex'>
                  <button className='rounded-sm border border-gray-400 w-14 h-9'><i class = "fa-solid fa-rotate-left"></i></button>
                  <button className='rounded-sm border border-gray-400 w-14 h-9'><i class = "fa-solid fa-rotate-right"></i></button>
                  <button className='rounded-sm border border-gray-400 w-14 h-9'><i class='bx bx-reflect-vertical'></i></button>
                  <button className='rounded-sm border border-gray-400 w-14 h-9'><i class='bx bx-reflect-horizontal'></i></button>
              </div>   
          </div>

          </div>
          {/* left section ends here... */}

          {/* Right Section */}
          <div className='w-full pl-4 '>
              <img
                src="./src/assets/image-placeholder.svg"
                className='w-full h-auto max-w-none object-cover'/>
          </div>
          {/* right section ends here... */}

        </div>  
        {/* Main content div ends here... */}

        {/* last div */}

        <div className='flex lg:flex-row flex-col justify-between mb-8 font-poppins'>
          <button className='text-gray_text border border-gray-400 rounded-sm p-2 mt-4 uppercase text-[14px] h-10'>Reset Filters</button>
          <div className='space-x-2'>
          <button className='text-white border border-gray-400 rounded-md p-2 mt-4 bg-choose_image uppercase text-[14px]'>Choose Image</button>
          <button className='text-white border border-gray-400 rounded-md p-2 mt-4 bg-btn_background_color uppercase text-[14px]'>Save Image</button>
          </div>
        </div>


      </div>
      {/* Start div ends here */}
     </section>
    </> 
  )
}

export default App
