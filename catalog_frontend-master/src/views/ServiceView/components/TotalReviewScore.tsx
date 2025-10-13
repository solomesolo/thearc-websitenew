import "../styles/totalReviewScore.scss"
import arrow from "../../../assets/imgs/template/service-review-arrow.svg"
import trustLogo from "../../../assets/imgs/template/trustPilot.svg"


export const TotalReviewScore = ({ score, link }: { score: number, link: string }) => {
  const trust = "https://www.trustpilot.com/review/" + link.replace("https://", "").replace("http://", "");
  return (
    <div className="review-score">
      <div className="upper-block">
        <h3>Service Reviews</h3>
        <div className="header-arrow">
          <a href={trust}>
            <img src={arrow} alt="" className="" />
          </a>
        </div>
      </div>
      <div className="middle-block">
        <div className="trust-pilot">
          <a href={trust}>
            <img src={trustLogo} alt="" className="" />
          </a>
          <div className="trust-pilot-text">Trustpilot</div>
        </div>
        <div className="rating">
          <div className="rating-block">
            <a href={trust}>
              <div className="product-rating-block">
                <div className="product-rating" style={{ width: (score * 20) + "%" }}></div>
              </div>
            </a>
          </div>
          <h6>{score} out of 5</h6>
        </div>
      </div>
      <div className="bottom-block">
        We bring consumers and businesses together to make things better
        </div>
    </div>
  )

}
