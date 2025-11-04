"use client";
import greetingCardImg from "../../../../assets/images/standing-dashboard-image.svg";
import "./cardgreetings.css";

export const CardGreeting = () => {
  return (
    <div className="cardGreeting" aria-labelledby="greeting-card">
      <div className="cardGreeting-Container">
        <div className="cardGreeting-Content">
          <div className="cardGreeting-Text__Content">
            <div id="greeting-heading" className="cardGreeting-Heading">
              Welcome, Laurel Higher Secondary School Team!
            </div>
            <div className="cardGreeting-Subheading">
              Manage your teams operations with ease. Stay updated on events,
              players, members, and more - all in one place. Let’s keep shaping
              a brighter future together!
            </div>
          </div>

          <div className="cardGreeting-image" aria-hidden>
            <img
              src={greetingCardImg}
              alt="Illustration — dashboard overview"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGreeting;
