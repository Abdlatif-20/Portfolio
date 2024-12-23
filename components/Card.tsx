import React from 'react'

interface CardProps {
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ title, description })  => (
    <div className='border w-[400px] h-[238px] rounded-[30px] m-2 flex flex-col justify-center items-center shadow-borderShadow'>
      <h1 className='w-full text-center text-shadow-textShadow-white text-[30px]'>{title}</h1>
      <p className='text-[17px] text-center flex items-center h-[60%]'>{description}</p>
      <img
      src="images/github_Icon.png" alt="github icon" />
    </div>
  );

export default Card;