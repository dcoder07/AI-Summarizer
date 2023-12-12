 import React, { useState, useEffect } from "react";
import link from "../assets/link.svg";
import copy from "../assets/copy.svg";
import loader from "../assets/loader.svg";
import tick from "../assets/tick.svg";
import { useLazyGetSummaryQuery } from "../services/article";

const Summary = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const [copied, setCopied] = useState("");

  useEffect(() => {
    const articlesFormLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFormLocalStorage) {
      setAllArticles(articlesFormLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedArticles = [newArticle, ...allArticles];
      setAllArticles(updatedArticles);
      setArticle(newArticle);

      localStorage.setItem("articles", JSON.stringify(updatedArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <section className='w-full max-w-xl'>
      <div className='flex flex-col justify-center items-center'>
        <form
          className='w-full flex justify-center items-center relative'
          onSubmit={handleSubmit}
        >
          <img
            src={link}
            alt='link-icon'
            className='absolute left-0 ml-2 w-5 cursor-pointer'
          />
          <input
            required
            type='url'
            value={article.url}
            placeholder='Paste the Link'
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            className='peer url_input'
          />
          <button
            type='submit'
            className='submit_btn 
          peer-focus:text-gray-700
          peer-focus:border-gray-700'
          >
            ⎆
          </button>
        </form>
      </div>
      <div className=' mt-4 flex flex-col gap-1 max-h-60 overflow-y-auto'>
        {allArticles.map((item, index) => (
          <div
            key={"link-${index}"}
            onClick={() => setArticle(item)}
            className='link_card'
          >
            <div className='copy_btn' onClick={() => handleCopy(item.url)}>
              <img src={copied === item.url ? tick : copy} alt='copy_image' />
            </div>
            <p className='font-satoshi font-medium flex-1 text-blue-700 text-sm truncate'>
              {item.url}
            </p>
          </div>
        ))}
      </div>

      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img
            src={loader}
            alt='loader_image'
            className='w-20 h-20 objject-contain'
          />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Checking the vulnerabilities!
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article<span className='blue_gradient'> Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Summary;
