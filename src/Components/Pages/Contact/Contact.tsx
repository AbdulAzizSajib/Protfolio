"use client";

import { FormEvent, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdArrowForward } from "react-icons/io";
import { MdEmail, MdLocalPhone } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  name: string;
  email: string;
  conversation: string;
};

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    conversation: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.conversation) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
      const res = await fetch(`${apiUrl}/api/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Email sent successfully!");
        setFormData({ name: "", email: "", conversation: "" });
      } else {
        toast.error(data.message || "Failed to send email");
      }
    } catch {
      toast.error("Failed to connect to server");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <h2 className="text-3xl sm:text-2xl lg:text-3xl sm:ml-5 uppercase font-bold whitespace-nowrap">Contact</h2>
        <div className="hidden sm:block w-full h-[1px] bg-zinc-700" />
      </div>

      <section id="contact" className="py-6">
        <div className="grid max-w-6xl grid-cols-1 px-4 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="flex flex-col justify-center py-6 md:py-0 md:px-6">
            <h1 className="mb-8 text-4xl font-bold">Get in touch</h1>
            <div className="space-y-4">
              <p className="flex items-center">
                <FaLocationDot className="mr-2 text-lg" />
                <span>Dhaka Bangladesh</span>
              </p>
              <p className="flex items-center">
                <MdLocalPhone className="mr-2 text-lg" />
                <span>01782521705</span>
              </p>
              <p className="flex items-center">
                <MdEmail className="mr-2 text-lg" />
                <span>abdulazizsajib@gmail.com</span>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
            <p className="font-light capitalize">Fill in the form to start a conversation</p>

            <label className="block">
              <span className="mb-1">Your name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full text-black rounded-md shadow-sm input-bordered input bg-white"
              />
            </label>

            <label className="block">
              <span className="mb-1">Your email address</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full text-black rounded-md shadow-sm input-bordered input bg-white"
              />
            </label>

            <label className="block">
              <span className="mb-1">Message</span>
              <textarea
                rows={3}
                name="conversation"
                value={formData.conversation}
                onChange={handleChange}
                className="block w-full text-black rounded-md textarea-bordered textarea bg-white shadow-sm"
              />
            </label>

            <button type="submit" disabled={submitting} className="button flex items-center gap-2">
              <span className="button__text">{submitting ? "Sending..." : "Send"}</span>
              <span className="button__icon">
                <IoMdArrowForward className="text-xl text-black" />
              </span>
            </button>
          </form>
        </div>

        <ToastContainer theme="dark" position="bottom-right" />
      </section>
    </div>
  );
};

export default Contact;
