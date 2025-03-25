import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    const savedPasswords = localStorage.getItem("password");
    if (savedPasswords) {
      setPasswordArray(JSON.parse(savedPasswords));
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", { position: "top-right", autoClose: 2000 });
  };

  const showPassword = () => {
    passwordRef.current.type = passwordRef.current.type === "password" ? "text" : "password";
    ref.current.src = passwordRef.current.type === "text" ? "/eye.png" : "/hidden.png";
  };

  const savePassword = () => {
    if (!form.site || !form.username || !form.password) {
      toast.error("Please fill all fields!", { position: "top-right", autoClose: 2000 });
      return;
    }

    const updatedPasswords = [...passwordArray, { ...form, id: uuidv4() }];
    setPasswordArray(updatedPasswords);
    localStorage.setItem("password", JSON.stringify(updatedPasswords));
    setForm({ site: "", username: "", password: "" });
    toast.success("Password saved!", { position: "top-right", autoClose: 2000 });
  };

  const deletePassword = (id) => {
    if (!window.confirm("Do you really want to delete this password?")) return;
    
    const updatedPasswords = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(updatedPasswords);
    localStorage.setItem("password", JSON.stringify(updatedPasswords));
    toast.success("Password deleted!", { position: "top-right", autoClose: 2000 });
  };

  const editPassword = (id) => {
    const item = passwordArray.find((i) => i.id === id);
    if (item) {
      setForm(item);
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          <span className="text-green-600">&lt;</span>SecureKey
          <span className="text-green-600">/&gt;</span>
        </h1>
        <p className="text-green-900 text-center text-sm sm:text-base">Your own Password Manager</p>

        {/* Form Section */}
        <div className="mt-6 flex flex-col p-4 gap-4 w-full max-w-lg mx-auto bg-white shadow-md rounded-lg">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-md border border-green-500 w-full p-3"
            type="text"
            name="site"
          />
          <input
            value={form.username}
            onChange={handleChange}
            placeholder="Enter Username"
            className="rounded-md border border-green-500 w-full p-3"
            type="text"
            name="username"
          />
          <div className="relative w-full">
            <input
              ref={passwordRef}
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="rounded-md border border-green-500 w-full p-3 pr-10"
              type="password"
              name="password"
            />
            <span className="absolute right-3 top-3 cursor-pointer" onClick={showPassword}>
              <img ref={ref} className="w-6" src="/eye.png" alt="eye" />
            </span>
          </div>
          <button
            onClick={savePassword}
            className="bg-green-500 text-white rounded-lg hover:bg-green-400 px-6 py-2 w-full sm:w-auto mx-auto flex items-center gap-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#ffffff,secondary:#242424"
              style={{ width: "20px", height: "20px" }}
            ></lord-icon>
            Save
          </button>
        </div>

        {/* Password List */}
        <div className="mt-8">
          <h2 className="font-bold text-2xl text-center">Your Passwords</h2>
          {passwordArray.length === 0 ? (
            <div className="text-center mt-4">No passwords to show</div>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="table-auto w-full min-w-[400px] sm:min-w-[600px] lg:min-w-[800px]">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2 px-4">Site</th>
                    <th className="py-2 px-4">Username</th>
                    <th className="py-2 px-4">Password</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100 text-center">
                  {passwordArray.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2 px-4">{item.site}</td>
                      <td className="py-2 px-4">{item.username}</td>
                      <td className="py-2 px-4">
                        {item.password}
                        <span className="cursor-pointer ml-2" onClick={() => copyText(item.password)}>
                          <lord-icon src="https://cdn.lordicon.com/lyrrgrsl.json" trigger="hover"></lord-icon>
                        </span>
                      </td>
                      <td className="py-2 px-4 flex justify-center gap-3">
                        <span className="cursor-pointer" onClick={() => editPassword(item.id)}>
                          <lord-icon src="https://cdn.lordicon.com/fikcyfpp.json" trigger="hover"></lord-icon>
                        </span>
                        <span className="cursor-pointer" onClick={() => deletePassword(item.id)}>
                          <lord-icon src="https://cdn.lordicon.com/wpyrrmcq.json" trigger="hover"></lord-icon>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
