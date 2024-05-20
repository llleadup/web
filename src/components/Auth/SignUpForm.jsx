import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { postRequest } from "@/utils";

const SignUpForm = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      const response = await postRequest("/api/auth/register", {
        email,
        password,
      });

      console.log("response\n", response)

    //   if (response.ok) {
    //     window.location.href = "/login";
    //   }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-bg-accent relative p-6 rounded-md"
      >
        <div className="text-3xl font-semibold">Create Account</div>
        <p className="text-zinc-400 text-sm mt-2 mb-6">
          Already have an account?{" "}
          <a href="/login" className="font-medium hover:text-primary">
            Login
          </a>
        </p>
        <input
          type="email"
          className="px-4 py-3 rounded-md border-white border bg-bg-accent text-base outline-0 focus-visible:outline-4 focus-visible:outline-primary mb-5"
          placeholder="Email"
          name="email"
          autoComplete="off"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="px-4 py-3 rounded-md border-white border bg-bg-accent text-base outline-0 focus-visible:outline-4 focus-visible:outline-primary mb-5"
          placeholder="Password"
          name="password"
          autoComplete="off"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-primary rounded-md text-lg font-semibold px-6 py-3 text-zinc-50"
        >
          Create Account
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
