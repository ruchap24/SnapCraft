import { useRef, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  // 01---choose file...
  const fileInput = useRef(null)
  const [selectedFile, setSelectedFile] = useState('./src/assets/image-placeholder.svg')
  const [brightness, setBrightness] = useState(100); // Slider value ke liye state
  const [saturation, setSaturation] = useState(100); 
  const [inversion, setInversion] = useState(0); 
  const [grayscale, setGrayscale] = useState(0);  
  const [isDisabled, setisDisabled] = useState(true); 
  const [activeFilter, setActiveFilter] = useState('brightness');  //active filter state...
  const [rotate, setRotate] = useState(0)
  const [flipVertical, setFlipVertical] = useState(false);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [savedImages, setSavedImages] = useState([])


    // 02--choose and reset image...
  function handleButtonClick(action) {
    if (action === 'reset') {
      setSelectedFile('./src/assets/image-placeholder.svg'); // Reset to default image
      fileInput.current.value = ''; 
    // Reset all filters and transformations
    setBrightness(100);
    setSaturation(100);
    setInversion(0);
    setGrayscale(0);
    setRotate(0);
    setFlipVertical(false);
    setFlipHorizontal(false);
    } else if (action === 'choose') {
      fileInput.current.click(); // Trigger file input click
    }
    setisDisabled(true); // Disable the reset button
  }

    // 03---load image
    const loadImage = (e) => {
      e.preventDefault()  // Prevent form submission...
      const file = e.target.files[0]    // Get the selected file...
      if(!file) return;
  
      const newImgurl = URL.createObjectURL(file)
      setSelectedFile(newImgurl)
      setisDisabled(false); // Enable the reset button
    }

    //04-- Handle Filter Click..

  function handleFilterClick(filter) {
    setActiveFilter(filter);
  }

  // 05-- Set activerFiler valeues according to selected filter...
  function handleSliderChange(e) {
    const value = e.target.value;
    if(activeFilter === 'brightness') {
      setBrightness(value);
    }
    if(activeFilter === 'saturation') {
      setSaturation(value);
    }
    if(activeFilter === 'inversion') {
      setInversion(value);
    }
    if(activeFilter === 'grayscale') {
      setGrayscale(value);
    }
  }

  // 06-- Applying CSS Filter to Image...

  const filterStyles = {
    filter: `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`,
  };

  // 07-- Applying CSS Transform to Image...

  const filterTransform = {
    transform: 
    `rotate(${rotate}deg) 
     scaleX(${flipHorizontal ? -1 : 1}) 
     scaleY(${flipVertical ? -1 : 1})`,
  };

  function handleRotateLeft(){
    setRotate(prevRotate => prevRotate - 90)
  }

  function handleRotateRight() {
    setRotate(prevRotate => prevRotate + 90); // Rotate right by 90 degrees
  }

  function handleFlipVertical() {
    setFlipVertical(prev => !prev); // Toggle vertical flip
  }

  function handleFlipHorizontal() {
    setFlipHorizontal(prev => !prev); // Toggle horizontal flip
  }

  // 08-- Save Image, Store Image and Downloaded Image...

  function handleSaveImage() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = selectedFile;
  
    img.onload = () => {
      // Set canvas size to match the image size
      canvas.width = img.width;
      canvas.height = img.height;
  
      // Apply the filters and transformations on the canvas context
      ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  
      // Apply rotation and flip (convert angle to radians)
      ctx.save(); // Save current context state
      ctx.translate(canvas.width / 2, canvas.height / 2); // Move to center of canvas
  
      // Apply rotation (in radians)
      ctx.rotate((rotate * Math.PI) / 180); 
  
      // Apply flips
      ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
  
      ctx.drawImage(img, -img.width / 2, -img.height / 2); // Draw image at center of canvas
      ctx.restore(); // Restore the context state to avoid affecting other transformations
  
      // Save the modified image to the savedImages state
      const dataUrl = canvas.toDataURL('image/png');
      setSavedImages((prevImages) => [...prevImages, dataUrl]);
  
      // Trigger the download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'saved-image.png';
      link.click();
  
      alert('Image saved and downloaded!');
    };
  }


  return (

    <>
<section className="w-full max-w-[850px] flex mx-auto items-center justify-center bg-white mt-28 min-h-[200px] rounded-lg shadow-lg">
<div className='w-full mx-8 mt-10'>
        <h2 className=' font-poppins text-xl font-bold mb-8'>Easy Image Editor</h2>
        {/* Main Content */}
        <div className="flex lg:flex-row md:flex-col justify-between">
          {/* Left Section */}

          <div className={` border-customGray border-[1px] rounded-md p-4 space-y-5 lg:w-1/2 ${isDisabled ? 'pointer-events-none opacity-60': ""}`}>
          {/* Filter wali div */}

          <div className='w-[225px] h-[130px] font-poppins'>
            <p className='mb-4 text-sm'>Filters</p>
            <div className='grid grid-cols-2 gap-x-4 gap-y-2 '>
            {/* <button className='h-10 text-md text-white rounded-sm border border-gray-400 w-28 bg-btn_background_color'>Brightness</button> 
            <button className='h-10 text-md text-gray-500 rounded-sm border border-gray-400 w-28 hover:text-white hover:bg-btn_background_color transition-all duration-200'>Saturation</button> 
            <button className='h-10 text-md text-gray-500 rounded-sm border border-gray-400 w-28 hover:text-white hover:bg-btn_background_color transition-all duration-200'>Inversion</button> 
            <button className='h-10 text-md text-gray-500 rounded-sm border border-gray-400 w-28 hover:text-white hover:bg-btn_background_color transition-all duration-200'>Grayscale</button>  */}
            {['brightness', 'saturation', 'inversion', 'grayscale'].map((filter)=>(
              <button 
              key={filter}
              className={`h-10 text-md text-gray-500 rounded-sm border border-gray-400 w-28 ${activeFilter === filter ? 'text-white bg-btn_background_color' : 'text-gray-500 hover:text-white hover:bg-btn_background_color transition-all duration-200' }`}
              onClick={()=> handleFilterClick(filter)}>
               {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
            </div>
          </div>

          {/* Brightness wali div */}
          <div>
              <div className='flex justify-between mb-2 font-poppins'>
              <p>{activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}</p>
              <p>
                {activeFilter === 'brightness' ? `${brightness}%` :
                activeFilter ==='saturation'? `${saturation}%` :
                activeFilter === 'inversion'? `${inversion}%` :
                `${grayscale}%`}
              </p>
              </div>
              <input 
              onChange={handleSliderChange} 
              value={activeFilter === 'brightness' ? brightness 
               : activeFilter === 'saturation' ? saturation
               : activeFilter === 'inversion'? inversion
               : activeFilter === 'grayscale' ? grayscale : ""} 
                type="range" 
                min="0" 
                max={activeFilter === 'brightness' || activeFilter === 'saturation' ? '200' : '100'}
                className='w-full accent-btn_background_color'>
              </input>
          </div>

          {/* Rotate and Flip wali div */}

          <div className='text-xl font-poppins '>
          <p className='mt-[-20px] mb-8'>Rotate & Flip</p>
              <div className='space-x-1 flex'>
                  <button onClick={handleRotateLeft} className='rounded-sm border border-gray-400 w-14 h-9'><i className = "fa-solid fa-rotate-left"></i></button>
                  <button onClick={handleRotateRight} className='rounded-sm border border-gray-400 w-14 h-9'><i className = "fa-solid fa-rotate-right"></i></button>
                  <button onClick={handleFlipVertical} className='rounded-sm border border-gray-400 w-14 h-9'><i className='bx bx-reflect-vertical'></i></button>
                  <button onClick={handleFlipHorizontal} className='rounded-sm border border-gray-400 w-14 h-9'><i className='bx bx-reflect-horizontal'></i></button>
              </div>   
          </div>

          </div>
          {/* left section ends here... */}

          {/* Right Section */}
         
          <div className='w-full pl-4 '>
           <img
             src={selectedFile}
             style={{
              ...filterStyles,
              ...filterTransform,
             }}
            //  onLoad={resetFilters}
            className={`w-full h-[400px] max-w-none rounded-lg ${
              selectedFile === './src/assets/image-placeholder.svg' ? 'object-cover' : 'object-contain'
            }`}             
            />
          </div>
         
          {/* right section ends here... */}

        </div>  
        {/* Main content div ends here... */}

        {/* last div */}

        <div className='flex lg:flex-row flex-col justify-between mb-8 font-poppins'>
          <button onClick={() => handleButtonClick('reset')}
        className={`text-gray_text border border-gray-400 rounded-sm p-2 mt-4 uppercase text-[14px] h-10} ${isDisabled ? 'pointer-events-none opacity-60': ""}`}>Reset Filters</button>
          <div className='space-x-2'>
          <input type="file" accept="image/*" ref={fileInput} hidden onChange={loadImage}/>
          <button onClick={() => handleButtonClick('choose')} className='text-white border border-gray-400 rounded-md p-2 mt-4 bg-choose_image uppercase text-[14px]'>Choose Image</button>
          <button onClick={handleSaveImage} className={`text-white border border-gray-400 rounded-md p-2 mt-4 bg-btn_background_color uppercase text-[14px] ${isDisabled ? 'pointer-events-none opacity-60': ""}`}>Save Image</button>
        </div>  
        </div>
      
      </div>
      {/* Start div ends here */}
     </section>
     <div className="mt-8 flex justify-end">
            <div className="grid grid-cols-10 gap-4">
              {savedImages.map((img, index) => (
                <img 
                key={index} 
                src={img} 
                alt={`Saved Image ${index}`} 
                className="w-full h-32 object-cover rounded-md" />
              ))}
            </div>
        </div>
     </> 
  )
}

export default App