import React, { useState } from "react";
import NavBar from "../../components/instructor/NavBar";
import Footer from "../../components/instructor/Footer";

function CreateNewCourse() {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    level: "",
    category: "",
    duration: "",
    instructor: "",
    status: "Published",
    enrolledStudents: [],
    contents: [],
    tags: [],
  });

  const [content, setContent] = useState({
    title: "",
    type: "",
    lectureNotes: "",
    quizQuestions: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value,
    });
  };

  const handleContentChange = (e, index) => {
    const { name, value } = e.target;
    const updatedContents = [...courseData.contents];
    updatedContents[index] = {
      ...updatedContents[index],
      [name]: value,
    };
    setCourseData({
      ...courseData,
      contents: updatedContents,
    });
  };

  const handleAddContent = () => {
      setContent({
        title: "",
        type: "",
        lectureNotes: "",
        quizQuestions: [],
      });
  };

  const handleRemoveContent = (index) => { 
    const updatedContents = [...courseData.contents];
    updatedContents.splice(index, 1);
    setCourseData({
     ...courseData,
      contents: updatedContents,
    });
  }

  const saveContent = () => {
    if (content.title && content.type && content.lectureNotes) {
        setCourseData({
          ...courseData,
          contents: [...courseData.contents, content],
        });
    } else {
        console.error("Content title, type, and lecture notes are required.");
      }
  }

  const handleEditContent = (index) => {
    // Retrieve the content at the specified index
    const editedContent = courseData.contents[index];
  
    // Update the content state with the retrieved content
    setContent({
      title: editedContent.title,
      type: editedContent.type,
      lectureNotes: editedContent.lectureNotes,
      quizQuestions: editedContent.quizQuestions,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send courseData to the server or perform any other action here
    console.log(courseData);
  };
  return (
    <div className="flex flex-col w-screen h-full top-0">
      <div className="flex flex-col grow-0">
        <NavBar />
      </div>
      <div className="mx-auto grow justify-center items-center w-11/12 mt-5 h-full">
        <section className="bg-white dark:bg-gray-900 px-5 rounded-3xl">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="uppercase mb-4 justify-center mx-auto items-center text-xl font-bold text-gray-900 dark:text-white">
              Add a new course
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={courseData.title}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Title"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={courseData.description}
                    onChange={handleChange}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Description"
                    required
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={courseData.price}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Price"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="level"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Level
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={courseData.level}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="All Levels">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={courseData.category}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Business">Business</option>
                    <option value="IT & Software">IT & Software</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Photography">Photography</option>
                    <option value="Music">Music</option>
                    {/* Add more categories as needed */}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="duration"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Duration (in Hours)
                  </label>
                  <input
                    type="text"
                    name="duration"
                    id="duration"
                    value={courseData.duration}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Duration"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="instructor"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Instructor
                  </label>
                  <input
                    type="text"
                    name="instructor"
                    id="instructor"
                    value={courseData.instructor}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Instructor"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="tags"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tags (Separate by commas)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    value={courseData.tags}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tags"
                  />
                </div>
                 {/* Initial course content fields */}
              <div className="content-section">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="initialContentTitle"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Initial Content Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="initialContentTitle"
                    value={content.title}
                    onChange={(e) => setContent({ ...content, title: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Content Title"
                    required
                  />
                </div>
                <div>
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Content Type
                      </label>
                      <input
                        type="text"
                        name="type"
                        id="initialContentType"
                        value={content.type}
                        onChange={(e) => setContent({ ...content, type: e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Content Type"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Content Notes
                      </label>
                      <textarea
                        name="lectureNotes"
                        value={content.lectureNotes}
                        onChange={(e) => setContent({ ...content, lectureNotes: e.target.value })}
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Content Notes"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="button"
                      onClick={saveContent}
                      className="inline-flex items-center px-2.5 py-1.5 mt-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-800"
                    >
                      Save
                    </button>
                {/* Other initial content fields */}
              </div>
                {courseData.contents.map((content, index) => (
                  <div key={index} className="content-section">
                     <div className="sm:col-span-2">
                    <label
                      htmlFor={`contentTitle${index}`}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Content Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id={`contentTitle${index}`}
                      value={content.title}
                      onChange={(e) => handleContentChange(e, index)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Content Title"
                      required
                    />
                  </div>
                    <div>
                      <label
                        htmlFor={`contentType${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Content Type
                      </label>
                      <input
                        type="text"
                        name="type"
                        id={`contentType${index}`}
                        value={content.type}
                        onChange={(e) => handleContentChange(e, index)}
                        data-index={index}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Content Type"
                        required
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor={`contentNotes${index}`}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Content Notes
                      </label>
                      <textarea
                        id={`contentNotes${index}`}
                        name="lectureNotes"
                        value={content.lectureNotes}
                        onChange={(e) => handleContentChange(e, index)}
                        data-index={index}
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Content Notes"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleEditContent(index)}
                      className="inline-flex items-center px-2.5 py-1.5 mt-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-800"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveContent(index)}
                      className="inline-flex items-center px-2.5 py-1.5 mt-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-gray-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddContent}
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Add Content
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Add course
              </button>
            </form>
          </div>
        </section>
      </div>
      <div className="flex flex-col grow-0">
        <Footer />
      </div>
    </div>
  );
}

export default CreateNewCourse;
