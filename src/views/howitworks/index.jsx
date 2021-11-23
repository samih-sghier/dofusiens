import { MessageDisplay } from 'components/common';
import { ProductShowcaseGrid } from 'components/product';
import { useDocumentTitle, useRecommendedProducts, useScrollTop } from 'hooks';
import bannerImg from 'images/banner-girl-1.png';
import React from 'react';

const RecommendedProducts = () => {
  useDocumentTitle('How It Works | Dragoturkey');
  useScrollTop();

  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading,
    error
  } = useRecommendedProducts();

  return (
    <main className="content">
      <div className="featured">
        <h1>Frequently Asked Questions</h1>
        {/* <div className="banner">
          <div className="banner-desc">
            <h1>How it works</h1>

          </div>
          <div className="banner-img">
            <img src={bannerImg} alt="" />
          </div>
        </div> */}
        <div className="display">
          <div className="product-display-grid">
            <h2>What is Dragoturkey: </h2>
          </div>
          <p>Dragoturkey is a fan based e-trade marketplace where players can list their items for sale in Morocco!</p>
          <br></br>
          <p>The platform allows transparency during in-person transactions, and a reputation system to avoid scammers!</p>

        </div>
        <br></br>
        <br></br>
        <div className="divider"></div>
        <br></br>
        <br></br>

        <div className="display">
          <div className="product-display-grid">
            <h2>Will Dragoturkey support other games: </h2>
          </div>
          <p>We currently only support trades for Dofus, however we are planing on releasing other games such as FIFA, Dofus Touch, Wakfu, Counter Strike ...</p>
          <br></br>
          <p>More details to come!</p>
        </div>

        <br></br>
        <br></br>
        <div className="divider"></div>
        <br></br>
        <br></br>

        <div className="display">
          <div className="product-display-grid">
            <h2>Can Dragoturkey be a third party to my transaction: </h2>
          </div>
          <p>Yes but not yet, the Dragoturkey team is working hard on completing a feature that will allow users to opt for a guarranteed money-back transaction!</p>
          <br></br>
          <p>This will allow you to complete a transaction with another player without having to meet face to face, in all confidence and from everywhere. The payment will go through via banking wires or, with one of our banking partners
            <a href="https://www.cihbank.ma/"> CIH Bank</a>, <a href="https://www.paypal.com/us/home">PayPal</a>, <a href="https://www.westernunion.com/fr/en/home.html">Western Union</a> and more!</p>
          <br></br>
          <p>More details to come!</p>
        </div>

        <br></br>
        <br></br>

        <div className="divider"></div>
        <br></br>
        <br></br>

        <div className="display">
          <div className="product-display-grid">
            <h2>Does Dragoturkey guarrantee my face-to-face transaction: </h2>
          </div>
          <p>No, but we are trying very hard to ban any scammers that might post fraudulent listings on our marketplace.</p>
          <br></br>
          <p>Unfortunately we are not able to monitor every listing made on our platoform!</p>
          <br></br>
        </div>


        <br></br>
        <br></br>

        <div className="divider"></div>
        <br></br>
        <br></br>

        <div className="display">
          <div className="product-display-grid">
            <h2>Does Dragoturkey guarrantee my online transaction: </h2>
          </div>
          <p>Yes.</p>
          <br></br>
        </div>

        {/* <div className="display">
          <div className="product-display-grid">
            {(error && !isLoading) ? (
              <MessageDisplay
                message={error}
                action={fetchRecommendedProducts}
                buttonLabel="Try Again"
              />
            ) : (
                <ProductShowcaseGrid
                  products={recommendedProducts}
                  skeletonCount={6}
                />
              )}
          </div>
        </div> */}
      </div>
    </main>
  );
};

export default RecommendedProducts;
