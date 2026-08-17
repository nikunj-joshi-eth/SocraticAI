import React, { useState } from "react";
import { analyzeQuestion } from "../services/api";


export default function DoubtPortalSection() {

    const [subject, setSubject] = useState("Physics");
    const [question, setQuestion] = useState("");

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);


    async function handleSubmit(e) {

        e.preventDefault();

        if (!question.trim()) {
            alert("Please enter a question");
            return;
        }


        setLoading(true);
        setResult(null);


        try {

            const response = await analyzeQuestion({
                question: question,
                subject: subject,
            });


            setResult(response);


        } catch(error) {

            console.error(error);

            alert(
                "Could not connect to SocraticAI backend"
            );

        }
        finally {

            setLoading(false);

        }

    }



    return (

        <section
            id="doubt-portal"
            className="min-h-screen flex items-center justify-center p-10 bg-black text-white"
        >

            <div className="w-full max-w-3xl">


                <h1 className="text-4xl font-bold mb-8 text-center">
                    SocraticAI Doubt Portal
                </h1>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 bg-zinc-900 p-8 rounded-2xl border border-white/10"
                >


                    <div>

                        <label className="block mb-2">
                            Subject
                        </label>


                        <select

                            value={subject}

                            onChange={
                                e => setSubject(e.target.value)
                            }

                            className="w-full bg-black border border-white/20 rounded-lg p-3"

                        >

                            <option>
                                Physics
                            </option>

                            <option>
                                Chemistry
                            </option>

                            <option>
                                Mathematics
                            </option>

                            <option>
                                Biology
                            </option>


                        </select>


                    </div>



                    <div>


                        <label className="block mb-2">
                            Your Question
                        </label>


                        <textarea

                            rows="5"

                            value={question}

                            onChange={
                                e => setQuestion(e.target.value)
                            }

                            placeholder="Enter your JEE/NEET doubt..."

                            className="w-full bg-black border border-white/20 rounded-lg p-3"

                        />


                    </div>



                    <button

                        type="submit"

                        disabled={loading}

                        className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700"

                    >

                        {
                            loading
                            ?
                            "Analyzing..."
                            :
                            "Analyze Doubt"
                        }


                    </button>


                </form>



                {
                    result && (

                        <div
                            className="mt-8 bg-zinc-900 p-6 rounded-xl border border-green-500/30"
                        >

                            <h2 className="text-2xl font-bold mb-4">
                                AI Analysis
                            </h2>



                            {
                                result.analysis && (

                                    <div className="space-y-3">

                                        <p>
                                            <b>Subject:</b>{" "}
                                            {
                                                result.analysis.subject
                                            }
                                        </p>


                                        <p>
                                            <b>Chapter:</b>{" "}
                                            {
                                                result.analysis.chapter
                                            }
                                        </p>


                                        <p>
                                            <b>Error Type:</b>{" "}
                                            {
                                                result.analysis.error_type
                                            }
                                        </p>



                                        <p>
                                            <b>Concept:</b>{" "}
                                            {
                                                result.analysis.subtopic
                                            }
                                        </p>



                                        <div>

                                            <b>Hints:</b>

                                            <ul className="list-disc ml-6 mt-2">

                                            {
                                                result.analysis.socratic_hints?.map(
                                                    (hint)=>(
                                                        <li key={hint.hint_number}>
                                                            {hint.hint}
                                                        </li>
                                                    )
                                                )
                                            }

                                            </ul>

                                        </div>


                                    </div>

                                )


                            }



                        </div>

                    )
                }


            </div>


        </section>

    );

}