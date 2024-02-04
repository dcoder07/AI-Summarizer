import React from "react";
import logo from "../assets/logo.svg";

const Hero = () => {
  return (
    <header className='w-full'>
      <nav className='flex justify-between items-center'>
        <div>
          <img src={logo} alt='the-logo-image' height={32} width={128} />
        </div>
        <button
          className='black_btn  mt-2'
          onClick={() =>
            window.open("https://hashnode.com/post/cllvii7zo000309jq8j7g6wls")
          }
        >
          Article
        </button>
      </nav>
      <div className='flex flex-col text-center my-16'>
        <h1 className='head_text'>Summarize Articles with</h1>
        <span className=' head_text orange_gradient'>OpenAI GPT-4</span>
        <div className='flex justify-center'>
          <h2 className='desc'>
            Simplify your reading with Summize, an open-source article
            summarizer that transforms lengthy articles into clear and concise
            summaries
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Hero;
