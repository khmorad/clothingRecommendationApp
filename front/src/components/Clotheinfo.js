import React from 'react'
import CustomCarousel from './CustomCarousel';
import PictureList from './PictureList';
import '../stylings/Clotheinfo.css';
export default function Clotheinfo({ showLogin, loginStatus, user, isEmployee }) {
  
  const images = [
    {
      imgURL: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      imgAlt: "Image 1"
    },
    {
      imgURL: "https://cdn.shopify.com/s/files/1/0594/8519/2376/articles/India_Rose_Creative_Hayden_Hill-306.jpg?v=1642613147",
      imgAlt: "Image 2"
    },
    {
      imgURL: "https://images.pexels.com/photos/8483487/pexels-photo-8483487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      imgAlt: "Image 3"
    }
  ];

  return (
    <>      
    
    <div>    
    <CustomCarousel>
    {images.map((image, index) => (
      <img key={index} src={image.imgURL} alt={image.imgAlt} />
    ))}
  </CustomCarousel></div>

    <div>
<div className='clothings'>
<PictureList />
</div>
    </div>
    </>
  );
}
