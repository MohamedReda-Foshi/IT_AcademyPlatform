"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

type Level = "Beginner" | "Intermediate" | "Advanced";
type PriceType = "Free" | "Paid";

interface CourseForm {
  Namecourse: string;
  DescriptionCourse: string;
  shortDescription: string;
  category: string;
  level: Level;
  imageUrl: string;
  duration: number;
  rating: number;
  modules: string;
  prerequisites: string;
  learningOutcomes: string;
  price: PriceType;
  Instructor: string;
  InstructorInformation: string;
  videoUrl: string;
  text: string;
  quize: string;
  isPublished: boolean;
}

const cleanArray = (raw: string): string[] =>
  raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => !!s);

function CreateCoursePage() {
  const router = useRouter();
  const [form, setForm] = useState<CourseForm>({
    Namecourse: "",
    DescriptionCourse: "",
    shortDescription: "",
    category: "",
    level: "Beginner",
    imageUrl: "",
    duration: 0,
    rating: 0,
    modules: "",
    prerequisites: "",
    learningOutcomes: "",
    price: "Free",
    Instructor: "",
    InstructorInformation: "",
    videoUrl: "",
    text: "",
    quize: "",
    isPublished: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const session = await getSession();

      if (!session?.user?.token || session.user.role !== "admin") {
        const returnTo = encodeURIComponent("/");
        router.push(`/auth/Login?returnTo=${returnTo}`);
        return;
      }

      const payload = {
        Namecourse: form.Namecourse,
        DescriptionCourse: form.DescriptionCourse,
        shortDescription: form.shortDescription,
        category: form.category,
        level: form.level,
        imageUrl: form.imageUrl,
        duration: Number(form.duration),
        rating: Number(form.rating),
        modules: cleanArray(form.modules),
        prerequisites: cleanArray(form.prerequisites),
        learningOutcomes: cleanArray(form.learningOutcomes),
        price: form.price,
        isPublished: form.isPublished,
        Instructor: form.Instructor,
        InstructorInformation: form.InstructorInformation,
        videoUrl: cleanArray(form.videoUrl),
        text: cleanArray(form.text),
        quize: cleanArray(form.quize),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EXPRESS_URL}/course/AddCourse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.user.token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || response.statusText);
      }

      const createdCourse = await response.json();
      router.push(`/Courses/${createdCourse._id}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20">
      <div className="max-w-2xl mx-auto p-6 bg-black rounded shadow">
        <h1 className="text-2xl mb-4 text-white">Create New Course</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-white mb-1">Course Name</label>
            <input
              name="Namecourse"
              value={form.Namecourse}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded text-black"
            />
          </div>

          <div>
            <label className="block font-medium text-white mb-1">
              Short Description (≤200 chars)
            </label>
            <textarea
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              maxLength={200}
              required
              className="w-full border px-3 py-2 rounded text-black"
              rows={3}
            />
          </div>

          <div>
            <label className="block font-medium text-white mb-1">Full Description</label>
            <textarea
              name="DescriptionCourse"
              value={form.DescriptionCourse}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded text-black"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-white mb-1">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded text-black"
              />
            </div>
            <div>
              <label className="block font-medium text-white mb-1">Level</label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-black"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-white mb-1">Image URL</label>
            <input
              name="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded text-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-white mb-1">Duration (minutes)</label>
              <input
                name="duration"
                type="number"
                min="0"
                value={form.duration}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-black"
              />
            </div>
            <div>
              <label className="block font-medium text-white mb-1">Price</label>
              <select
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-black"
              >
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-white mb-1">rating</label>
              <select
                name="Rating"
                value={form.rating}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-black"
              >
              <option value="Free">1</option>
              <option value="Paid">2</option>
              <option value="Paid">3</option>
              <option value="Paid">4</option>
              <option value="Paid">5</option>
            </select>
            </div>


          </div>

          <div>
            <label className="block font-medium text-white mb-1">Prerequisites</label>
            <input
              name="prerequisites"
              value={form.prerequisites}
              onChange={handleChange}
              placeholder="JavaScript, HTML, CSS"
              className="w-full border px-3 py-2 rounded text-black"
            />
          </div>


          <div>
            <label className="block font-medium text-white mb-1">Learning Outcomes</label>
            <input
              name="learningOutcomes"
              value={form.learningOutcomes}
              onChange={handleChange}
              placeholder="Understand state management, Build components"
              className="w-full border px-3 py-2 rounded text-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-white mb-1">Instructor</label>
              <input
                name="Instructor"
                value={form.Instructor}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-black"
              />
            </div>
            <div className="flex items-center">
              <label className="inline-flex items-center text-white">
                <input
                  name="isPublished"
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={handleChange}
                  className="mr-2"
                />
                Published
              </label>
            </div>
          </div>

          <div>
            <label className="block font-medium text-white mb-1">Instructor Information</label>
            <textarea
              name="InstructorInformation"
              value={form.InstructorInformation}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded text-black"
              rows={3}
            />
          </div>

          <div>
            <label className="block font-medium text-white mb-1">
              Video URLs (comma-separated)
            </label>
            <input
              name="videoUrl"
              value={form.videoUrl}
              onChange={handleChange}
              placeholder="https://example.com/video1, https://example.com/video2"
              className="w-full border px-3 py-2 rounded text-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Creating…" : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCoursePage;