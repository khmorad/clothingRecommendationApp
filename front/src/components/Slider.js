// import React, { useState } from 'react';
// import '../stylings/Slider.css'; // Import the CSS file for styling

// const Slider = () => {
//   const [currentSlide, setCurrentSlide] = useState(1);

//   const handleSlideChange = (slide) => {
//     setCurrentSlide(slide);
//   };

//   return (
//     <div className="slider">
//       <input
//         type="radio"
//         id="trigger1"
//         name="slider"
//         checked={currentSlide === 1}
//         onChange={() => handleSlideChange(1)}
//       />
//       <label htmlFor="trigger1">
//         <span className="sr-only">
//           Slide 1 of 5. A photo of a mountain pass with a winding path along the river and a view of distant mountains hiding in the mist.
//         </span>
//       </label>
//       <div className={`slide bg1 ${currentSlide === 1 ? 'active' : ''}`}></div>

//       <input
//         type="radio"
//         id="trigger2"
//         name="slider"
//         checked={currentSlide === 2}
//         onChange={() => handleSlideChange(2)}
//       />
//       <label htmlFor="trigger2">
//         <span className="sr-only">
//           Slide 2 of 5. A photo of a bird eating sunflower seeds from an open hand.
//         </span>
//       </label>
//       <div className={`slide bg2 ${currentSlide === 2 ? 'active' : ''}`}></div>

//       <input
//         type="radio"
//         id="trigger3"
//         name="slider"
//         checked={currentSlide === 3}
//         onChange={() => handleSlideChange(3)}
//       />
//       <label htmlFor="trigger3">
//         <span className="sr-only">
//           Slide 3 of 5. A photo of a concrete bridge over the river with high voltage power lines on both banks.
//         </span>
//       </label>
//       <div className={`slide bg3 ${currentSlide === 3 ? 'active' : ''}`}></div>

//       <input
//         type="radio"
//         id="trigger4"
//         name="slider"
//         checked={currentSlide === 4}
//         onChange={() => handleSlideChange(4)}
//       />
//       <label htmlFor="trigger4">
//         <span className="sr-only">
//           Slide 4 of 5. A photo of a lake surrounded by the forest with mountains in the background.
//         </span>
//       </label>
//       <div className={`slide bg4 ${currentSlide === 4 ? 'active' : ''}`}></div>

//       <input
//         type="radio"
//         id="trigger5"
//         name="slider"
//         checked={currentSlide === 5}
//         onChange={() => handleSlideChange(5)}
//       />
//       <label htmlFor="trigger5">
//         <span className="sr-only">
//           Slide 5 of 5. A photo of a forest.
//         </span>
//       </label>
//       <div className={`slide bg5 ${currentSlide === 5 ? 'active' : ''}`}></div>
//     </div>
//   );
// };

// export default Slider;
