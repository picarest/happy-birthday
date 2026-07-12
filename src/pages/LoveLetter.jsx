import React, { useEffect, useRef, useState } from 'react'

const LoveLetter = () => {
    const lettersData = [
        {
            id: 1,
            name: "ইব্রাহিম",
            msg: "এমনভাবে লিখব তোমার গল্প, যেন পড়ে কারও বুকের ভেতর নিঃশব্দে জমে ওঠে অজানা এক ব্যথা, আর চোখের কোণে নেমে আসে অপ্রকাশিত অশ্রু।",
        },
        {
            id: 2,
            name: "ইব্রাহিম",
            msg: "মনে হবে, একটি সুন্দর ভালোবাসা শেষ পর্যন্ত পৌঁছানোর আগেই থেমে গেছে, অসমাপ্ত থেকে গেছে একটি স্বপ্নের সবচেয়ে সুন্দর অধ্যায়।",
        },
        {
            id: 3,
            name: "ইব্রাহিম",
            msg: "মানুষ ভাববে, কে সেই ভাগ্যবান, যে এত গভীর ভালোবাসা পেয়েও তাকে নিজের করে রাখতে পারল না, আর এমন একজনকে হারিয়ে ফেলল।",
        },
        {
            id: 4,
            name: "ইব্রাহিম",
            msg: "যে মানুষটি নিঃস্বার্থভাবে ভালোবেসেছিল, যার প্রতিটি ভাবনা আর প্রতিটি স্বপ্নের কেন্দ্রেই ছিল শুধু একজন, অথচ শেষ পর্যন্ত সে-ই হারিয়ে গেল।",
        },
        {
            id: 5,
            name: "ইব্রাহিম",
            msg: "এই গল্পে শব্দের চেয়ে অনুভূতি বেশি—অপেক্ষা, না পাওয়ার কষ্ট, ভাঙা স্বপ্ন আর বুকের ভেতর চাপা পড়ে থাকা হাজারো না বলা কথা।",
        },
        {
            id: 6,
            name: "ইব্রাহিম",
            msg: "তুমি ছিলে কারও জীবনের সবচেয়ে সুন্দর স্বপ্ন। আজ সেই স্বপ্ন শুধু ভাঙা স্মৃতির টুকরো হয়ে নীরবে রয়ে গেছে হৃদয়ের গভীরে।",
        },
        {
            id: 7,
            name: "ইব্রাহিম",
            msg: "হয়তো কোনো একদিন কেউ এই গল্প পড়ে নিজের হারিয়ে যাওয়া মানুষটাকে মনে করবে, আর নিঃশব্দে চোখের জল মুছে দীর্ঘশ্বাস ফেলবে।",
        },
        {
            id: 8,
            name: "ইব্রাহিম",
            msg: "তখন সবাই বুঝবে, কিছু ভালোবাসা শেষ হয়ে যায় না; মানুষ হারিয়ে যায়, কিন্তু তার রেখে যাওয়া অনুভূতিগুলো সারাজীবন হৃদয়ে বেঁচে থাকে। ❤️",
        },
    ];

    const [openEnvelope, setOpenEnvelope] = useState(false);
    const [letters, setLetters] = useState([]);
    const [zIndexCounter, setZIndexCounter] = useState(10);
    const lettersContainerRef = useRef(null);

    useEffect(() => {
        setLetters(lettersData);
    }, []);

    // Drag logic
    const handleMouseDown = (e) => {
        const isTouch = e.type === "touchstart";
        const startEvent = isTouch ? e.touches[0] : e;

        if (startEvent.target.tagName === "BUTTON") return;

        const letterEl = e.currentTarget;
        const rect = letterEl.getBoundingClientRect();

        const offsetX = startEvent.clientX - rect.left;
        const offsetY = startEvent.clientY - rect.top;

        const startLeft = rect.left + window.scrollX;
        const startTop = rect.top + window.scrollY;

        letterEl.style.transform = "none";
        letterEl.classList.remove("-translate-x-1/2");
        letterEl.classList.remove("-translate-y-1/2");

        letterEl.style.position = "absolute";
        letterEl.style.left = `${startLeft}px`;
        letterEl.style.top = `${startTop}px`;
        letterEl.style.margin = "0";
        
        // জাস্ট ড্র্যাগ করা এলিমেন্টকে সবার উপরে আনার জন্য কাউন্টার বাড়ানো হলো
        setZIndexCounter((prev) => {
            const nextZ = prev + 1;
            letterEl.style.zIndex = nextZ;
            return nextZ;
        });

        const moveAt = (posX, posY) => {
            letterEl.style.left = `${posX - offsetX}px`;
            letterEl.style.top = `${posY - offsetY}px`;
        };

        const onMouseMove = (moveEvent) => {
            const ev = isTouch ? moveEvent.touches[0] : moveEvent;
            moveAt(ev.clientX, ev.clientY);
        };

        const onMouseUp = () => {
            if (isTouch) {
                document.removeEventListener("touchmove", onMouseMove);
                document.removeEventListener("touchend", onMouseUp);
            } else {
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            }
        };

        if (isTouch) {
            document.addEventListener("touchmove", onMouseMove, { passive: true });
            document.addEventListener("touchend", onMouseUp);
        } else {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        }
    };

    const handleCloseLetter = (id) => {
        setLetters((prev) => prev.filter((l) => l.id !== id));
    };

    return (
        <main className='munna bg-[#8b0000] h-screen w-full overflow-hidden relative'>
            <section className="munna cssletter z-10">
                <div className={`envelope ${openEnvelope ? "active" : ""}`}>
                    <button
                        className="munna heart"
                        id="openEnvelope"
                        aria-label="Open Envelope"
                        onClick={() => setOpenEnvelope(true)}
                    >
                        <span className="munna heart-text">Open</span>
                    </button>
                    <div className="munna envelope-flap text-black relative">
                        <div className='munna absolute left-1/2 top-[20%] -translate-x-1/2 flex items-center justify-center flex-col md:gap-y-2 w-full'>
                            <span className='munna font-sriracha md:text-2xl text-lg'>ভালোবাসার उपहार 🎁</span>
                            <span className='munna font-dancingScript md:text-3xl text-xl'>প্রিয়তমা জাফরিন, 💖</span>
                        </div>
                    </div>
                    <div className="munna envelope-folds">
                        <div className="munna envelope-left"></div>
                        <div className="munna envelope-right"></div>
                        <div className="munna envelope-bottom"></div>
                    </div>
                </div>

                {/* যখন খাম খোলা হবে, তখনই কেবল চিঠিগুলো দেখাবে */}
                {openEnvelope && (
                    <div className="munna letters" ref={lettersContainerRef}>
                        {letters.map((letter) => (
                            <blockquote
                                key={letter.id}
                                className="munna letter center"
                                id={`letter-${letter.id}`}
                                tabIndex={0}
                                style={{
                                    position: 'absolute',
                                    top: window.innerWidth < 768 ? '53%' : '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 10
                                }}
                                onMouseDown={handleMouseDown}
                                onTouchStart={handleMouseDown}
                            >
                                <button
                                    className="munna closeLetter"
                                    title={`Close ${letter.name}'s letter`}
                                    onClick={(e) => {
                                        e.stopPropagation(); // ড্র্যাগ ইভেন্ট ট্রিগার হওয়া বন্ধ করবে
                                        handleCloseLetter(letter.id);
                                    }}
                                >
                                    Close
                                </button>
                                <p>{letter.msg}</p>
                                <cite>— {letter.name}</cite>
                            </blockquote>
                        ))}
                    </div>
                )}
            </section>

            {/* ------------------ Heart Beating  */}
            <div className="munna heart-container absolute top-[20%] md:left-20 left-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="munna heartBeating md:w-[150px] w-[110px] h-[200px]"
                >
                    <path
                        d="M471.7 73.6c-54.5-46.4-136-38.3-186.4 15.8L256 120.6l-29.3-31.2C176.3 35.3 94.8 27.2 40.3 73.6-18 125.4-13.3 221 43 273.7l187.3 177.6a24 24 0 0032.4 0L469 273.7c56.3-52.8 61-148.3 2.7-200.1z"
                        fill="#b10505"
                    />
                </svg>
            </div>
            <div className="munna heart-container absolute bottom-[10%] md:right-20 right-6 rotate-180">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="munna heartBeating md:w-[150px] w-[110px] h-[200px]"
                >
                    <path
                        d="M471.7 73.6c-54.5-46.4-136-38.3-186.4 15.8L256 120.6l-29.3-31.2C176.3 35.3 94.8 27.2 40.3 73.6-18 125.4-13.3 221 43 273.7l187.3 177.6a24 24 0 0032.4 0L469 273.7c56.3-52.8 61-148.3 2.7-200.1z"
                        fill="#b10505"
                    />
                </svg>
            </div>

            {/* ------------------ Heart Falling  */}
            <div className="munna snowflakes z-0">
                {[...Array(10)].map((_, index) => (
                    <div key={index} className="munna snowflake">
                        <img src="https://i.pinimg.com/originals/96/c7/8b/96c78bc8ab873498b763798793d64f62.png" width="25" alt="falling-heart" />
                    </div>
                ))}
            </div>
        </main>
    )
}

export default LoveLetter;
