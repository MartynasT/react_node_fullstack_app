import React from 'react';
import HeroSvg from '../hero.svg';
import Button from '../components/Button'
import blob1 from '../assets/blob1.svg'
import blob2 from '../assets/blob2.svg'
import blob3 from '../assets/blob3.svg'
import blob4 from '../assets/blob4.svg'

export default function HomePage(){

  const Btntext = 'Upload Image';
  return (
    <section className="max-w-screen-xl grid-cols-12 grid mx-auto pt-6 gap-x-11  px-12	">
      <div className="blob blob1 hidden lg:block">
        <img src={blob1} alt=""/>
      </div>
      <div className="blob blob2 hidden lg:block">
        <img src={blob2} alt=""/>
      </div>
      <div className="blob blob3 hidden lg:block">
        <img src={blob3} alt=""/>
      </div>
      <div className="blob blob4 hidden lg:block">
        <img src={blob4} alt=""/>
      </div>
      <div className="lg:col-span-6 col-span-12 flex justify-center items-start text-left flex-col">
        <h1 className="lg:text-7xl text-4xl  font-bold mb-5 text-gray-700 block mb-16">Add comments on your <span className="custom-underline">images</span></h1>
        <Button size="large">Upload image</Button>

      </div>
      <div className="lg:col-span-6 col-span-12">
        <img className="mx-auto h-70vh" src={HeroSvg} alt=""/>
      </div>

    </section>
  )
}