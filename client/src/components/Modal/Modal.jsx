import confetti from "canvas-confetti";
import { useCallback, useEffect, useMemo, useState } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import Snow from "react-canvas-confetti/dist/presets/snow";
import { getCardImage } from "../../pages/Game/getCardImage";
import './modal.css';

const Modal = ({dealerHand, playerHand, modalType, setShowModal}) => {
    const bananaShape = confetti.shapeFromText({ text: `🍌`});
    const rainShape = confetti.shapeFromText({ text: `💧`});
    const bustedShape = confetti.shapeFromText({ text: `>21`});

    const bananaConfetti = useCallback(() => {
        const decorateOptionsA = (defaultOptions) => {
            return {
                ...defaultOptions,
                scalar: 2,
                particleCount: 50,
                flat: true,
                shapes: [bananaShape],
            };
        };
        return <Fireworks autorun={{ speed: 5 }} decorateOptions={decorateOptionsA} />;
    }, [bananaShape]);

    const rainConfetti = useCallback(() => {
        const decorateOptionsB = (defaultOptions) => {
            return {
                ...defaultOptions,
                scalar: 2,
                particleCount: 50,
                flat: true,
                shapes: [rainShape],
            };
        };
        return <Snow autorun={{ speed: 15 }} decorateOptions={decorateOptionsB} />;
    }, [rainShape]);

    const bustedConfetti = useCallback(() => {
        const decorateOptionsB = (defaultOptions) => {
            return {
                ...defaultOptions,
                scalar: 2,
                particleCount: 50,
                flat: true,
                shapes: [bustedShape],
            };
        };
        return <Snow autorun={{ speed: 15 }} decorateOptions={decorateOptionsB} />;
    }, [bustedShape]);


    const [modalOpacity, setModalOpacity] = useState(0)

    useEffect(() => {
        setModalOpacity(1);
    }, [])

    const getModalContent = useMemo(() => {
        let text, extraContent, textClass;
        switch(modalType){
            case "win": 
                text = "You Win";
                extraContent = bananaConfetti();
                textClass =  "win"
                break;
            case "lose":
                text = "You Lose";
                extraContent = rainConfetti();
                textClass = "lose"
                break;
            case "bust":
                text = "You Busted";
                extraContent = bustedConfetti();
                textClass = "lose";
                break;
            default:
                text = "🚨 Something went wrong! 🚨";
                break;
        }
        return {
            text,
            extraContent,
            textClass,
        }
    }, [modalType, bananaConfetti, rainConfetti, bustedConfetti]);

    return (
        <div className="results-modal" style={{"opacity": modalOpacity}}>
            {getModalContent.extraContent}
            <div className="inner-modal" onClick={(e) => e.stopPropagation()}>
            {getModalContent.headerOverride || <h1 className={getModalContent.textClass}>{getModalContent.text}</h1> }
            <div className="hand-results">
                <div className="your-results">
                    <div className="images">
                        {playerHand.cards.map(c => {
                            return <img
                                src={getCardImage(c)}
                                alt="card graphic"
                                style={{ width: "50px", height: "80px" }}
                            />
                        })}
                    </div>
                    <p>Your score: {playerHand.value}</p>
                </div>
                {modalType !== "bust" && <div className="dealer-results">
                    <div className="images">
                        {dealerHand.cards.map(c => {
                            return <img
                                src={getCardImage(c)}
                                alt="card graphic"
                                style={{ width: "50px", height: "80px" }}
                            />
                        })}
                    </div>
                    <p>Dealer score: {dealerHand.value}</p>
                </div>}
            </div>
            
            <button onClick={() => {window.location.reload()}}>Play again?</button>
            </div>
        </div>
  )
}

export default Modal