import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/SmallArticle.css';
import defaultBanner from '../Images/default-banner.jpg';

const SmallArticle = ({ a }) => {
  return (
    <>
      <div key={a.slug} className='small-article-global-container'>
        <Link to={`/article/${a.slug}`} key={a.slug} className='link-article'>
          <div className='small-article-container'>
            <>
              <div className='small-article-banner-image' style={a.image ? { backgroundImage: `url('${a.image}')` } : { backgroundImage: `url('${defaultBanner}')` }} />
              <div className='small-article-content-container'>
                <h1 className='small-article-title'>{a.title}</h1>
                <p className='small-article-intro'>{a.intro}</p>
                <button className='read-more read-more-article'>
                  <p>Lire la suite</p>
                </button>
              </div>
            </>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SmallArticle;
