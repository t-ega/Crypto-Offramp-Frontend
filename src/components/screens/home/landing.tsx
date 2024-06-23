import "../../../landing.css";
import Hero from "./hero";
import Profile from "../../../assets/vecteezy_3d-rendering-blue-and-yellow-color-user-icon-isolated_9592988.png";

export interface LandingProps {
  openModal: () => void;
}

const Landing = (props: LandingProps) => {
  const { openModal } = props;
  return (
    <div>
      <Hero openModal={openModal} />
      <section className="section">
        <h2
          className=""
          style={{
            display: "flex",
            justifyContent: "center",
            color: "white",
          }}
        >
          How to get started on TheCryptoRamp
        </h2>
        <div className="steps">
          <div className="step-item">
            <img src={Profile} style={{ width: "40px", objectFit: "cover" }} />
            <h3>Click on the get started button and watch the magic</h3>
            <p>
              No, seriously it has never been easier to convert your coins to
              sweet cash 🤑
            </p>
          </div>
          <img
            src="https://img.icons8.com/?size=100&id=wcK894NIt5Wv&format=png&color=416D9A"
            className="arrow"
          />
          <div className="step-item">
            <img
              src={
                "https://img.icons8.com/?size=100&id=VbL8v3mm1qyp&format=png&color=000000"
              }
              style={{ width: "40px", objectFit: "cover" }}
            />
            <h3>Fill in your bank details</h3>
            <p>We currently support about 100+ banks in Nigeria</p>
          </div>
          <img
            src="https://img.icons8.com/?size=100&id=wcK894NIt5Wv&format=png&color=416D9A"
            className="arrow"
          />
          <div className="step-item">
            <img
              src={
                "https://img.icons8.com/?size=100&id=hg7n8KfhDWHi&format=png&color=000000"
              }
              style={{ width: "40px", objectFit: "cover" }}
            />
            <h3>Send the specified amount to the generated wallet address</h3>
            <p>
              Once a deposit is confirmed you would receive an instant payout to
              the bank account you kept in the previous step.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
