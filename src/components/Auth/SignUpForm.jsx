import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { postRequest } from "@/utils";

const SignUpForm = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await postRequest("/api/auth/login", {
        email,
      });

      if(response.error){
        setError(response.error);
      }
      if(response.sent){
        window.location.pathname = '/magic-link-sent'
      }

    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col relative p-6 rounded-md bg-bg-accent"
      >
        <div className="text-3xl font-semibold mb-6">Sign In</div>
        <input
          type="email"
          className="px-4 py-3 rounded-md border-white border bg-bg-accent text-base outline-0 focus-visible:outline-4 focus-visible:outline-primary mb-5"
          placeholder="Email"
          name="email"
          autoComplete="false"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <button
          type="submit"
          className="bg-primary rounded-md text-lg font-semibold px-6 py-3 text-zinc-50"
        >
          Sign in with Email
        </button>
      </form>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            transition={{ duration: 0.3 }}
            className="absolute right-4 bottom-4 bg-bg-accent shadow-md rounded-sm p-4 border-l-4 border-red-500 text-base-content"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SignUpForm;
