import React from 'react'

const Faq = () => {
       const [openIndex, setOpenIndex] = React.useState(null)
        const faqsData = [
        {
            question: 'How does the AI-based question practice work?',
            answer: 'Our AI analyzes your strengths and weaknesses, then generates personalized practice questions that match your skill level and target improvement areas.'
        },
        {
            question: 'Does the platform provide company-specific preparation?',
            answer: 'Yes, we offer curated preparation tracks for top companies like TCS, Infosys, Wipro, Accenture, Cognizant, and more — including previous patterns and commonly asked questions.'
        },
        {
            question: 'Will I get mock interviews with feedback?',
            answer: 'Yes. You can attend AI-driven mock interviews that evaluate your communication, confidence, problem-solving approach, and then provide actionable feedback instantly.'
        },
        {
            question: 'Are coding tests included?',
            answer: 'We offer coding challenges with real-time evaluation across languages like Java, Python, C++, and JavaScript — including hints and solution walkthroughs.'
        },
        {
            question: 'Can I track my progress?',
            answer: 'Absolutely. Your performance dashboard shows skill growth, accuracy, time efficiency, and topic-wise progress to help you prepare smarter.'
        }
    ]
  return (
    <>
     <div className='flex flex-col items-center text-center text-slate-800 px-3'>
                    <p className='text-base font-medium text-slate-600'>FAQ</p>
                    <h1 className='text-3xl md:text-4xl font-semibold mt-2'>Frequently Asked <span className='text-blue-600'>Questions</span></h1>

                    <p className='text-sm text-slate-500 mt-4 max-w-2xl'>
                        Proactively answering FAQs boosts user confidence and cuts down on support tickets.
                    </p>

                    <div className='max-w-3xl w-full mt-6 flex flex-col gap-4 items-start text-left'>
                        {faqsData.map((faq, index) => (
                            <div key={index} className='flex flex-col items-start w-full'>
                                <div
                                    className='flex items-center justify-between w-full cursor-pointer border border-indigo-100 p-4 rounded'
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                >
                                    <h2 className='text-sm'>{faq.question}</h2>

                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}>
                                        <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                                            stroke="#1D293D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>

                                <p
                                    className={`text-sm text-slate-500 px-4 transition-all duration-500 ease-in-out ${openIndex === index
                                        ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                                        : "opacity-0 max-h-0 -translate-y-2"
                                        }`}
                                >
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                    <br /><br />
                </div>
    </>
  )
}

export default Faq